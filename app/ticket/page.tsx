"use client";

import { useState } from "react";

export default function Tickets() {
  const [selectedBus, setSelectedBus] = useState<number | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  
  const buses = [
    { id: 1, name: "Express Travels", time: "10:00 AM", price: 500 },
    { id: 2, name: "City Riders", time: "2:00 PM", price: 450 },
  ];

  
  const handleSeatClick = (seat: number) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  return (
    <div style={styles.container}>
      
      <h2>Search Buses</h2>
      <div style={styles.searchBox}>
        <input placeholder="From" style={styles.input} />
        <input placeholder="To" style={styles.input} />
        <input type="date" style={styles.input} />
        <button style={styles.button}>Search</button>
      </div>


      <h2>Available Buses</h2>
      {buses.map((bus) => (
        <div key={bus.id} style={styles.busCard}>
          <h3>{bus.name}</h3>
          <p>Time: {bus.time}</p>
          <p>Price: ₹{bus.price}</p>
          <button
            style={styles.button}
            onClick={() => setSelectedBus(bus.id)}
          >
            Select Seats
          </button>
        </div>
      ))}

      {selectedBus && (
        <div style={styles.seatContainer}>
          <h2>Select Seats</h2>

          <div style={styles.seatsGrid}>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((seat) => (
              <div
                key={seat}
                style={{
                  ...styles.seat,
                  backgroundColor: selectedSeats.includes(seat)
                    ? "green"
                    : "#ccc",
                }}
                onClick={() => handleSeatClick(seat)}
              >
                {seat}
              </div>
            ))}
          </div>

          <p>Selected Seats: {selectedSeats.join(", ")}</p>
        </div>
      )}
    </div>
  );
}