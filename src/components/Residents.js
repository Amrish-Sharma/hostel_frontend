import React, { useEffect, useState } from "react";
import API_BASE_URL from "../config";
import { Link } from "react-router-dom";


const Residents = () => {
    const [residents, setResidents] = useState([]);
    const [filteredResidents, setFilteredResidents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    useEffect(() => {
        fetch(`${API_BASE_URL}/residents`)
            .then((response) => response.json())
            .then((data) => {
                const updatedData = data.map((resident) => ({
                    ...resident,
                    roomNumber: resident.room ? resident.room.roomId : "N/A"
                }));
                setResidents(updatedData);
                setFilteredResidents(data);
            })
            .catch((error) => console.error("Error fetching residents:", error));
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        filterResidents(term, statusFilter);
    };
    const handleStatusFilter = (e) => {
        const status = e.target.value;
        setStatusFilter(status);

        filterResidents(searchTerm, status);
    };

    const filterResidents = (searchTerm, statusFilter) => {
        const filtered = residents.filter((resident) => {
            const matchesSearch =
                resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                resident.roomNumber.toString().includes(searchTerm);
            const matchesStatus =
                statusFilter ? resident.status === statusFilter : true;
            return matchesSearch && matchesStatus;
        });

        setFilteredResidents(filtered);
    };

    const handleDelete = (id) => {
        // Confirm deletion
        if (window.confirm("Are you sure you want to delete this resident?")) {
            fetch(`${API_BASE_URL}/residents/${id}`, {
                method: "DELETE",
            })
                .then(() => {
                    // Remove the resident from the list without reloading the page
                    setResidents(residents.filter((resident) => resident.id !== id));
                })
                .catch((error) => {
                    console.error("Error deleting resident:", error);
                });
        }
    };

    const handleExport = () => {
        fetch(`${API_BASE_URL}/residents/csv/export`)
            .then((response) => response.text())
            .then((csvData) => {
                const blob = new Blob([csvData], { type: "text/csv" });
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "residents.csv";
                link.click();
            })
            .catch((error) => console.error("Error exporting CSV:", error));
    };

    return (
        <div>
            <h1>Residents</h1>
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search by name or room number"
                value={searchTerm}
                onChange={handleSearch}
            />

            {/* Status Filter Dropdown */}
            <select value={statusFilter} onChange={handleStatusFilter}>
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
            </select>
            <Link to="/add-resident">
                <button>Add New Resident</button>
            </Link>

            {/* Export Button */}
            <button onClick={handleExport}>Download CSV</button>
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
                {filteredResidents.map((resident) => (
                    <tr key={resident.id}>
                        <td>{resident.id}</td>
                        <td>{resident.name}</td>
                        <td>{resident.roomNumber}</td>
                        <td>{resident.email}</td>
                        <td>{resident.phone}</td>
                        <td>{resident.status}</td>
                        <td>
                            <Link to={`/resident-details/${resident.id}`}>
                                <button>View Details</button>
                            </Link>
                            <Link to={`/edit-resident/${resident.id}`}>
                                <button>Edit</button>
                            </Link>
                            <button onClick={() => handleDelete(resident.id)}>Delete</button>

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Residents;
