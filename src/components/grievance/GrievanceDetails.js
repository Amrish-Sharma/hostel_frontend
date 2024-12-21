import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config";

const GrievanceDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [grievance, setGrievance] = useState(null);
    const [status, setStatus] = useState("");

    useEffect(() => {
        const fetchGrievanceDetails = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/grievances/${id}`);
                const grievanceData = response.data[0];
                setGrievance(grievanceData);
                setStatus(grievanceData.status);
            } catch (error) {
                console.error("Error fetching grievance details:", error);
            }
        };

        fetchGrievanceDetails();
    }, [id]);

    const updateStatus = async (newStatus) => {
        try {
            await axios.put(`${API_BASE_URL}/grievances/${id}`, {
                status: newStatus,
            });
            setStatus(newStatus);
            alert("Status updated successfully!");
        } catch (error) {
            alert("Failed to update status: " + error.message);
        }
    };

    if (!grievance) {
        return <p>Loading grievance details...</p>;
    }

    return (
        <div>
            <h2>Grievance Details</h2>
            <p><strong>Title:</strong> {grievance.title}</p>
            <p><strong>Description:</strong> {grievance.description}</p>
            <p><strong>Status:</strong> {status}</p>
            <p><strong>Created At:</strong> {new Date(grievance.createdAt).toLocaleString()}</p>
            <p><strong>Resident Name:</strong> {grievance.resident.name}</p>
            <p><strong>Resident Email:</strong> {grievance.resident.email}</p>
            <p><strong>Resident Phone:</strong> {grievance.resident.phone}</p>
            <p><strong>Resident Address:</strong> {grievance.resident.address}</p>
            <button onClick={() => updateStatus("In Progress")}>Mark In Progress</button>
            <button onClick={() => updateStatus("Resolved")}>Mark Resolved</button>
            <button onClick={() => navigate(-1)}>Close</button>
        </div>
    );
};

export default GrievanceDetails;