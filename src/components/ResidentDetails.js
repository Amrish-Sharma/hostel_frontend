import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API_BASE_URL from "../config";

const ResidentDetails = () => {
    const { id } = useParams(); // Get the resident ID from the URL
    const [resident, setResident] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/residents/${id}`)
            .then((response) => response.json())
            .then((data) => setResident(data))
            .catch((error) => console.error("Error fetching resident details:", error));
    }, [id]);

    if (!resident) {
        return <p>Loading resident details...</p>;
    }

    return (
        <div>
            <h2>Resident Details</h2>
            <p><strong>ID:</strong> {resident.id}</p>
            <p><strong>Name:</strong> {resident.name}</p>
            <p><strong>Room Number:</strong> {resident.roomNumber}</p>
            <p><strong>Email:</strong> {resident.email}</p>
            <p><strong>Phone:</strong> {resident.phone}</p>
            <p><strong>Status:</strong> {resident.status}</p>
            <p><strong>Address:</strong> {resident.address || "N/A"}</p>
            <p><strong>Date of Joining:</strong> {resident.dateOfJoining || "N/A"}</p>
            <Link to="/">
                <button>Back to Residents List</button>
            </Link>
        </div>
    );
};

export default ResidentDetails;
