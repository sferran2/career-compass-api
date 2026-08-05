const { ObjectId } = require("mongodb");
const database = require("../db/connect");

const getAll = async (req, res) => {
  try {
    const db = database.getDatabase();

    const contacts = await db
      .collection("contacts")
      .find()
      .toArray();

    return res.status(200).json(contacts);
  } catch (error) {
    console.error("Get contacts error:", error);

    return res.status(500).json({
      error: "An error occurred while retrieving contacts."
    });
  }
};

const getSingle = async (req, res) => {
  try {
    const db = database.getDatabase();

    const contact = await db.collection("contacts").findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!contact) {
      return res.status(404).json({
        error: "Contact not found."
      });
    }

    return res.status(200).json(contact);
  } catch (error) {
    console.error("Get contact error:", error);

    return res.status(500).json({
      error: "An error occurred while retrieving the contact."
    });
  }
};

const createContact = async (req, res) => {
  try {
    const db = database.getDatabase();

    if (req.body.companyId) {
      const company = await db.collection("companies").findOne({
        _id: new ObjectId(req.body.companyId)
      });

      if (!company) {
        return res.status(400).json({
          error: "The selected company does not exist."
        });
      }
    }

    const existingContact = await db.collection("contacts").findOne({
      email: req.body.email
    });

    if (existingContact) {
      return res.status(409).json({
        error: "A contact with that email already exists."
      });
    }

    const newContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone || "",
      companyId: req.body.companyId
        ? new ObjectId(req.body.companyId)
        : null,
      contactType: req.body.contactType,
      linkedInUrl: req.body.linkedInUrl || "",
      notes: req.body.notes || "",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db
      .collection("contacts")
      .insertOne(newContact);

    return res.status(201).json({
      message: "Contact created successfully.",
      contactId: result.insertedId
    });
  } catch (error) {
    console.error("Create contact error:", error);

    return res.status(500).json({
      error: "An error occurred while creating the contact."
    });
  }
};

const updateContact = async (req, res) => {
  try {
    const db = database.getDatabase();
    const contactId = new ObjectId(req.params.id);

    if (req.body.companyId) {
      const company = await db.collection("companies").findOne({
        _id: new ObjectId(req.body.companyId)
      });

      if (!company) {
        return res.status(400).json({
          error: "The selected company does not exist."
        });
      }
    }

    const duplicateContact = await db.collection("contacts").findOne({
      _id: { $ne: contactId },
      email: req.body.email
    });

    if (duplicateContact) {
      return res.status(409).json({
        error: "Another contact already uses that email."
      });
    }

    const updatedContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone || "",
      companyId: req.body.companyId
        ? new ObjectId(req.body.companyId)
        : null,
      contactType: req.body.contactType,
      linkedInUrl: req.body.linkedInUrl || "",
      notes: req.body.notes || "",
      updatedAt: new Date()
    };

    const result = await db.collection("contacts").updateOne(
      { _id: contactId },
      { $set: updatedContact }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: "Contact not found."
      });
    }

    return res.status(200).json({
      message: "Contact updated successfully."
    });
  } catch (error) {
    console.error("Update contact error:", error);

    return res.status(500).json({
      error: "An error occurred while updating the contact."
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    const db = database.getDatabase();

    const result = await db.collection("contacts").deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: "Contact not found."
      });
    }

    return res.status(200).json({
      message: "Contact deleted successfully."
    });
  } catch (error) {
    console.error("Delete contact error:", error);

    return res.status(500).json({
      error: "An error occurred while deleting the contact."
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};