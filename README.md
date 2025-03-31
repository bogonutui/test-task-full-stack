# Project Description

Terms of reference for candidates for the position of Full-Stack Developer
(React + Node.js)

The csv files for testing are in the project folder

## Endpoints

### File Upload:

- **Route:** `POST files/upload`
- **Format:** `multipart/form-data`
- **Field:** `file` (CSV file)

### Fetch Paginated Data:

- **Route:** `GET files/file-data`
- **Parameters:**
  - `pageIndex`: Page index (starting from 0).
  - `pageSize`: Number of records per page.

### Auth login:

- **Login:** `GET auth/login`
- **Parameters:**
  - `username`: admin
  - `password`: admin

## Architecture

### Client:

client/
├── src/
│ ├── api/ # API request logic
│ ├── components/ # Reusable components (e.g., Dropzone, Table)
│ ├── pages/ # pplication pages (Login, Dashboard)
│ ├── App.tsx # Main application component
│ ├── main.tsx # entry point for the frontend

### Server:

server/
├── controllers/ # Request handling logic
├── middlewares/ # Middleware functions (e.g., authentication)
├── models/ # MongoDB models
├── routes/ # Route definitions
├── utils/ # Utility functions (e.g., database connection)
├── server.js # Server entry point
