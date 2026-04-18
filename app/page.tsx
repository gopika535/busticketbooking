//import Link from "next/link";



export default function Home() {
  return (
    <div>
      <main className="home-container">
        <h1>Book Your Bus Tickets Easily 🚌</h1>
        <p>Search, select, and reserve your seats in minutes.</p>


        <div className="features">

          <div className="card">
            <h2>🎉 Special Offers</h2>
            <p>Book tickets during festivals with exclusive deals and extra buses.</p>
          </div>

          <div className="card">
            <h2>🎉 Festive Bookings</h2>
            <p>Book tickets during festivals with exclusive deals and extra buses.</p>
          </div>

          <div className="card">
            <h2>🌍 Plan Your Trip</h2>
            <p>Book buses for your next vacation with comfort and ease.</p>
          </div>
          <div className="card">
             <h2>📍 Live Bus Tracking</h2>
    <p>Track your bus in real-time and stay updated on arrival time.</p>
          </div>


          <div className="card">
            <h2>👩 Safe Travel for Women</h2>
            <p>Priority seating and safety features for female passengers.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

