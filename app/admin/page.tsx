/*"use client";

import { useState } from "react";

export default function Admin() {
  const [buses, setBuses] = useState<string[]>([]);
  const [busName, setBusName] = useState("");

  const addBus = () => {
    if (busName.trim() === "") return;
    setBuses([...buses, busName]);
    setBusName("");
  };

  const deleteBus = (index: number) => {
    setBuses(buses.filter((_, i) => i !== index));
  };
;
  return (
    <div style={styles.container}>
      <h1>Admin Dashboard</h1>

    
      <div>
        <input
          placeholder="Enter Bus Name"
          value={busName}
          onChange={(e) => setBusName(e.target.value)}
          style={styles.input}
        />
        <button onClick={addBus} style={styles.button}>
          Add Bus
        </button>
      </div>

    
      <ul>
        {buses.map((bus, index) => (
          <li key={index}>
            {bus}
            <button onClick={() => deleteBus(index)} style={styles.delete}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}*/
"use client";
export default function Admin() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Manage buses and bookings here.</p>
      <p>view buses</p>
      <p>add buses</p>
      <p>delete buses</p>
    </div>
  );
}