const { ObjectId } = require("mongodb");

const allowedApplicationStatuses = [
  "Interested",
  "Applied",
  "Interviewing",
  "Offer",
  "Rejected",
  "Withdrawn"
];

const allowedInterviewTypes = [
  "Phone",
  "Video",
  "In Person",
  "Technical",
  "Panel",
  "Final"
];

const allowedInterviewStatuses = [
  "Scheduled",
  "Completed",
  "Cancelled",
  "Rescheduled"
];

const allowedContactTypes = [
  "Recruiter",
  "Hiring Manager",
  "Interviewer",
  "Employee",
  "Networking Contact",
  "Other"
];

const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

const isValidUrl = (value) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

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

  if (!status || !allowedApplicationStatuses.includes(status)) {
    errors.push(
      `status must be one of: ${allowedApplicationStatuses.join(", ")}.`
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
    salary !== null &&
    (typeof salary !== "number" || salary < 0)
  ) {
    errors.push("salary must be a positive number.");
  }

  if (jobUrl && !isValidUrl(jobUrl)) {
    errors.push("jobUrl must be a valid URL.");
  }

  if (contactName !== undefined && typeof contactName !== "string") {
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

  if (website && !isValidUrl(website)) {
    errors.push("website must be a valid URL.");
  }

  if (contactEmail && !isValidEmail(contactEmail)) {
    errors.push("contactEmail must be a valid email address.");
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

const validateInterview = (req, res, next) => {
  const {
    applicationId,
    interviewType,
    interviewDate,
    interviewerName,
    location,
    status,
    notes
  } = req.body;

  const errors = [];

  if (!applicationId || !ObjectId.isValid(applicationId)) {
    errors.push(
      "applicationId is required and must be a valid MongoDB ID."
    );
  }

  if (!interviewType || !allowedInterviewTypes.includes(interviewType)) {
    errors.push(
      `interviewType must be one of: ${allowedInterviewTypes.join(", ")}.`
    );
  }

  if (!interviewDate || Number.isNaN(Date.parse(interviewDate))) {
    errors.push("interviewDate is required and must be a valid date.");
  }

  if (!interviewerName || typeof interviewerName !== "string") {
    errors.push("interviewerName is required and must be text.");
  } else if (interviewerName.trim().length < 2) {
    errors.push("interviewerName must contain at least 2 characters.");
  }

  if (!location || typeof location !== "string") {
    errors.push("location is required and must be text.");
  }

  if (!status || !allowedInterviewStatuses.includes(status)) {
    errors.push(
      `status must be one of: ${allowedInterviewStatuses.join(", ")}.`
    );
  }

  if (notes !== undefined && typeof notes !== "string") {
    errors.push("notes must be text.");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: "Interview validation failed.",
      details: errors
    });
  }

  req.body.interviewerName = interviewerName.trim();
  req.body.location = location.trim();

  next();
};

const validateContact = (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    companyId,
    contactType,
    linkedInUrl,
    notes
  } = req.body;

  const errors = [];

  if (!firstName || typeof firstName !== "string") {
    errors.push("firstName is required and must be text.");
  } else if (firstName.trim().length < 2) {
    errors.push("firstName must contain at least 2 characters.");
  }

  if (!lastName || typeof lastName !== "string") {
    errors.push("lastName is required and must be text.");
  } else if (lastName.trim().length < 2) {
    errors.push("lastName must contain at least 2 characters.");
  }

  if (!email || !isValidEmail(email)) {
    errors.push("email is required and must be a valid email address.");
  }

  if (phone !== undefined && typeof phone !== "string") {
    errors.push("phone must be text.");
  }

  if (companyId && !ObjectId.isValid(companyId)) {
    errors.push("companyId must be a valid MongoDB ID.");
  }

  if (!contactType || !allowedContactTypes.includes(contactType)) {
    errors.push(
      `contactType must be one of: ${allowedContactTypes.join(", ")}.`
    );
  }

  if (linkedInUrl && !isValidUrl(linkedInUrl)) {
    errors.push("linkedInUrl must be a valid URL.");
  }

  if (notes !== undefined && typeof notes !== "string") {
    errors.push("notes must be text.");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: "Contact validation failed.",
      details: errors
    });
  }

  req.body.firstName = firstName.trim();
  req.body.lastName = lastName.trim();
  req.body.email = email.trim().toLowerCase();

  next();
};

module.exports = {
  validateObjectId,
  validateApplication,
  validateCompany,
  validateInterview,
  validateContact
};