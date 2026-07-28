const express = require("express");
const router = express.Router();

const applicationsController = require("../controllers/applications");

const {
  validateObjectId,
  validateApplication
} = require("../middleware/validation");

// GET all applications
router.get("/", applicationsController.getAll);

// GET one application
router.get(
  "/:id",
  validateObjectId,
  applicationsController.getSingle
);

// CREATE an application
router.post(
  "/",
  validateApplication,
  applicationsController.createApplication
);

// UPDATE an application
router.put(
  "/:id",
  validateObjectId,
  validateApplication,
  applicationsController.updateApplication
);

// DELETE an application
router.delete(
  "/:id",
  validateObjectId,
  applicationsController.deleteApplication
);

module.exports = router;