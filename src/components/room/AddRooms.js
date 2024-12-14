import React, { useState } from "react";
import API_BASE_URL from "../../config";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
    const [roomNumber, setRoomNumber] = useState("");
    const [type, setType] = useState("Single");
    const [rent, setRent] = useState("");
    const [capacity, setCapacity] = useState("");
    const [occupied, setOccupied] = useState("");
    const [status, setStatus] = useState("Available");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const newRoom = {
            roomNumber,
            type,
            rent: parseFloat(rent),
            capacity: parseInt(capacity, 10),
            occupied: parseInt(occupied, 10),
            status
        };

        fetch(`${API_BASE_URL}/rooms`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newRoom),
        })
            .then((response) => {
                if (response.ok) {
                    console.log("Room added successfully!");
                    setRoomNumber("");
                    setType("Single");
                    setRent("");
                    setCapacity("");
                    setOccupied("");
                    setStatus("Available");
                    navigate("/rooms");
                } else {
                    alert("Error adding room");
                }
            })
            .catch((error) => console.error("Error adding room:", error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Room</h2>
            <div>
                <label>Room Number:</label>
                <input
                    type="text"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Room Type:</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="Single">Single</option>
                    <option value="Double">Double</option>
                </select>
            </div>
            <div>
                <label>Rent Amount:</label>
                <input
                    type="number"
                    value={rent}
                    onChange={(e) => setRent(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Capacity:</label>
                <input
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Occupied:</label>
                <input
                    type="number"
                    value={occupied}
                    onChange={(e) => setOccupied(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Status:</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                </select>
            </div>
            <button type="submit">Add Room</button>
            <button type="button" onClick={() => navigate("/rooms")}>Cancel</button>
        </form>
    );
};

export default AddRoom;