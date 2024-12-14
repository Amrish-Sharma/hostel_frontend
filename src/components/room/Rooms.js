import React, { useEffect, useState } from "react";
import API_BASE_URL from "../../config";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_BASE_URL}/rooms`)
            .then((response) => response.json())
            .then((data) => setRooms(data))
            .catch((error) => console.error("Error fetching rooms:", error));
    }, []);

    const handleAssignResident = (roomId) => {
        const residentId = prompt("Enter Resident ID to assign:");
        if (!residentId) return;

        fetch(`${API_BASE_URL}/rooms/${roomId}/assignResident/${residentId}`, {
            method: "PUT",
        })
            .then((response) => {
                if (response.ok) {
                    alert("Resident assigned successfully!");
                    window.location.reload();
                } else {
                    response.text().then((error) => alert(`Error: ${error}`));
                }
            })
            .catch((error) => console.error("Error assigning resident:", error));
    };


    const handleDelete = (roomId) => {
        // Confirm deletion
        if (window.confirm("Are you sure you want to delete this room?")) {
            fetch(`${API_BASE_URL}/rooms/${roomId}`, {
                method: "DELETE",
            })
                .then(() => {
                    // Remove the resident from the list without reloading the page
                    setRooms(rooms.filter((room) => room.id !== roomId));
                    navigate(0);
                })
                .catch((error) => {
                    console.error("Error deleting room:", error);
                });
        }
    };

    return (
        <div>
            <h2>Room Management</h2>
            <Link to="/add-rooms">
                <button>Add New Room</button>
            </Link>
            <table border="1">
                <thead>
                <tr>
                    <th>Room Number</th>
                    <th>Type</th>
                    <th>Rent</th>
                    <th>Status</th>
                    <th>Capacity</th>
                    <th>Occupied</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {rooms.map((room) => (
                    <tr key={room.roomId}>
                        <td>{room.roomId}</td>
                        <td>{room.type}</td>
                        <td>{room.rent}</td>
                        <td>{room.residents.map((res) => res.name).join(", ") || "Unassigned"}</td>
                        <td>{room.capacity}</td>
                        <td>{room.occupied}</td>
                        <td>
                            <button onClick={() => handleAssignResident(room.roomId)}>Assign Resident</button>
                            <button onClick={() => navigate(`/room-details/${room.roomId}`)}>Details</button>
                            <button onClick={() => navigate(`/edit-rooms/${room.roomId}`)}>Edit</button>
                            <button onClick={() => handleDelete(room.roomId)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default RoomList;
