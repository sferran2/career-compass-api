const { ObjectId } = require("mongodb");

const allowedStatuses = [
  "Interested",
  "Applied",
  "Interviewing",
  "Offer",
  "Rejected",
  "Withdrawn"
];

const validateObjectId = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      error: "Invalid ID format."
    });
  }

  next();
};

const validateApplication = (req, res, next) => {
  const {
    jobTitle,
    companyId,
    status,
    dateApplied,
    jobUrl,
    location,
    salary,
    contactName,
    notes
  } = req.body;

  const errors = [];

  if (!jobTitle || typeof jobTitle !== "string") {
    errors.push("jobTitle is required and must be text.");
  } else if (jobTitle.trim().length < 2) {
    errors.push("jobTitle must contain at least 2 characters.");
  } else if (jobTitle.trim().length > 100) {
    errors.push("jobTitle cannot exceed 100 characters.");
  }

  if (!companyId || !ObjectId.isValid(companyId)) {
    errors.push("companyId is required and must be a valid MongoDB ID.");
  }

  if (!status || !allowedStatuses.includes(status)) {
    errors.push(
      `status must be one of: ${allowedStatuses.join(", ")}.`
    );
  }

  if (!dateApplied || Number.isNaN(Date.parse(dateApplied))) {
    errors.push("dateApplied is required and must be a valid date.");
  }

  if (!location || typeof location !== "string") {
    errors.push("location is required and must be text.");
  }

  if (
    salary !== undefined &&
    (typeof salary !== "number" || salary < 0)
  ) {
    errors.push("salary must be a positive number.");
  }

  if (jobUrl !== undefined && jobUrl !== "") {
    try {
      new URL(jobUrl);
    } catch {
      errors.push("jobUrl must be a valid URL.");
    }
  }

  if (
    contactName !== undefined &&
    typeof contactName !== "string"
  ) {
    errors.push("contactName must be text.");
  }

  if (notes !== undefined && typeof notes !== "string") {
    errors.push("notes must be text.");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: "Application validation failed.",
      details: errors
    });
  }

  req.body.jobTitle = jobTitle.trim();
  req.body.location = location.trim();

  next();
};

const validateCompany = (req, res, next) => {
  const {
    name,
    industry,
    website,
    location,
    contactEmail,
    notes
  } = req.body;

  const errors = [];

  if (!name || typeof name !== "string") {
    errors.push("name is required and must be text.");
  } else if (name.trim().length < 2) {
    errors.push("name must contain at least 2 characters.");
  } else if (name.trim().length > 100) {
    errors.push("name cannot exceed 100 characters.");
  }

  if (!industry || typeof industry !== "string") {
    errors.push("industry is required and must be text.");
  }

  if (!location || typeof location !== "string") {
    errors.push("location is required and must be text.");
  }

  if (website !== undefined && website !== "") {
    try {
      new URL(website);
    } catch {
      errors.push("website must be a valid URL.");
    }
  }

  if (contactEmail !== undefined && contactEmail !== "") {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(contactEmail)) {
      errors.push("contactEmail must be a valid email address.");
    }
  }

  if (notes !== undefined && typeof notes !== "string") {
    errors.push("notes must be text.");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: "Company validation failed.",
      details: errors
    });
  }

  req.body.name = name.trim();
  req.body.industry = industry.trim();
  req.body.location = location.trim();

  next();
};

module.exports = {
  validateObjectId,
  validateApplication,
  validateCompany
};