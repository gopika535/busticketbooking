"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./buses.module.css";

interface Bus {
  id: number;
  name: string;
  from: string;
  to: string;
  time: string;
  price: number;
}

export default function BusesPage() {
  const [buses, setBuses] = useState<Bus[]>([]);

  const fetchBuses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/buses");
      setBuses(res.data);
    } catch (err) {
      console.error("Error fetching buses:", err);
    }
  };

  const deleteBus = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/buses/${id}`);
      fetchBuses(); // refresh after delete
    } catch (err) {
      console.error("Error deleting bus:", err);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  return (
    <div className={styles["buses-container"]}>
      {/* Header */}
      <div className={styles["buses-header"]}>
        <h1>Available Buses</h1>
        <Link href="/buses/create" className={styles["add-bus-btn"]}>
          Add Bus
        </Link>
      </div>

      {/* Table */}
      <table className={styles["buses-table"]}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Route</th>
            <th>Time</th>
            <th>Fare</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {buses.map((bus) => (
            <tr key={bus.id}>
              <td>{bus.name}</td>
              <td>
                {bus.from} → {bus.to}
              </td>
              <td>{bus.time}</td>
              <td>₹{bus.price}</td>
              <td className={styles.actions}>
                <Link
                  href={`/buses/edit/${bus.id}`}
                  className={styles["edit-btn"]}
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteBus(bus.id)}
                  className={styles["delete-btn"]}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}