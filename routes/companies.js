const express = require("express");
const router = express.Router();

const companiesController = require("../controllers/companies");

const {
  validateObjectId,
  validateCompany
} = require("../middleware/validation");

// GET all companies
router.get("/", companiesController.getAll);

// GET one company
router.get(
  "/:id",
  validateObjectId,
  companiesController.getSingle
);

// CREATE a company
router.post(
  "/",
  validateCompany,
  companiesController.createCompany
);

// UPDATE a company
router.put(
  "/:id",
  validateObjectId,
  validateCompany,
  companiesController.updateCompany
);

// DELETE a company
router.delete(
  "/:id",
  validateObjectId,
  companiesController.deleteCompany
);

module.exports = router;