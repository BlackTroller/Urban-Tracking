# Urban Tracking API

This project is a REST API designed for tracking public transport vehicles in real time. The API provides real-time location updates for both drivers and users, enabling them to track the status of public transport in a city. This project was built as part of an academic assignment to explore real-time communication, geolocation services, and dashboard development.

## Key Features

- **Real-time Tracking**: The API provides real-time updates of transport vehicle locations.
- **WebSocket Server**: Enables continuous communication between the backend and the clients (drivers and users) to provide live location updates.
- **Frontend Dashboard**: Built with React Admin, TypeScript, and connected to the API for managing and visualizing real-time data.
- **Multi-Platform Integration**: The API is designed to be used by both web and mobile applications.
- **Database**: PostgreSQL is used as the database for storing transport and tracking data.

## Technologies Used

- **Backend**:
  - **C# and ASP.NET Core**: Used for backend development to handle the API and real-time data.
  - **WebSocket**: Enables real-time communication between the server and clients (drivers and users).

- **Frontend**:
  - **React Admin**: Used for building the web dashboard, allowing admins to manage and view real-time updates.
  - **TypeScript**: Ensures strong typing and a better development experience for the frontend.

- **Database**:
  - **PostgreSQL**: Used to store transport data, including vehicle locations and tracking history.

- **API Testing**:
  - **Postman**: Used for testing the API endpoints and ensuring smooth integration with the system.