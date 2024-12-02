import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API_BASE_URL from "../../config";

const EditRoom = () => {
    const { id } = useParams(); // Get room id from the URL
    const [room, setRoom] = useState({
        type: "Single",
        rent: "",
        capacity: "",
        occupied: "",
        status: "Available",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isSubmitting) {
            // Fetch room details by id
            fetch(`${API_BASE_URL}/rooms/${id}`)
                .then((response) => response.json())
                .then((data) => setRoom(data))
                .catch((error) => console.error("Error fetching room data:", error));
        }
    }, [id, isSubmitting]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoom({ ...room, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Send updated room data to the backend
        fetch(`${API_BASE_URL}/rooms/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(room),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Room updated:", data);
                // Redirect to the rooms list page
                navigate("/rooms");
            })
            .catch((error) => {
                console.error("Error updating room:", error);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <div>
            <h2>Edit Room</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Room Type:</label>
                    <select
                        name="type"
                        value={room.type}
                        onChange={handleChange}
                    >
                        <option value="Single">Single</option>
                        <option value="Double">Double</option>
                    </select>
                </div>
                <div>
                    <label>Rent Amount:</label>
                    <input
                        type="number"
                        name="rent"
                        value={room.rent}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Capacity:</label>
                    <input
                        type="number"
                        name="capacity"
                        value={room.capacity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Occupied:</label>
                    <input
                        type="number"
                        name="occupied"
                        value={room.occupied}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <select
                        name="status"
                        value={room.status}
                        onChange={handleChange}
                    >
                        <option value="Available">Available</option>
                        <option value="Occupied">Occupied</option>
                    </select>
                </div>
                <div>
                    <button type="submit">Update Room</button>
                </div>
                <div>
                    <button onClick={() => navigate("/rooms")}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditRoom;