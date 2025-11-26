import React from "react";
import { useFetch } from "./usefetch";

export default function App() {
  const { data, loading, error } = useFetch(
    "https://68d2d271cc7017eec5454f63.mockapi.io/api/v1/users"
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h1>User List</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {data.map((user) => (
          <li
            key={user.id}
            style={{
              border: "1px solid #ccc",
              padding: 8,
              margin: "5px auto",
              maxWidth: 200,
            }}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
