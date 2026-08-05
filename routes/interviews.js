const express = require("express");
const router = express.Router();

const interviewsController = require("../controllers/interviews");

const {
  validateObjectId,
  validateInterview
} = require("../middleware/validation");

router.get("/", interviewsController.getAll);

router.get(
  "/:id",
  validateObjectId,
  interviewsController.getSingle
);

router.post(
  "/",
  validateInterview,
  interviewsController.createInterview
);

router.put(
  "/:id",
  validateObjectId,
  validateInterview,
  interviewsController.updateInterview
);

router.delete(
  "/:id",
  validateObjectId,
  interviewsController.deleteInterview
);

module.exports = router;