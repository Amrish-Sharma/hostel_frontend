import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import Residents from "./components/resident/Residents";
import AddResident from "./components/resident/AddResident";
import EditResident from "./components/resident/EditResident";
import ResidentDetails from "./components/resident/ResidentDetails";
import Rooms from "./components/room/Rooms";
import AddRooms from "./components/room/AddRooms";
import EditRooms from "./components/room/EditRooms";
import RoomDetails from "./components/room/RoomDetails";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/residents" element={<Residents />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/add-resident" element={<AddResident />} />
                <Route path="/edit-resident/:id" element={<EditResident />} />
                <Route path="/resident-details/:id" element={<ResidentDetails />} />
                <Route path="/add-rooms" element={<AddRooms />} />
                <Route path="/edit-rooms/:id" element={<EditRooms />} />
                <Route path="/room-details/:id" element={<RoomDetails />} />
            </Routes>
        </Router>
    );
};

export default App;
