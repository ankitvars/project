require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const apiRoutes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use("/api", apiRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
