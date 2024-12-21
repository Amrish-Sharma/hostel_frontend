import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../config";

const GrievanceForm = ({ onSubmit }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("Room Maintenance");
    const [rooms, setRooms] = useState([]);
    const [residents, setResidents] = useState([]);
    const [selectedRoomId, setSelectedRoomId] = useState("");
    const [selectedResidentId, setSelectedResidentId] = useState("");

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/rooms`);
                setRooms(response.data);
            } catch (error) {
                console.error("Error fetching rooms:", error);
            }
        };

        fetchRooms();
    }, []);

    useEffect(() => {
        if (selectedRoomId) {
            const fetchResidents = async () => {
                try {
                    const response = await axios.get(`${API_BASE_URL}/rooms/${selectedRoomId}/residents`);
                    setResidents(response.data);
                } catch (error) {
                    console.error("Error fetching residents:", error);
                }
            };

            fetchResidents();
        }
    }, [selectedRoomId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const grievance = {
            title,
            description,
            type,
            room: { roomId: selectedRoomId },
            resident: { id: selectedResidentId }
        };

        try {
            await axios.post(`${API_BASE_URL}/grievances`, grievance);
            alert("Grievance reported successfully!");
            setTitle("");
            setDescription("");
            setSelectedRoomId("");
            setSelectedResidentId("");
            if (onSubmit) onSubmit();
        } catch (error) {
            alert("Failed to report grievance: " + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Report a Grievance</h2>
            <div>
                <label>Room:</label>
                <select
                    value={selectedRoomId}
                    onChange={(e) => setSelectedRoomId(e.target.value)}
                    required
                >
                    <option value="">Select Room</option>
                    {rooms.map((room) => (
                        <option key={room.id} value={room.id}>
                            {room.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Resident:</label>
                <select
                    value={selectedResidentId}
                    onChange={(e) => setSelectedResidentId(e.target.value)}
                    required
                >
                    <option value="">Select Resident</option>
                    {residents.map((resident) => (
                        <option key={resident.id} value={resident.id}>
                            {resident.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default GrievanceForm;