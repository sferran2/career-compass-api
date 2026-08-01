// DNS override only in development
if (process.env.NODE_ENV !== 'production') {
  const dns = require('node:dns/promises');
  dns.setServers(['1.1.1.1', '8.8.8.8']);
}

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const database = require("./db/connect");

const applicationsRoutes = require("./routes/applications");
const companiesRoutes = require("./routes/companies");
const interviewsRoutes = require("./routes/interviews");
const contactsRoutes = require("./routes/contacts");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get(
  "/",
  /*
    #swagger.start
    #swagger.tags = ['Home']
    #swagger.summary = 'API Home'
    #swagger.description = 'Returns a welcome message from the Career Compass API.'

    #swagger.responses[200] = {
      description: 'API is running successfully.'
    }
    #swagger.end
  */
  (req, res) => {
    res.status(200).json({
      message: "Welcome to the Career Compass API"
    });
  }
);

app.use("/applications", applicationsRoutes);
app.use("/companies", companiesRoutes);
app.use("/interviews", interviewsRoutes);
app.use("/contacts", contactsRoutes);

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