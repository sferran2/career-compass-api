require("dotenv").config();

const express = require("express");
const cors = require("cors");

const database = require("./db/connect");

const applicationsRoutes = require("./routes/applications");
const companiesRoutes = require("./routes/companies");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Career Compass API"
  });
});

app.use("/applications", applicationsRoutes);
app.use("/companies", companiesRoutes);

// Handles routes that do not exist
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found."
  });
});

// Final Express error handler
app.use((error, req, res, next) => {
  console.error("Unhandled server error:", error);

  res.status(500).json({
    error: "An unexpected server error occurred."
  });
});

database
  .initializeDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Server did not start:", error);
    process.exit(1);
  });