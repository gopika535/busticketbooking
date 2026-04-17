
"use client";

export default function About() {
  return (
    <div style={styles.container}>
      
      <h1 style={styles.heading}>About Us</h1>

      <p style={styles.text}>
        The Bus Ticket Booking System is designed to simplify and enhance the
        process of booking bus tickets. It provides users with an easy and
        efficient way to search, compare, and book bus services from multiple
        operators in one place.
      </p>

      <h2 style={styles.subheading}>Features</h2>

      
      <div style={styles.featuresContainer}>

        <div style={styles.card}>
          <div>
            <h3 style={styles.cardTitle}>Search</h3>
            <p style={styles.cardText}>Find buses by source, destination and date</p>
          </div>
        </div>

        <div style={styles.card}>
          <div>
            <h3 style={styles.cardTitle}>Routes</h3>
            <p style={styles.cardText}>View routes, schedules and operators</p>
          </div>
        </div>

        <div style={styles.card}>
          <div>
            <h3 style={styles.cardTitle}>Availability</h3>
            <p style={styles.cardText}>Real-time seat tracking system</p>
          </div>
        </div>

        <div style={styles.card}>
          <div>
            <h3 style={styles.cardTitle}>Booking</h3>
            <p style={styles.cardText}>Easy seat selection & booking</p>
          </div>
        </div>

        <div style={styles.card}>
          <div>
            <h3 style={styles.cardTitle}>Payment</h3>
            <p style={styles.cardText}>Supports multiple payment methods</p>
          </div>
        </div>

        <div style={styles.card}>
          {/* <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" style={styles.icon}/> */}
          <div>
            <h3 style={styles.cardTitle}>Users</h3>
            <p style={styles.cardText}>Admin, Operator, Customer roles</p>
          </div>
        </div>

      </div>

      <h2 style={styles.subheading}>Our Goal</h2>
      <p style={styles.text}>
        Our goal is to provide a reliable, fast, and user-friendly platform
        that makes bus ticket booking simple and accessible for everyone.
      </p>

    </div>
  );
}
const styles = {
  container: {
    maxWidth: "1000px",
    margin: "50px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },

  heading: {
    textAlign: "center",
    fontSize: "32px",
    marginBottom: "20px",
  },

  subheading: {
    marginTop: "30px",
    fontSize: "22px",
  },

  text: {
    fontSize: "16px",
    marginBottom: "20px",
    textAlign: "justify",
  },

 
  featuresContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },

  
  card: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
    background: "#1e2a38",
    color: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
    transition: "0.3s",
  },

  icon: {
    width: "40px",
    height: "40px",
  },

  cardTitle: {
    margin: 0,
    fontSize: "16px",
  },

  cardText: {
    margin: 0,
    fontSize: "13px",
    opacity: 0.8,
  },
};
