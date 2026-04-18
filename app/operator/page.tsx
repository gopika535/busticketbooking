"use client";
import { useState, useEffect } from "react";

export default function Operator() {
  const [buses, setBuses] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [route, setRoute] = useState("");
  const [totalSeats, setTotalSeats] = useState("");
  const [availableSeats, setAvailableSeats] = useState("");
  const [selectedBus, setSelectedBus] = useState<any>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("buses");
    if (data) setBuses(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("buses", JSON.stringify(buses));
  }, [buses]);

  const addBus = () => {
    if (!name || !route || !totalSeats || !availableSeats) {
      alert("Fill all fields");
      return;
    }

    if (Number(availableSeats) > Number(totalSeats)) {
      alert("Available seats cannot exceed total seats ❌");
      return;
    }

    const newBus = {
      name,
      route,
      totalSeats: Number(totalSeats),
      availableSeats: Number(availableSeats),
    };

    if (editIndex !== null) {
      const updated = [...buses];
      updated[editIndex] = newBus;
      setBuses(updated);
      setEditIndex(null);
      alert("Bus updated successfully ✅");
    } else {
      setBuses([...buses, newBus]);
      alert("Bus added successfully ✅");
    }

    setName("");
    setRoute("");
    setTotalSeats("");
    setAvailableSeats("");
  };

  const deleteBus = (index: number) => {
    setBuses(buses.filter((_, i) => i !== index));
    alert("Bus cancelled ❌");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Operator Dashboard</h1>

      {/* FORM */}
      <div style={styles.form}>
        <input style={styles.input} placeholder="Bus Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input style={styles.input} placeholder="Route" value={route} onChange={(e) => setRoute(e.target.value)} />
        <input style={styles.input} placeholder="Total Seats" value={totalSeats} onChange={(e) => setTotalSeats(e.target.value)} />
        <input style={styles.input} placeholder="Available Seats" value={availableSeats} onChange={(e) => setAvailableSeats(e.target.value)} />

        <button style={styles.addBtn} onClick={addBus}>
          {editIndex !== null ? "Update Bus" : "Add Bus"}
        </button>
      </div>

      {/* TABLE */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Route</th>
            <th style={styles.th}>Total</th>
            <th style={styles.th}>Available</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {buses.map((bus, index) => (
            <tr key={index} style={{ backgroundColor: editIndex === index ? "#334155" : "transparent" }}>
              <td style={styles.td}>{bus.name}</td>
              <td style={styles.td}>{bus.route}</td>
              <td style={styles.td}>{bus.totalSeats}</td>

              <td style={{
                ...styles.td,
                color: bus.availableSeats === 0 ? "#ff4d4f" : "#2ecc71",
                fontWeight: "bold",
              }}>
                {bus.availableSeats === 0 ? "FULL" : bus.availableSeats}
              </td>

              <td style={styles.td}>
                <button style={styles.editBtn} onClick={() => {
                  setName(bus.name);
                  setRoute(bus.route);
                  setTotalSeats(bus.totalSeats.toString());
                  setAvailableSeats(bus.availableSeats.toString());
                  setEditIndex(index);
                }}>
                  Edit
                </button>

                <button style={styles.deleteBtn} onClick={() => deleteBus(index)}>
                  Cancel
                </button>

                <button style={styles.viewBtn} onClick={() => setSelectedBus(bus)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* SEAT VIEW */}
      {selectedBus && (
        <div style={styles.seatSection}>
          <h2 style={styles.subheading}>
            Seat Layout - {selectedBus.name}
          </h2>

          <div style={styles.busContainer}>
            {Array.from({ length: 5 }).map((_, rowIndex) => {
              const totalSeats = selectedBus.totalSeats;
              const bookedCount = totalSeats - selectedBus.availableSeats;

              const randomBooked = new Set<number>();
              while (randomBooked.size < bookedCount) {
                randomBooked.add(Math.floor(Math.random() * totalSeats));
              }

              return (
                <div key={rowIndex} style={styles.row}>
                  <div style={styles.side}>
                    {[0, 1].map((seat) => {
                      const seatNumber = rowIndex * 5 + seat;
                      const isBooked = randomBooked.has(seatNumber);

                      return (
                        <div key={seatNumber} style={{
                          ...styles.seat,
                          backgroundColor: isBooked ? "#e74c3c" : "#bdc3c7"
                        }}>
                          {seatNumber + 1}
                        </div>
                      );
                    })}
                  </div>

                  <div style={styles.aisle}></div>

                  <div style={styles.side}>
                    {[2, 3, 4].map((seat) => {
                      const seatNumber = rowIndex * 5 + seat;
                      const isBooked = randomBooked.has(seatNumber);

                      return (
                        <div key={seatNumber} style={{
                          ...styles.seat,
                          backgroundColor: isBooked ? "#e74c3c" : "#bdc3c7"
                        }}>
                          {seatNumber + 1}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* LEGEND */}
          <div style={styles.legend}>
            <div style={styles.legendItem}>
              <span style={{ ...styles.box, background: "#e74c3c" }}></span>
              Booked
            </div>

            <div style={styles.legendItem}>
              <span style={{ ...styles.box, background: "#bdc3c7" }}></span>
              Available
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* STYLES */

const styles = {
  container: {
    padding: "20px",
    minHeight: "100vh",
    fontFamily: "Poppins, sans-serif",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    color: "white",
  },

  heading: { textAlign: "center", marginBottom: "20px" },

  subheading: { textAlign: "center" },

  form: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
  },

  input: { padding: "10px", borderRadius: "6px", border: "1px solid #ccc" },

  addBtn: {
    background: "#3b82f6",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#1e293b",
    borderRadius: "10px",
  },

  th: { background: "#334155", color: "#fff", padding: "12px" },

  td: {
    padding: "12px",
    textAlign: "center",
    borderBottom: "1px solid #334155",
    color: "#e2e8f0",
  },

  editBtn: { background: "#f39c12", color: "white", padding: "6px", marginRight: "5px" },

  deleteBtn: { background: "#e74c3c", color: "white", padding: "6px", marginRight: "5px" },

  viewBtn: { background: "#8e44ad", color: "white", padding: "6px" },

  seatSection: { marginTop: "30px" },

  busContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
  },

  row: { display: "flex", alignItems: "center" },

  side: { display: "flex", gap: "10px" },

  aisle: { width: "40px" },

  seat: {
    width: "50px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    color: "white",
    fontWeight: "bold",
  },

  legend: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
  },

  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  box: {
    width: "18px",
    height: "18px",
    borderRadius: "4px",
  },
};

