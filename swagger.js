const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Career Compass API",
    description:
      "REST API for the Career Compass team project."
  },
  host: process.env.NODE_ENV === "production"
    ? "career-compass-api-id3k.onrender.com"
    : "localhost:8080",
  schemes: process.env.NODE_ENV === "production" ? ["https"] : ["http"]
};

const outputFile = "./swagger.json";

const endpointsFiles = [
  "./server.js"
];

swaggerAutogen(outputFile, endpointsFiles, doc);