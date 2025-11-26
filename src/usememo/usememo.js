import React, { useState, useMemo } from "react";

export default function App() {
  const [numbers, setNumbers] = useState([1, 2, 3]);
  const [count, setCount] = useState(0);

  // useMemo to memoize sum calculation
  const sum = useMemo(() => {
    console.log("Calculating sum...");
    return numbers.reduce((a, b) => a + b, 0);
  }, [numbers]); // only recalc when numbers change

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h2>Sum: {sum}</h2>

      <button onClick={() => setNumbers([...numbers, 4])}>
        Add 4
      </button>

      <button onClick={() => setCount(count + 1)} style={{ marginLeft: 10 }}>
        Increment Count: {count}
      </button>
    </div>
  );
}
