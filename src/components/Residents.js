import React, { useEffect, useState } from "react";
import API_BASE_URL from "../config";
import { Link } from "react-router-dom";


const Residents = () => {
    const [residents, setResidents] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/residents`)
            .then((response) => response.json())
            .then((data) => setResidents(data))
            .catch((error) => console.error("Error fetching residents:", error));
    }, []);

    return (
        <div>
            <h1>Residents</h1>
            <Link to="/add-resident">
                <button>Add New Resident</button>
            </Link>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Room Number</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {residents.map((resident) => (
                    <tr key={resident.id}>
                        <td>{resident.id}</td>
                        <td>{resident.name}</td>
                        <td>{resident.room.roomId}</td>
                        <td>{resident.email}</td>
                        <td>{resident.phone}</td>
                        <td>{resident.status}</td>
                        <td>
                            <Link to={`/edit-resident/${resident.id}`}>
                                <button>Edit</button>
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Residents;
