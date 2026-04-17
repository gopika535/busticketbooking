/*"use client";

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
}

export default function BusesPage() {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const [report, setReport] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    popularRoute: "",
  });

  const dummyBuses: Bus[] = [
    {
      id: "1",
      name: "Express Travels",
      from: "Chennai",
      to: "Bangalore",
      time: "10:00 AM",
      price: 500,
    },
    {
      id: "2",
      name: "Super Fast",
      from: "Chennai",
      to: "Hyderabad",
      time: "02:00 PM",
      price: 800,
    },
    {
      id: "3",
      name: "Ayappa Travels",
      from: "Bangalore",
      to: "Salem",
      time: "11:00 PM",
      price: 1500,
    },
    {
      id: "4",
      name: "KPN Travels",
      from: "Salem",
      to: "Trichy",
      time: "4:00 PM",
      price: 250,
    },
  ];

  const dummyBookings: Booking[] = [
    { id: "b1", busId: "1", seats: 2 },
    { id: "b2", busId: "1", seats: 3 },
    { id: "b3", busId: "2", seats: 1 },
    { id: "b4", busId: "3", seats: 4 },
  ];

  const fetchBuses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/buses");
      setBuses(res.data);
    } catch (err) {
      console.error("Error fetching buses:", err);
      setBuses(dummyBuses);
    }
  };

  const deleteBus = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/buses/${id}`);
      alert("Bus has been canceled");
      fetchBuses();
    } catch (err) {
      console.error("Error deleting bus:", err);
    }
  };
  const calculateReport = () => {
    let totalBookings = bookings.length;
    let totalRevenue = 0;
    let routeCount: Record<string, number> = {};

    bookings.forEach((booking) => {
      const bus = buses.find((b) => b.id === booking.busId);
      if (bus) {
        totalRevenue += bus.price * booking.seats;

        const route = `${bus.from} → ${bus.to}`;
        routeCount[route] = (routeCount[route] || 0) + booking.seats;
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

    setReport({
      totalBookings,
      totalRevenue,
      popularRoute,
    });
  };

  useEffect(() => {
    fetchBuses();
    setBookings(dummyBookings);
  }, []);

  useEffect(() => {
    calculateReport();
  }, [buses, bookings]);

  return (
    <div className={styles["buses-container"]}>
     
      <div className={styles["buses-header"]}>
        <h1>Available Buses</h1>
        <Link href="/buses/create" className={styles["add-bus-btn"]}>
          Add Bus
        </Link>
      </div>
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
          {buses.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                No buses available
              </td>
            </tr>
          ) : (
            buses.map((bus) => (
              <tr key={bus.id}>
                <td>{bus.name}</td>
                <td>
                  {bus.from} → {bus.to}
                </td>
                <td>{bus.time}</td>
                <td>₹{bus.price}</td>

                <td className={styles.actions}>
                  <button
                    onClick={() => deleteBus(bus.id)}
                    className={styles["delete-btn"]}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className={styles["report-container"]}>
        <h2>Reports Dashboard</h2>

        <div className={styles["report-cards"]}>
          <div className={styles.card}>
            <h3>Total Bookings</h3>
            <p>{report.totalBookings}</p>
          </div>

          <div className={styles.card}>
            <h3>Total Revenue</h3>
            <p>₹{report.totalRevenue}</p>
          </div>

          <div className={styles.card}>
            <h3>Popular Route</h3>
            <p>{report.popularRoute || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}*/

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
}

export default function BusesPage() {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const [report, setReport] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    popularRoute: "",
  });

  // Fetch buses from db.json
  const fetchBuses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/buses");
      setBuses(res.data);
    } catch (err) {
      console.error("Error fetching buses:", err);
    }
  };

  // Fetch bookings from db.json
  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  // Delete bus
  const deleteBus = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/buses/${id}`);
      alert("Bus has been canceled");
      fetchBuses();
    } catch (err) {
      console.error("Error deleting bus:", err);
    }
  };

  // Reports Calculation
  const calculateReport = () => {
    let totalBookings = bookings.length;
    let totalRevenue = 0;
    let routeCount: Record<string, number> = {};

    bookings.forEach((booking) => {
      const bus = buses.find((b) => b.id === booking.busId);

      if (bus) {
        totalRevenue += bus.price * booking.seats;

        const route = `${bus.from} → ${bus.to}`;
        routeCount[route] = (routeCount[route] || 0) + booking.seats;
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

    setReport({
      totalBookings,
      totalRevenue,
      popularRoute,
    });
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
      
      <div className={styles["buses-header"]}>
        <h1>Available Buses</h1>

        <Link href="/buses/create" className={styles["add-bus-btn"]}>
          Add Bus
        </Link>
      </div>

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
          {buses.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                No buses available
              </td>
            </tr>
          ) : (
            buses.map((bus) => (
              <tr key={bus.id}>
                <td>{bus.name}</td>

                <td>
                  {bus.from} → {bus.to}
                </td>

                <td>{bus.time}</td>

                <td>₹{bus.price}</td>

                <td className={styles.actions}>
                  <button
                    onClick={() => deleteBus(bus.id)}
                    className={styles["delete-btn"]}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Reports */}
      <div className={styles["report-container"]}>
        <h2>Reports Dashboard</h2>

        <div className={styles["report-cards"]}>
          <div className={styles.card}>
            <h3>Total Bookings</h3>
            <p>{report.totalBookings}</p>
          </div>

          <div className={styles.card}>
            <h3>Total Revenue</h3>
            <p>₹{report.totalRevenue}</p>
          </div>

          <div className={styles.card}>
            <h3>Popular Route</h3>
            <p>{report.popularRoute || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

