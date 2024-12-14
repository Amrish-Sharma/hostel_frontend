import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config";

const AddResident = () => {
    const [resident, setResident] = useState({
        name: "",
        roomId: "",
        email: "",
        phone: "",
        status: "Active",
    });
    const [rooms, setRooms] = useState([]);
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_BASE_URL}/rooms/available`)
            .then((response) => response.json())
            .then((data) => setRooms(data))
            .catch((error) => console.error("Error fetching rooms:", error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setResident({ ...resident,
            [name]: name === "roomId" ? parseInt(value, 10) : value
        });

        if (name === "phone") {
            setPhoneError(value.length > 10 ? "Phone number must be a maximum of 10 digits" : "");
        }
        if (name === "email") {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setEmailError(!emailPattern.test(value) ? "Email must be a valid email address" : "");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (phoneError || emailError || isSubmitting) {
            return;
        }

        setIsSubmitting(true);

        const residentData = {
            ...resident,
            roomId: parseInt(resident.roomId)
        };

        fetch(`${API_BASE_URL}/residents`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(residentData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Resident added:", data);
                navigate("/residents");
            })
            .catch((error) => {
                console.error("Error adding resident:", error);
            })
            .finally(() => {
                setIsSubmitting(false);
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
                    <select
                        name="roomId"
                        value={resident.roomId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Room</option>
                        {rooms.map((room) => (
                            <option key={room.roomId} value={room.roomId}>
                                {room.roomId} - {room.type}
                            </option>
                        ))}
                    </select>
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
                    {emailError && <p style={{color: "red"}}>{emailError}</p>}
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
                    {phoneError && <p style={{color: "red"}}>{phoneError}</p>}
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
                    <button type="submit" disabled={isSubmitting}>Add Resident</button>
                </div>
                <div>
                    <button onClick={() => navigate("/residents")}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddResident;