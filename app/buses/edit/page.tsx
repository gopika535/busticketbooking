
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import styles from "../buses.module.css"; // reuse your table CSS or add form styles

interface Bus {
  id: number;
  name: string;
  from: string;
  to: string;
  time: string;
  price: number;
}

export default function EditBusPage() {
  const router = useRouter();
  const params = useParams();
  const busId = params.id;

  const [bus, setBus] = useState<Bus | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch bus details on mount
  useEffect(() => {
    const fetchBus = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/buses/${busId}`);
        setBus(res.data);
      } catch (err) {
        console.error("Error fetching bus:", err);
      }
    };
    if (busId) fetchBus();
  }, [busId]);

  // Update bus
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bus) return;

    setIsSubmitting(true);
    try {
      await axios.put(`http://localhost:5000/buses/${busId}`, {
        name: bus.name,
        from: bus.from,
        to: bus.to,
        time: bus.time,
        price: Number(bus.price),
      });
      router.push("/buses"); // redirect to list after update
    } catch (err) {
      console.error("Error updating bus:", err);
      setIsSubmitting(false);
    }
  };

  if (!bus) return <p>Loading bus details...</p>;

  return (
    <div className={styles.formContainer}>
      <h1>Edit Bus</h1>
      <form onSubmit={handleSubmit} className={styles.busForm}>
        <label>Bus Name</label>
        <input
          type="text"
          value={bus.name}
          required
          onChange={(e) => setBus({ ...bus, name: e.target.value })}
        />

        <label>From</label>
        <input
          type="text"
          value={bus.from}
          required
          onChange={(e) => setBus({ ...bus, from: e.target.value })}
        />

        <label>To</label>
        <input
          type="text"
          value={bus.to}
          required
          onChange={(e) => setBus({ ...bus, to: e.target.value })}
        />

        <label>Time</label>
        <input
          type="text"
          value={bus.time}
          required
          onChange={(e) => setBus({ ...bus, time: e.target.value })}
        />

        <label>Fare</label>
        <input
          type="number"
          value={bus.price}
          required
          onChange={(e) => setBus({ ...bus, price: Number(e.target.value) })}
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Bus"}
        </button>
      </form>
    </div>
  );
}