"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./buses.module.css";

interface Bus {
  id: string;
  name: string;
  from: string;
  to: string;
  time: string;
  price: number;
}

interface Booking {
  id: string;
  busId: string;
  seats: number;
  user: string;
}

export default function BusesPage() {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [userDetails, setUserDetails] = useState<any[]>([]);

  const [report, setReport] = useState({
    totalUsers: 0,
    totalRevenue: 0,
    popularRoute: "",
  });

  // ✅ Fetch buses
  const fetchBuses = async () => {
    const res = await axios.get("http://localhost:5000/buses");
    setBuses(res.data);
  };

  // ✅ Fetch bookings
  const fetchBookings = async () => {
    const res = await axios.get("http://localhost:5000/bookings");
    setBookings(res.data);
  };

  // ✅ Delete bus
  const deleteBus = async (id: string) => {
    await axios.delete(`http://localhost:5000/buses/${id}`);
    alert("Bus has been canceled");
    fetchBuses();
  };

  // ✅ REPORT + USER LIST
  const calculateReport = () => {
    const uniqueUsers = new Set(bookings.map((b) => b.user));
    let totalUsers = uniqueUsers.size;

    let totalRevenue = 0;
    let routeCount: Record<string, number> = {};
    let userList: any[] = [];

    bookings.forEach((booking) => {
      const bus = buses.find((b) => b.id === booking.busId);

      if (bus) {
        totalRevenue += bus.price * booking.seats;

        const route = `${bus.from} → ${bus.to}`;
        routeCount[route] = (routeCount[route] || 0) + booking.seats;

        // ✅ USER DETAILS
        userList.push({
          user: booking.user,
          busName: bus.name,
          seats: booking.seats,
        });
      }
    });

    let popularRoute = "";
    let max = 0;

    for (let route in routeCount) {
      if (routeCount[route] > max) {
        max = routeCount[route];
        popularRoute = route;
      }
    }

    setReport({ totalUsers, totalRevenue, popularRoute });
    setUserDetails(userList);
  };

  useEffect(() => {
    fetchBuses();
    fetchBookings();
  }, []);

  useEffect(() => {
    calculateReport();
  }, [buses, bookings]);

  return (
    <div className={styles["buses-container"]}>

      {/* HEADER */}
      <div className={styles["buses-header"]}>
        <h1>Available Buses</h1>
        <Link href="/buses/create" className={styles["add-bus-btn"]}>
          Add Bus
        </Link>
      </div>

      {/* TABLE */}
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
              <td>{bus.from} → {bus.to}</td>
              <td>{bus.time}</td>
              <td>₹{bus.price}</td>
              <td>
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

      {/* REPORTS */}
      <div className={styles["report-container"]}>
        <h2>Reports Dashboard</h2>

        <div className={styles["report-cards"]}>
          <div className={styles.card}>
            <h3>👤 Total Users Booked</h3>
            <p>{report.totalUsers}</p>
          </div>

          <div className={styles.card}>
            <h3>💰 Total Revenue</h3>
            <p>₹{report.totalRevenue}</p>
          </div>

          <div className={styles.card}>
            <h3>🛣️ Popular Route</h3>
            <p>{report.popularRoute || "N/A"}</p>
          </div>
        </div>

        {/* ✅ USER LIST */}
        <div className={styles["user-list"]}>
          <h3>Users Booking Details</h3>

          {userDetails.length === 0 ? (
            <p>No bookings yet</p>
          ) : (
            <table className={styles["user-table"]}>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Bus</th>
                  <th>Seats</th>
                </tr>
              </thead>

              <tbody>
                {userDetails.map((u, index) => (
                  <tr key={index}>
                    <td>{u.user}</td>
                    <td>{u.busName}</td>
                    <td>{u.seats}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}