import React, { useState, useEffect } from "react";

const API_URL = "https://68d2d271cc7017eec5454f63.mockapi.io/api/v1/users";

export default function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Load users on first render
  useEffect(() => {
    getUsers();
  }, []);

  // Get all users
  const getUsers = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setUsers(data);
  };

  // Add new user
  const addUser = async () => {
    if (!name) return;
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setName("");
    getUsers();
  };

  // Update user
  const updateUser = async () => {
    if (!name) return;
    await fetch(`${API_URL}/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setName("");
    setEditingId(null);
    getUsers();
  };

  // Delete user
  const deleteUser = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    getUsers();
  };

  return (
    <div style={{ maxWidth: 400, margin: "30px auto", textAlign: "center" }}>
      <h2>User Management</h2>

      {/* Input + Add/Update button */}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
        style={{ padding: "6px", marginRight: "5px" }}
      />
      <button onClick={editingId ? updateUser : addUser}>
        {editingId ? "Update" : "Add"}
      </button>

      {/* User list */}
      <ul style={{ padding: 0, marginTop: 20, listStyle: "none" }}>
        {users.map((u) => (
          <li
            key={u.id}
            style={{
              margin: "6px 0",
              padding: "6px",
              border: "1px solid #ccc",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {u.name}
            <div>
              <button onClick={() => { setName(u.name); setEditingId(u.id); }}>
                Edit
              </button>
              <button onClick={() => deleteUser(u.id)} style={{ marginLeft: 5 }}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
