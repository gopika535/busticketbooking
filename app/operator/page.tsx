"use client";

import { useState, useEffect } from "react";

export default function Operator() {
  const [buses, setBuses] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [route, setRoute] = useState("");
  const [time, setTime] = useState("");
  const [fare, setFare] = useState("");
  const [totalSeats, setTotalSeats] = useState("");
  const [availableSeats, setAvailableSeats] = useState("");

  const dummyBuses = [
    {
      name: "Express A",
      route: "Chennai → Madurai",
      time: "10:00 AM",
      fare: 500,
      totalSeats: 40,
      availableSeats: 25,
    },
    {
      name: "Super Deluxe",
      route: "Chennai → Coimbatore",
      time: "2:00 PM",
      fare: 700,
      totalSeats: 45,
      availableSeats: 10,
    },
    {
      name: "Night Rider",
      route: "Chennai → Trichy",
      time: "9:00 PM",
      fare: 600,
      totalSeats: 35,
      availableSeats: 0,
    },
    {
      name: "Express Rider",
      route: "Chennai → Chidambaram",
      time: "10:30 PM",
      fare: 1200,
      totalSeats: 35,
      availableSeats: 20,
    },
  ];

  useEffect(() => {
    const data = localStorage.getItem("buses");
    if (data) {
      setBuses(JSON.parse(data));
    } else {
      setBuses(dummyBuses);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("buses", JSON.stringify(buses));
  }, [buses]);

  const addBus = () => {
    if (!name || !route || !time || !fare || !totalSeats) {
      alert("Please fill all fields");
      return;
    }

    const newBus = {
      name,
      route,
      time,
      fare: Number(fare),
      totalSeats: Number(totalSeats),
      availableSeats: Number(availableSeats || totalSeats),
    };

    setBuses([...buses, newBus]);

    setName("");
    setRoute("");
    setTime("");
    setFare("");
    setTotalSeats("");
    setAvailableSeats("");
  };

  const deleteBus = (index: number) => {
    setBuses(buses.filter((_, i) => i !== index));
  };

  const bookSeat = (index: number) => {
    const updatedBuses = [...buses];

    if (updatedBuses[index].availableSeats > 0) {
      updatedBuses[index].availableSeats -= 1;
      setBuses(updatedBuses);
    } else {
      alert("Bus is Full 🚫");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Operator Dashboard</h1>

      {/* Inputs */}
      <div style={styles.form}>
        <input style={styles.input} placeholder="Bus Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input style={styles.input} placeholder="Route" value={route} onChange={(e) => setRoute(e.target.value)} />
        <input style={styles.input} placeholder="Time" value={time} onChange={(e) => setTime(e.target.value)} />
        <input style={styles.input} placeholder="Fare" value={fare} onChange={(e) => setFare(e.target.value)} />
        <input style={styles.input} placeholder="Total Seats" value={totalSeats} onChange={(e) => setTotalSeats(e.target.value)} />
        <input style={styles.input} placeholder="Available Seats" value={availableSeats} onChange={(e) => setAvailableSeats(e.target.value)} />

        <button style={styles.addBtn} onClick={addBus}>
          Add Bus
        </button>
      </div>

      {/* Table */}
      <h2>Bus List</h2>

      {buses.length === 0 ? (
        <p>No buses added</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Route</th>
              <th style={styles.th}>Time</th>
              <th style={styles.th}>Fare</th>
              <th style={styles.th}>Total</th>
              <th style={styles.th}>Available</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {buses.map((bus, index) => (
              <tr key={index}>
                <td style={styles.td}>{bus.name}</td>
                <td style={styles.td}>{bus.route}</td>
                <td style={styles.td}>{bus.time}</td>
                <td style={styles.td}>{bus.fare}</td>
                <td style={styles.td}>{bus.totalSeats}</td>
                <td style={styles.td}>
                  {bus.availableSeats === 0 ? (
                    <span style={styles.full}>Full</span>
                  ) : (
                    bus.availableSeats
                  )}
                </td>
                <td style={styles.td}>
                  
                  <button style={styles.deleteBtn} onClick={() => deleteBus(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

/* ✅ Styles */
const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f4f7fb",
    minHeight: "100vh",
    fontFamily: "Arial",
  },
  heading: {
    textAlign: "center" as const,
    color: "#2c3e50",
  },
  form: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "10px",
    justifyContent: "center",
    margin: "20px 0",
  },
  input: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  addBtn: {
    padding: "8px 15px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    backgroundColor: "white",
  },
  th: {
    backgroundColor: "#3498db",
    color: "white",
    padding: "10px",
  },
  td: {
    padding: "10px",
    textAlign: "center" as const,
    borderBottom: "1px solid #ddd",
  },
  bookBtn: {
    backgroundColor: "#27ae60",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteBtn: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  full: {
    color: "red",
    fontWeight: "bold",
  },
};