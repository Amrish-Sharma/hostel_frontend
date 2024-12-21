# Hostel Management Frontend

This is the frontend application for the Hostel Management System, built using React.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Amrish-Sharma/hostel-management-frontend.git
   cd hostel-management-frontend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

## Configuration

Create a `config.js` file in the `src` directory with the following content:

```javascript
const API_BASE_URL = "http://localhost:8080/api";
export default API_BASE_URL;
```

Replace `"http://localhost:8080/api"` with the actual base URL of your backend API.

## Running the Application

To start the development server, run:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Project Structure

- `src/components`: Contains the React components for the application.
    - `resident`: Components related to resident management.
    - `room`: Components related to room management.
    - `grievance`: Components related to grievance management.
- `src/config.js`: Configuration file for the API base URL.

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in the development mode.
- `npm test`: Launches the test runner in the interactive watch mode.
- `npm run build`: Builds the app for production to the `build` folder.

## Features

- Add, edit, and delete residents.
- Add, edit, and delete rooms.
- Add, edit, and delete grievances.
- View grievance details.
- Search and filter residents.
- Export resident data to CSV.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
```