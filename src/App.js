import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import Residents from "./components/Residents";
import AddResident from "./components/AddResident";
import EditResident from "./components/EditResident";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/residents" element={<Residents />} />
                <Route path="/add-resident" element={<AddResident />} />
                <Route path="/edit-resident/:id" element={<EditResident />} />
            </Routes>
        </Router>
    );
};

export default App;
