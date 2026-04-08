import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar">
          <h2 className="logo">BusBooking 🚌</h2>
          <ul className="nav-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/login">Login</Link></li>
          </ul>
        </nav>
        {children}

        <footer className="footer">
          <p>© 2026 BusBooking. All rights reserved.</p>
        </footer>

      </body>
    </html>
  );
}