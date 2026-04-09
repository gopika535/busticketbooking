
"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./create.module.css";
import axios from "axios";

export default function AddBusPage() {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post("http://localhost:5000/buses", {
        name,
        from,
        to,
        time,
        price: Number(price),
      });
      router.push("/buses"); 
    } catch (err) {
      console.error("Error adding bus:", err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles["form-container"]}>
      <h1>Add New Bus</h1>
      <form onSubmit={handleSubmit} className={styles["bus-form"]}>
        <label>Bus Name</label>
        <input
          type="text"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />

        <label>From</label>
        <input
          type="text"
          value={from}
          required
          onChange={(e) => setFrom(e.target.value)}
        />

        <label>To</label>
        <input
          type="text"
          value={to}
          required
          onChange={(e) => setTo(e.target.value)}
        />

        <label>Time</label>
        <input
          type="text"
          value={time}
          placeholder="09:00 AM"
          required
          onChange={(e) => setTime(e.target.value)}
        />

        <label>Fare</label>
        <input
          type="number"
          value={price}
          required
          onChange={(e) => setPrice(e.target.value)}
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Bus"}
        </button>
      </form>
    </div>
  );
}