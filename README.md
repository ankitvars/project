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
MONGODB_URI="mongodb+srv://ankitvars2001:VghxQwgZTxssfIlU@cluster0.m4vbh.mongodb.net/"
JWT_SECRET="bb823f2e55f36d39409591d8f32c5efaaf7a8fae1f17a9d3cafd2bc9bbbfbb63"
PORT=7001

```

---

### Getting Started

#### 1. Clone the Repository

```bash
git clone https://github.com/ankitvars/project.git
cd project
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

- The client will run at `http://localhost:5173` (default Vite port).

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
