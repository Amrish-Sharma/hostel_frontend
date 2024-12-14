import React, { useEffect, useState , useCallback} from "react";
import { useParams, Link } from "react-router-dom";
import API_BASE_URL from "../../config";
import axios from "axios";

const RoomDetails = () => {
    const { id } = useParams(); // Get the room ID from the URL
    const [room, setRoom] = useState(null);

    const fetchRoomDetails = useCallback(() => {
        axios.get(`${API_BASE_URL}/rooms/${id}`)
            .then((response) => setRoom(response.data))
            .catch((error) => console.error("Error fetching room details:", error));
    }, [id]);

    useEffect(() => {
        fetchRoomDetails();
    }, [fetchRoomDetails]);

    if (!room) {
        return <p>Loading room details...</p>;
    }

    const handleVacate = (residentId) => {
        axios
            .put(`${API_BASE_URL}/rooms/${room.roomId}/vacate/${residentId}`)
            .then(() => {
                alert("Resident vacated successfully!");
                fetchRoomDetails();            })
            .catch((error) => {
                alert("Error vacating resident: " + error.response.data);
            });
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
        </div>
    );
};

export default RoomDetails;