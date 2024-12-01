import React from "react";
import {Link} from "react-router-dom";

const Welcome = () => {
    return (
        <div>
            <h1>Welcome to the Hostel Management System</h1>
            <p>
                <Link to="/residents">View Residents</Link>
            </p>
        </div>
    );
};

export default Welcome;
