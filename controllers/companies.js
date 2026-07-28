const { ObjectId } = require("mongodb");
const database = require("../db/connect");

const getAll = async (req, res) => {
  try {
    const companies = await database
      .getDatabase()
      .collection("companies")
      .find()
      .toArray();

    res.status(200).json(companies);
  } catch (error) {
    console.error("Error retrieving companies:", error);

    res.status(500).json({
      error: "An error occurred while retrieving companies."
    });
  }
};

const getSingle = async (req, res) => {
  try {
    const company = await database
      .getDatabase()
      .collection("companies")
      .findOne({
        _id: new ObjectId(req.params.id)
      });

    if (!company) {
      return res.status(404).json({
        error: "Company not found."
      });
    }

    res.status(200).json(company);
  } catch (error) {
    console.error("Error retrieving company:", error);

    res.status(500).json({
      error: "An error occurred while retrieving the company."
    });
  }
};

const createCompany = async (req, res) => {
  try {
    const newCompany = {
      name: req.body.name,
      industry: req.body.industry,
      website: req.body.website || "",
      location: req.body.location,
      contactEmail: req.body.contactEmail || "",
      notes: req.body.notes || ""
    };

    const result = await database
      .getDatabase()
      .collection("companies")
      .insertOne(newCompany);

    res.status(201).json({
      message: "Company created successfully.",
      id: result.insertedId
    });
  } catch (error) {
    console.error("Error creating company:", error);

    res.status(500).json({
      error: "An error occurred while creating the company."
    });
  }
};

const updateCompany = async (req, res) => {
  try {
    const updatedCompany = {
      name: req.body.name,
      industry: req.body.industry,
      website: req.body.website || "",
      location: req.body.location,
      contactEmail: req.body.contactEmail || "",
      notes: req.body.notes || ""
    };

    const result = await database
      .getDatabase()
      .collection("companies")
      .updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: updatedCompany }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: "Company not found."
      });
    }

    res.status(200).json({
      message: "Company updated successfully."
    });
  } catch (error) {
    console.error("Error updating company:", error);

    res.status(500).json({
      error: "An error occurred while updating the company."
    });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const result = await database
      .getDatabase()
      .collection("companies")
      .deleteOne({
        _id: new ObjectId(req.params.id)
      });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: "Company not found."
      });
    }

    res.status(200).json({
      message: "Company deleted successfully."
    });
  } catch (error) {
    console.error("Error deleting company:", error);

    res.status(500).json({
      error: "An error occurred while deleting the company."
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createCompany,
  updateCompany,
  deleteCompany
};