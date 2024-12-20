import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import API_BASE_URL from "../../config";
import axios from "axios";
import "../..//RoomDetails.css"; // Import the CSS file

const RoomDetails = () => {
    const { id } = useParams(); // Get the room ID from the URL
    const [room, setRoom] = useState(null);
    const [occupancyHistory, setOccupancyHistory] = useState(null);

    const fetchRoomDetails = useCallback(() => {
        axios.get(`${API_BASE_URL}/rooms/${id}`)
            .then((response) => setRoom(response.data))
            .catch((error) => console.error("Error fetching room details:", error));
    }, [id]);

    const fetchOccupancyHistory = useCallback(() => {
        axios.get(`${API_BASE_URL}/rooms/occupancy-history/${id}`)
            .then((response) => setOccupancyHistory(response.data))
            .catch((error) => console.error("Error fetching occupancy history:", error));
    }, [id]);

    useEffect(() => {
        fetchRoomDetails();
    }, [fetchRoomDetails]);

    if (!room) {
        return <p>Loading room details...</p>;
    }

    const handleVacate = (residentId) => {
        if (window.confirm("Are you sure you want to vacate this resident?")) {
            axios
                .put(`${API_BASE_URL}/rooms/${Number(room.roomId)}/vacate/${residentId}`)
                .then(() => {
                    alert("Resident vacated successfully!");
                    fetchRoomDetails();
                })
                .catch((error) => {
                    alert("Error vacating resident: " + error.response.data);
                });
        }
    };

    return (
        <div>
            <h2>Room Details</h2>
            <p>Room ID: {room.roomId}</p>
            <p>Type: {room.type}</p>
            <p>Status: {room.status}</p>
            <p>Occupancy: {room.occupied} / {room.capacity}</p>

            <h3>Residents</h3>
            <ul>
                {room.residents.map((resident) => (
                    <li key={resident.id}>
                        {resident.name}
                        <button onClick={() => handleVacate(resident.id)}>Vacate</button>
                    </li>
                ))}
            </ul>
            <Link to="/rooms">
                <button>Back to Rooms List</button>
            </Link>
            <button onClick={fetchOccupancyHistory}>Room Occupancy History</button>

            {occupancyHistory && (
                <div>
                    <h3>Occupancy History</h3>
                    <table className="occupancy-table">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Resident</th>
                                <th>Allotted At</th>
                                <th>Vacated At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {occupancyHistory.map((history, index) => (
                                <tr key={history.id}>
                                    <td>{index + 1}</td>
                                    <td>{history.resident.name}</td>
                                    <td>{new Date(history.allottedAt).toLocaleString()}</td>
                                    <td>{history.vacatedAt ? new Date(history.vacatedAt).toLocaleString() : "N/A"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default RoomDetails;