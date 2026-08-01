const express = require("express");
const router = express.Router();

const contactsController = require("../controllers/contacts");

const {
  validateObjectId,
  validateContact
} = require("../middleware/validation");

router.get("/", contactsController.getAll);

router.get(
  "/:id",
  validateObjectId,
  contactsController.getSingle
);

router.post(
  "/",
  validateContact,
  contactsController.createContact
);

router.put(
  "/:id",
  validateObjectId,
  validateContact,
  contactsController.updateContact
);

router.delete(
  "/:id",
  validateObjectId,
  contactsController.deleteContact
);

module.exports = router;