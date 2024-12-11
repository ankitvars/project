require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const apiRoutes = require("./src/routes");
const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use("/api", apiRoutes);

app.listen(PORT, (err) => {
  if (err) {
    console.error(`Port ${PORT} is in use. Please try a different port.`);
    process.exit(1);
  } else {
    console.log(`Server running on port ${PORT}`);
  }
});
