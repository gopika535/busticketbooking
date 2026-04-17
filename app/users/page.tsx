"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Seat {
  number: number;
  available: boolean;
}

interface Bus {
  id: string;
  name: string;
  from: string;
  to: string;
  time: string;
  price: number;
  seats?: Seat[];
}

export default function UserPage() {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [ticket, setTicket] = useState<any>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/buses");
      setBuses(res.data);
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  const bookedSeats =
    selectedBus?.seats
      ?.filter((seat) => seat.available === false)
      .map((seat) => seat.number) || [];


  const toggleSeat = (seat: number) => {
    if (bookedSeats.includes(seat)) return;

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const openBus = (bus: Bus) => {
    setSelectedBus(bus);
    setSelectedSeats([]);
    setUsername("");
    setPhone("");
    setEmail("");
    setShowBookingForm(false);
  };

  const proceedBooking = () => {
    if (selectedSeats.length === 0) {
      alert("Please select seat first");
      return;
    }

    setShowBookingForm(true);
  };

  const bookTicket = async () => {
    if (!username || !phone || !email) {
      alert("Enter all details");
      return;
    }

    if (!selectedBus) return;

    try {
      const updatedSeats =
        selectedBus.seats?.map((seat) =>
          selectedSeats.includes(seat.number)
            ? { ...seat, available: false }
            : seat
        ) || [];

      await axios.patch(`http://localhost:5000/buses/${selectedBus.id}`, {
        seats: updatedSeats,
      });

      setTicket({
        user: username,
        phone,
        email,
        busName: selectedBus.name,
        route: `${selectedBus.from} → ${selectedBus.to}`,
        time: selectedBus.time,
        seats: selectedSeats,
        total: selectedSeats.length * selectedBus.price,
      });

      alert("Seats Booked Successfully 🎉");

      setSelectedBus(null);
      setShowBookingForm(false);
      fetchBuses();
    } catch (error) {
      console.error(error);
    }
  };

  const cancelBooking = () => {
    setTicket(null);
    setSelectedSeats([]);
    alert("Booking Cancelled");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>User Dashboard</h1>

      <h2>Available Buses</h2>

      {buses.map((bus) => (
        <div key={bus.id} style={styles.busCard}>
          <p>
            <b>{bus.name}</b> ({bus.from} → {bus.to}) | {bus.time} | ₹{bus.price}
          </p>

          <button style={styles.button} onClick={() => openBus(bus)}>
            Select Bus
          </button>
        </div>
      ))}

      {selectedBus && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <button
              style={styles.closeBtn}
              onClick={() => setSelectedBus(null)}
            >
              X
            </button>

            <h2>{selectedBus.name}</h2>
            <p>
              {selectedBus.from} → {selectedBus.to}
            </p>
            <p>{selectedBus.time}</p>
            <p>Fare: ₹{selectedBus.price}</p>

            <h3>Select Seats</h3>

            <div style={styles.busContainer}>
              {Array.from({ length: 5 }).map((_, rowIndex) => (
                <div key={rowIndex} style={styles.row}>
                  <div style={styles.side}>
                    {[0, 1].map((seat) => {
                      const seatNumber = rowIndex * 5 + seat + 1;
                      const isBooked = bookedSeats.includes(seatNumber);
                      const isSelected =
                        selectedSeats.includes(seatNumber);

                      return (
                        <div
                          key={seatNumber}
                          onClick={() => toggleSeat(seatNumber)}
                          style={{
                            ...styles.seat,
                            backgroundColor: isBooked
                              ? "#ef4444"
                              : isSelected
                              ? "#3b82f6"
                              : "#22c55e",
                          }}
                        >
                          {seatNumber}
                        </div>
                      );
                    })}
                  </div>

                  <div style={styles.aisle}></div>

                  <div style={styles.side}>
                    {[2, 3, 4].map((seat) => {
                      const seatNumber = rowIndex * 5 + seat + 1;
                      const isBooked = bookedSeats.includes(seatNumber);
                      const isSelected =
                        selectedSeats.includes(seatNumber);

                      return (
                        <div
                          key={seatNumber}
                          onClick={() => toggleSeat(seatNumber)}
                          style={{
                            ...styles.seat,
                            backgroundColor: isBooked
                              ? "#ef4444"
                              : isSelected
                              ? "#3b82f6"
                              : "#22c55e",
                          }}
                        >
                          {seatNumber}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {!showBookingForm ? (
              <button style={styles.bookBtn} onClick={proceedBooking}>
                Continue Booking
              </button>
            ) : (
              <div style={styles.form}>
                <input
                  style={styles.input}
                  placeholder="Enter Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <input
                  style={styles.input}
                  placeholder="Enter Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                <input
                  style={styles.input}
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button style={styles.bookBtn} onClick={bookTicket}>
                  Confirm Booking
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {ticket && (
        <div style={styles.popupOverlay}>
          <div style={styles.ticket}>
            <h2>Booking Confirmed 🎉</h2>

            <p><b>Name:</b> {ticket.user}</p>
            <p><b>Phone:</b> {ticket.phone}</p>
            <p><b>Email:</b> {ticket.email}</p>
            <p><b>Bus:</b> {ticket.busName}</p>
            <p><b>Route:</b> {ticket.route}</p>
            <p><b>Time:</b> {ticket.time}</p>
            <p><b>Seats:</b> {ticket.seats.join(", ")}</p>
            <p><b>Total Fare:</b> ₹{ticket.total}</p>

            <h3 style={{ color: "#22c55e" }}>
              Have a Happy Journey 🚍
            </h3>

            <button style={styles.cancelBtn} onClick={cancelBooking}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


const styles = {
  container: {
    padding: "20px",
    minHeight: "100vh",
    background: "#0f172a",
    color: "white",
  },

  heading: {
    textAlign: "center" as const,
  },

  busCard: {
    background: "#1e293b",
    padding: "12px",
    margin: "10px",
    borderRadius: "8px",
  },

  button: {
    background: "#3b82f6",
    color: "white",
    padding: "8px",
    border: "none",
    borderRadius: "5px",
  },

  popupOverlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  popup: {
    background: "#1e293b",
    padding: "20px",
    width: "500px",
    borderRadius: "10px",
    position: "relative" as const,
    textAlign: "center" as const,
  },

  closeBtn: {
    position: "absolute" as const,
    top: "10px",
    right: "10px",
    background: "red",
    color: "white",
    border: "none",
    padding: "5px",
  },

  busContainer: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
    alignItems: "center",
    marginTop: "15px",
  },

  row: {
    display: "flex",
    alignItems: "center",
  },

  side: {
    display: "flex",
    gap: "10px",
  },

  aisle: {
    width: "40px",
  },

  seat: {
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  form: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
  },

  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
  },

  bookBtn: {
    marginTop: "15px",
    background: "#22c55e",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
  },

  ticket: {
    background: "white",
    color: "black",
    padding: "25px",
    width: "400px",
    borderRadius: "10px",
    textAlign: "center" as const,
  },

  cancelBtn: {
    marginTop: "15px",
    background: "red",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
  },
};

