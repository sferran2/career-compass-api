const swaggerAutogen = require("swagger-autogen")();
 
const doc = {
  info: {
    title: "Career Compass API",
    description:
      "REST API for the Career Compass team project."
  },
  host: "career-compass-api-id3k.onrender.com",
  schemes: ["https"]
};
 
const outputFile = "./swagger.json";
 
const endpointsFiles = [
  "./server.js"
];
 
swaggerAutogen(outputFile, endpointsFiles, doc);