import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const ActiveResidents = () => {
    const [residents, setResidents] = useState([]);

    useEffect(() => {
        axios
            .get(`${API_BASE_URL}/residents/active`)
            .then((response) => setResidents(response.data))
            .catch((error) => console.error("Error fetching residents:", error));
    }, []);

    return (
        <div>
            <h1>Active Residents</h1>
            <ul>
                {residents.map((resident) => (
                    <li key={resident.id}>
                        {resident.name} - {resident.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActiveResidents;
