"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    
    if (email === "admin@gmail.com" && password === "1234") {
      localStorage.setItem("role", "admin");
      localStorage.setItem("user", JSON.stringify({ email }));

      alert("Admin Login Successful");
      router.push("/admin");
    }

    
    else if (email === "operator@gmail.com" && password === "1234") {
      localStorage.setItem("role", "operator");
      localStorage.setItem("user", JSON.stringify({ email }));

      alert("Operator Login Successful");
      router.push("/operator");
    }

   
    else if (email && password) {
      localStorage.setItem("role", "user");
      localStorage.setItem("user", JSON.stringify({ email }));

      alert("User Login Successful");
      router.push("/");
    }

 
    else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        
        <h2 style={styles.heading}>Login</h2>

        <label style={styles.label}>Email:</label>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        <label style={styles.label}>Password:</label>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        /><br/>
        

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}/*"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

  
    if (email === "admin@gmail.com" && password === "1234") {
      localStorage.setItem("user", JSON.stringify({ email }));

      alert("Login successful!");
      router.push("/admin"); 
    } else {
      alert("Invalid Email or Password");
    }
  };
  const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();

  if (email === "admin@gmail.com" && password === "1234") {
    localStorage.setItem("role", "admin");
    localStorage.setItem("user", JSON.stringify({ email }));

    alert("Admin Login Successful");
    router.push("/admin");
  }

  else if (email === "operator@gmail.com" && password === "1234") {
    localStorage.setItem("role", "operator");
    localStorage.setItem("user", JSON.stringify({ email }));

    alert("Operator Login Successful");
    router.push("/operator");
  }
  else if (email && password) {
    localStorage.setItem("role", "user");
    localStorage.setItem("user", JSON.stringify({ email }));

    alert("User Login Successful");
    router.push("/");
  }
  else {
    alert("Invalid Email or Password");
  }
};

  return (
    <div style={styles.container}>
     
      <form onSubmit={handleLogin} style={styles.form}>
        <label style={{ color: "black" }}>Email:</label>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        <label style={{ color: "black" }}>Password :</label>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}*/


const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "15px",
    width: "300px",
    backgroundColor: "white",   
    padding: "30px",            
    borderRadius: "10px",      
    boxShadow: "0 0 10px rgba(0,0,0,0.1)" 
  },
  heading: {
    marginBottom: "10px",
    textAlign: "center" as const,
    color: "black", 
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    color: "black",         
    backgroundColor: "white" 
  },
  button: {
    padding: "10px",
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};