"use client";

import { useEffect, useState } from "react";

export default function Tickets() {
  const [buses, setBuses] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  // 📦 Load buses from localStorage
  useEffect(() => {
    const data = localStorage.getItem("buses");
    if (data) {
      const parsed = JSON.parse(data);
      setBuses(parsed);
      setFiltered(parsed);
    }
  }, []);

  // 🔍 Search function
  const handleSearch = () => {
    const result = buses.filter((bus) => {
      return (
        bus.route.toLowerCase().includes(from.toLowerCase()) &&
        bus.route.toLowerCase().includes(to.toLowerCase())
      );
    });

    setFiltered(result);
  };

  return (
    <div style={styles.container}>
      <h1>Search Buses</h1>

      
      <div style={styles.searchBox}>
        <input
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          style={styles.input}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleSearch} style={styles.button}>
          Search
        </button>
      </div>

      {/* 🚌 Bus List */}
      <h2>Available Buses</h2>

      {filtered.length === 0 ? (
        <p>No buses found</p>
      ) : (
        filtered.map((bus, index) => (
          <div key={index} style={styles.card}>
            <p><b>{bus.name}</b></p>
            <p>Route: {bus.route}</p>
            <p>Time: {bus.time}</p>
            <p>Fare: ₹{bus.fare}</p>

            <button style={styles.bookBtn}>Book Now</button>
          </div>
        ))
      )}
    </div>
  );
}
const styles = {
  container: {
    padding: "20px",
  },
  searchBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap" as const,
  },
  input: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "8px 12px",
    backgroundColor: "#0a3d62",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  card: {
    border: "1px solid #ccc",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "8px",
  },
  bookBtn: {
    marginTop: "10px",
    padding: "8px",
    backgroundColor: "green",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};