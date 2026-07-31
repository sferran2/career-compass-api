const express = require("express");
const router = express.Router();

const applicationsController = require("../controllers/applications");

const {
  validateObjectId,
  validateApplication
} = require("../middleware/validation");

// GET all applications
router.get(
  "/",
  /*
    #swagger.start
    #swagger.tags = ['Applications']
    #swagger.summary = 'Get all applications'
    #swagger.description = 'Retrieves all job applications from the database.'

    #swagger.responses[200] = {
      description: 'Applications retrieved successfully.'
    }

    #swagger.responses[500] = {
      description: 'An unexpected server error occurred.'
    }
    #swagger.end
  */
  applicationsController.getAll
);

// GET one application
router.get(
  "/:id",
  validateObjectId,
  /*
    #swagger.start
    #swagger.tags = ['Applications']
    #swagger.summary = 'Get a single application'
    #swagger.description = 'Retrieves a specific job application by its MongoDB ID.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB ID of the application',
      required: true,
      type: 'string'
    }

    #swagger.responses[200] = {
      description: 'Application retrieved successfully.'
    }

    #swagger.responses[400] = {
      description: 'Invalid MongoDB ID format.'
    }

    #swagger.responses[404] = {
      description: 'Application not found.'
    }

    #swagger.responses[500] = {
      description: 'An unexpected server error occurred.'
    }
    #swagger.end
  */
  applicationsController.getSingle
);

// CREATE an application
router.post(
  "/",
  validateApplication,
  /*
    #swagger.start
    #swagger.tags = ['Applications']
    #swagger.summary = 'Create a new application'
    #swagger.description = 'Creates a new job application in the database.'

    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Application information',
      required: true,
      schema: {
        $jobTitle: 'Software Developer',
        $companyId: '6890b3d4f8d8c123456789ab',
        $status: 'Applied',
        $dateApplied: '2026-07-28',
        jobUrl: 'https://company.com/jobs/123',
        $location: 'Orlando, FL',
        salary: 85000,
        contactName: 'Jane Smith',
        notes: 'First interview scheduled.'
      }
    }

    #swagger.responses[201] = {
      description: 'Application created successfully.'
    }

    #swagger.responses[400] = {
      description: 'Application validation failed.'
    }

    #swagger.responses[500] = {
      description: 'An unexpected server error occurred.'
    }
    #swagger.end
  */
  applicationsController.createApplication
);

// UPDATE an application
router.put(
  "/:id",
  validateObjectId,
  validateApplication,
  /*
    #swagger.start
    #swagger.tags = ['Applications']
    #swagger.summary = 'Update an application'
    #swagger.description = 'Updates an existing job application by its MongoDB ID.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB ID of the application',
      required: true,
      type: 'string'
    }

    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated application information',
      required: true,
      schema: {
        $jobTitle: 'Software Developer',
        $companyId: '6890b3d4f8d8c123456789ab',
        $status: 'Interviewing',
        $dateApplied: '2026-07-28',
        jobUrl: 'https://company.com/jobs/123',
        $location: 'Orlando, FL',
        salary: 90000,
        contactName: 'Jane Smith',
        notes: 'Second interview scheduled.'
      }
    }

    #swagger.responses[200] = {
      description: 'Application updated successfully.'
    }

    #swagger.responses[400] = {
      description: 'Application validation failed or invalid MongoDB ID.'
    }

    #swagger.responses[404] = {
      description: 'Application not found.'
    }

    #swagger.responses[500] = {
      description: 'An unexpected server error occurred.'
    }
    #swagger.end
  */
  applicationsController.updateApplication
);

// DELETE an application
router.delete(
  "/:id",
  validateObjectId,
  /*
    #swagger.start
    #swagger.tags = ['Applications']
    #swagger.summary = 'Delete an application'
    #swagger.description = 'Deletes an existing job application by its MongoDB ID.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB ID of the application',
      required: true,
      type: 'string'
    }

    #swagger.responses[200] = {
      description: 'Application deleted successfully.'
    }

    #swagger.responses[400] = {
      description: 'Invalid MongoDB ID format.'
    }

    #swagger.responses[404] = {
      description: 'Application not found.'
    }

    #swagger.responses[500] = {
      description: 'An unexpected server error occurred.'
    }
    #swagger.end
  */
  applicationsController.deleteApplication
);

module.exports = router;