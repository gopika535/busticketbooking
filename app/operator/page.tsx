"use client";

import { useState, useEffect } from "react";

export default function Operator() {
  const [buses, setBuses] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [route, setRoute] = useState("");
  const [time, setTime] = useState("");
  const [fare, setFare] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("buses");
    if (data) {
      setBuses(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("buses", JSON.stringify(buses));
  }, [buses]);

  const addBus = () => {
    const newBus = { name, route, time, fare };
    setBuses([...buses, newBus]);

    setName("");
    setRoute("");
    setTime("");
    setFare("");
  };

  const deleteBus = (index: number) => {
    setBuses(buses.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>Operator Dashboard</h1>

      {/* FORM */}
      <input
        placeholder="Bus Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Route"
        value={route}
        onChange={(e) => setRoute(e.target.value)}
      />

      <input
        placeholder="Time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <input
        placeholder="Fare"
        value={fare}
        onChange={(e) => setFare(e.target.value)}
      />

      <button onClick={addBus}>Add Bus</button>

      {/* TABLE */}
      <h2>Bus List</h2>

      {buses.length === 0 ? (
        <p>No buses added</p>
      ) : (
        <table border={1}>
          <tbody>
            {buses.map((bus, index) => (
              <tr key={index}>
                <td>{bus.name}</td>
                <td>{bus.route}</td>
                <td>{bus.time}</td>
                <td>{bus.fare}</td>
                <td>
                  <button onClick={() => deleteBus(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}