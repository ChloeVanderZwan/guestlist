import React, { useState, useEffect } from "react";

const App = () => {
  const [selectedGuestId, setSelectedGuestId] = useState(null);
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setGuests(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const selectedGuest = guests.find((g) => g.id === selectedGuestId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (selectedGuest) {
    return (
      <div
        style={{
          maxWidth: 400,
          margin: "2rem auto",
          padding: 16,
          border: "1px solid #ccc",
          borderRadius: 8
        }}>
        <h2>{selectedGuest.name}</h2>
        <p>
          <strong>Email:</strong> {selectedGuest.email}
        </p>
        <p>
          <strong>Phone:</strong> {selectedGuest.phone}
        </p>
        <p>
          <strong>Job:</strong> {selectedGuest.job || "Guest Attendee"}
        </p>
        <p>
          <strong>Bio:</strong>{" "}
          {selectedGuest.bio || "This guest has not provided a bio."}
        </p>
        <button
          style={{ marginTop: 16 }}
          onClick={() => setSelectedGuestId(null)}>
          Back
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", padding: 16 }}>
      <h1>Guest List</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {guests.map((guest) => (
          <li
            key={guest.id}
            style={{
              padding: 12,
              borderBottom: "1px solid #eee",
              cursor: "pointer"
            }}
            onClick={() => setSelectedGuestId(guest.id)}>
            <div>
              <strong>{guest.name}</strong>
            </div>
            <div style={{ color: "#555" }}>{guest.email}</div>
            <div style={{ color: "#888" }}>{guest.phone}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
