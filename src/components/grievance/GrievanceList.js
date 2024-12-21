import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../config";

const GrievanceList = () => {
    const [grievances, setGrievances] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchGrievances();
    }, []);

    const fetchGrievances = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/grievances`);
            setGrievances(response.data);
            navigate("/grievances");
        } catch (error) {
            alert("Failed to fetch grievances: " + error.message);
        }
    };

    return (
        <div>
            <h2>Grievance List</h2>
            <ul>
                {grievances.map((grievance) => (
                    <li key={grievance.id}>
                        {grievance.title} - {grievance.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GrievanceList;