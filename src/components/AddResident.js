import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

const AddResident = () => {
    const [resident, setResident] = useState({
        name: "",
        roomNumber: "",
        email: "",
        phone: "",
        status: "Active",
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setResident({ ...resident, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send data to the backend
        fetch(`${API_BASE_URL}/residents`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(resident),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Resident added:", data);
                navigate("/residents");

                // You could also redirect or clear the form after success
            })
            .catch((error) => {
                console.error("Error adding resident:", error);
            });
    };

    return (
        <div>
            <h2>Add New Resident</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={resident.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Room Number:</label>
                    <input
                        type="text"
                        name="roomNumber"
                        value={resident.roomNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={resident.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={resident.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <select
                        name="status"
                        value={resident.status}
                        onChange={handleChange}
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <div>
                    <button type="submit">Add Resident</button>
                </div>
            </form>
        </div>
    );
};

export default AddResident;
