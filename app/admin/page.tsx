
"use client";

export default function Admin() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Admin Dashboard</h1>

        <p style={styles.text}>Manage buses and bookings here.</p>
        <p style={styles.text}>View buses</p>
       
        <a href="/buses" style={styles.link}>
          Go to Buses
        </a>
      </div>
    </div>
  );
}
const styles = {
  container: {
    padding: "40px",
    textAlign: "center" as const,
    minHeight: "80vh",
    backgroundColor: "#f4f6f9",
  },
  card: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "400px",
    margin: "auto",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  heading: {
    color: "#0a3d62",
    marginBottom: "10px",
  },
  text: {
    color: "#333",
    margin: "8px 0",
  },
  link: {
    display: "inline-block",
    marginTop: "20px",
    padding: "10px 15px",
    backgroundColor: "#0a3d62",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px",
  },
};