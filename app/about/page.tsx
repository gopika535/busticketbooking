
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
      <ul style={styles.list}>
        <li>Search buses based on source, destination, and date</li>
        <li>View routes, schedules, and bus operator details</li>
        <li>Real-time seat availability tracking</li>
        <li>Easy seat selection and booking</li>
        <li>Multiple payment options</li>
        <li>User roles: Admin, Operator, Customer, Guest</li>
      </ul>

    
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
    maxWidth: "900px",
    margin: "60px auto",
    padding: "20px",
    fontFamily: "Georgia, serif",
    lineHeight: "1.8",
    color: "#222",
  },
  heading: {
    textAlign: "center" as const,
    fontSize: "32px",
    marginBottom: "20px",
    borderBottom: "2px solid #0a3d62",
    paddingBottom: "10px",
  },
  subheading: {
    marginTop: "30px",
    fontSize: "22px",
    color: "#0a3d62",
  },
  text: {
    fontSize: "16px",
    marginBottom: "15px",
    textAlign: "justify" as const,
  },
  list: {
    marginTop: "10px",
    paddingLeft: "20px",
  },
};