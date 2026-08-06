const { ObjectId } = require("mongodb");
const database = require("../db/connect");

const getAll = async (req, res) => {
  try {
    const applications = await database
      .getDatabase()
      .collection("applications")
      .find()
      .toArray();

    res.status(200).json(applications);
  } catch (error) {
    console.error("Error retrieving applications:", error);

    res.status(500).json({
      error: "An error occurred while retrieving applications."
    });
  }
};

const getSingle = async (req, res) => {
  try {
    const application = await database
      .getDatabase()
      .collection("applications")
      .findOne({
        _id: new ObjectId(req.params.id)
      });

    if (!application) {
      return res.status(404).json({
        error: "Application not found."
      });
    }

    res.status(200).json(application);
  } catch (error) {
    console.error("Error retrieving application:", error);

    res.status(500).json({
      error: "An error occurred while retrieving the application."
    });
  }
};

const createApplication = async (req, res) => {
  try {
    const db = database.getDatabase();

    const company = await db.collection("companies").findOne({
      _id: new ObjectId(req.body.companyId)
    });

    if (!company) {
      return res.status(400).json({
        error: "The selected company does not exist."
      });
    }

    const newApplication = {
      jobTitle: req.body.jobTitle,
      companyId: new ObjectId(req.body.companyId),
      status: req.body.status,
      dateApplied: new Date(req.body.dateApplied),
      jobUrl: req.body.jobUrl || "",
      location: req.body.location,
      salary: req.body.salary,
      contactName: req.body.contactName || "",
      notes: req.body.notes || ""
    };

    const result = await db
      .collection("applications")
      .insertOne(newApplication);

    res.status(201).json({
      message: "Application created successfully.",
      id: result.insertedId
    });
  } catch (error) {
    console.error("Error creating application:", error);

    res.status(500).json({
      error: "An error occurred while creating the application."
    });
  }
};

const updateApplication = async (req, res) => {
  try {
    const db = database.getDatabase();

    const company = await db.collection("companies").findOne({
      _id: new ObjectId(req.body.companyId)
    });

    if (!company) {
      return res.status(400).json({
        error: "The selected company does not exist."
      });
    }

    const updatedApplication = {
      jobTitle: req.body.jobTitle,
      companyId: new ObjectId(req.body.companyId),
      status: req.body.status,
      dateApplied: new Date(req.body.dateApplied),
      jobUrl: req.body.jobUrl || "",
      location: req.body.location,
      salary: req.body.salary,
      contactName: req.body.contactName || "",
      notes: req.body.notes || ""
    };

    const result = await db
      .collection("applications")
      .updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: updatedApplication }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: "Application not found."
      });
    }

    res.status(200).json({
      message: "Application updated successfully."
    });
  } catch (error) {
    console.error("Error updating application:", error);

    res.status(500).json({
      error: "An error occurred while updating the application."
    });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const result = await database
      .getDatabase()
      .collection("applications")
      .deleteOne({
        _id: new ObjectId(req.params.id)
      });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: "Application not found."
      });
    }

    res.status(200).json({
      message: "Application deleted successfully."
    });
  } catch (error) {
    console.error("Error deleting application:", error);

    res.status(500).json({
      error: "An error occurred while deleting the application."
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createApplication,
  updateApplication,
  deleteApplication
};