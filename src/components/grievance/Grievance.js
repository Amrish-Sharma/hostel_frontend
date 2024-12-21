import React, { useEffect, useState } from "react";
import API_BASE_URL from "../../config";
import { Link, useNavigate } from "react-router-dom";

const GrievanceList = () => {
    const [grievances, setGrievances] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_BASE_URL}/grievances`)
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setGrievances(data);
                } else {
                    console.error("Unexpected response format:", data);
                }
            })
            .catch((error) => console.error("Error fetching grievances:", error));
    }, []);

    const handleDelete = (grievanceId) => {
        if (window.confirm("Are you sure you want to delete this grievance?")) {
            fetch(`${API_BASE_URL}/grievances/${grievanceId}`, {
                method: "DELETE",
            })
                .then(() => {
                    setGrievances(grievances.filter((grievance) => grievance.id !== grievanceId));
                    navigate(0);
                })
                .catch((error) => {
                    console.error("Error deleting grievance:", error);
                });
        }
    };

    return (
        <div>
            <h2>Grievance Management</h2>
            <Link to="/add-grievance">
                <button>Add New Grievance</button>
            </Link>
            <table border="1">
                <thead>
                    <tr>
                        <th>Grievance ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {grievances.map((grievance) => (
                        <tr key={grievance.id}>
                            <td>{grievance.id}</td>
                            <td>{grievance.title}</td>
                            <td>{grievance.description}</td>
                            <td>{grievance.status}</td>
                            <td>{grievance.type}</td>
                            <td>
                                <button onClick={() => navigate(`/grievance-details/${grievance.id}`)}>Details</button>
                                <button onClick={() => navigate(`/edit-grievance/${grievance.id}`)}>Edit</button>
                                <button onClick={() => handleDelete(grievance.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GrievanceList;