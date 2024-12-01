import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API_BASE_URL from "../config";


const EditResident = () => {
    const { id } = useParams(); // Get resident id from the URL
    const [resident, setResident] = useState({
        name: "",
        roomNumber: "",
        email: "",
        phone: "",
        status: "Active",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
    if (!isSubmitting)
        {
            // Fetch resident details by id
            fetch(`${API_BASE_URL}/residents/${id}`)
                .then((response) => response.json())
                .then((data) => setResident({...data, roomNumber: data.room.roomId}))
                .catch((error) => console.error("Error fetching resident data:", error));
        }}, [id,isSubmitting]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setResident({ ...resident, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Send updated resident data to the backend
        fetch(`${API_BASE_URL}/residents/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...resident, roomNumber: resident.room.roomId}),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Resident updated:", data);
                // Redirect to the residents list page
                navigate("/residents");
            })
            .catch((error) => {
                console.error("Error updating resident:", error);
            }).finally(() => {
            setIsSubmitting(false);
        });
    };

    return (
        <div>
            <h2>Edit Resident</h2>
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
                    <button type="submit">Update Resident</button>
                </div>
            </form>
        </div>
    );
};

export default EditResident;
