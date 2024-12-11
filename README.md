## Project Setup

This project contains a **client** (React app) and a **server** (Node.js/Express app). Follow the steps below to set up and run both parts of the application.

---

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **npm**: Comes with Node.js, but ensure it's updated by running:
  ```bash
  npm install -g npm
  ```
- **MongoDB**: Install MongoDB and ensure it is running locally or have access to a hosted MongoDB URI.

---

### Environment Variables

Create a `.env` file in the `server` folder with the following variables:

```
# Server Configuration
PORT=5000
MONGO_URI=mongodb://localhost:27017/your-database-name
JWT_SECRET=your-jwt-secret
```

---

### Getting Started

#### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

### Server Setup

#### Navigate to the Server Directory

```bash
cd server
```

#### Install Dependencies

```bash
npm install
```

#### Start the Server

```bash
npm run dev
```

- The server will run at `http://localhost:5000`.

---

### Client Setup

#### Navigate to the Client Directory

```bash
cd client
```

#### Install Dependencies

```bash
npm install
```

#### Start the React App

```bash
npm run dev
```

- The client will run at `http://localhost:3000` (default Vite port).

---

### Directory Structure

```
project-root/
├── client/            # React app
│   ├── src/           # Frontend source code
│   ├── public/        # Static assets
│   ├── package.json   # Client dependencies
├── server/            # Express server
│   ├── models/        # Mongoose models
│   ├── controllers/   # Controller logic
│   ├── routes/        # Express routes
│   ├── middleware/    # Authentication and other middleware
│   ├── package.json   # Server dependencies
├── .gitignore         # Git ignored files
├── README.md          # Project documentation
```

---

### Available Scripts

#### Server Scripts

From the `server` directory:

- **Start the server**:
  ```bash
  npm start
  ```
- **Development mode (with hot-reloading)**:
  ```bash
  npm run dev
  ```

#### Client Scripts

From the `client` directory:

- **Start the React app**:
  ```bash
  npm run dev
  ```
- **Build for production**:
  ```bash
  npm run build
  ```
- **Preview production build**:
  ```bash
  npm run preview
  ```

---

### API Endpoints

#### Profile

1. **GET `/api/profile`**

   - Fetch the logged-in user's profile.
   - Requires a valid JWT token in the `Authorization` header.

2. **PUT `/api/profile`**
   - Update the logged-in user's profile.
   - Requires a valid JWT token in the `Authorization` header.

---

### Notes

- Make sure MongoDB is running when starting the server.
- Use the same `.env` file for sensitive configurations like database credentials and JWT secrets.

---

### License

This project is licensed under the MIT License.

---
