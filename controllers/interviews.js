const { ObjectId } = require("mongodb");
const database = require("../db/connect");

const getAll = async (req, res) => {
  try {
    const db = database.getDatabase();

    const interviews = await db
      .collection("interviews")
      .find()
      .toArray();

    return res.status(200).json(interviews);
  } catch (error) {
    console.error("Get interviews error:", error);

    return res.status(500).json({
      error: "An error occurred while retrieving interviews."
    });
  }
};

const getSingle = async (req, res) => {
  try {
    const db = database.getDatabase();

    const interview = await db.collection("interviews").findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!interview) {
      return res.status(404).json({
        error: "Interview not found."
      });
    }

    return res.status(200).json(interview);
  } catch (error) {
    console.error("Get interview error:", error);

    return res.status(500).json({
      error: "An error occurred while retrieving the interview."
    });
  }
};

const createInterview = async (req, res) => {
  try {
    const db = database.getDatabase();

    const application = await db.collection("applications").findOne({
      _id: new ObjectId(req.body.applicationId)
    });

    if (!application) {
      return res.status(400).json({
        error: "The selected application does not exist."
      });
    }

    const newInterview = {
      applicationId: new ObjectId(req.body.applicationId),
      interviewType: req.body.interviewType,
      interviewDate: new Date(req.body.interviewDate),
      interviewerName: req.body.interviewerName,
      location: req.body.location,
      status: req.body.status,
      notes: req.body.notes || "",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db
      .collection("interviews")
      .insertOne(newInterview);

    return res.status(201).json({
      message: "Interview created successfully.",
      interviewId: result.insertedId
    });
  } catch (error) {
    console.error("Create interview error:", error);

    return res.status(500).json({
      error: "An error occurred while creating the interview."
    });
  }
};

const updateInterview = async (req, res) => {
  try {
    const db = database.getDatabase();

    const application = await db.collection("applications").findOne({
      _id: new ObjectId(req.body.applicationId)
    });

    if (!application) {
      return res.status(400).json({
        error: "The selected application does not exist."
      });
    }

    const updatedInterview = {
      applicationId: new ObjectId(req.body.applicationId),
      interviewType: req.body.interviewType,
      interviewDate: new Date(req.body.interviewDate),
      interviewerName: req.body.interviewerName,
      location: req.body.location,
      status: req.body.status,
      notes: req.body.notes || "",
      updatedAt: new Date()
    };

    const result = await db
      .collection("interviews")
      .updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: updatedInterview }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: "Interview not found."
      });
    }

    return res.status(200).json({
      message: "Interview updated successfully."
    });
  } catch (error) {
    console.error("Update interview error:", error);

    return res.status(500).json({
      error: "An error occurred while updating the interview."
    });
  }
};

const deleteInterview = async (req, res) => {
  try {
    const db = database.getDatabase();

    const result = await db.collection("interviews").deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: "Interview not found."
      });
    }

    return res.status(200).json({
      message: "Interview deleted successfully."
    });
  } catch (error) {
    console.error("Delete interview error:", error);

    return res.status(500).json({
      error: "An error occurred while deleting the interview."
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createInterview,
  updateInterview,
  deleteInterview
};