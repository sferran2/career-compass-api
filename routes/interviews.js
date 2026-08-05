const express = require("express");
const router = express.Router();

const interviewsController = require("../controllers/interviews");

const {
  validateObjectId,
  validateInterview
} = require("../middleware/validation");

router.get(
  "/",
  /*
    #swagger.start
    #swagger.tags = ['Interviews']
    #swagger.summary = 'Get all interviews'
    #swagger.description = 'Retrieves all interviews from the database.'

    #swagger.responses[200] = {
      description: 'Interviews retrieved successfully.'
    }

    #swagger.responses[500] = {
      description: 'An unexpected server error occurred.'
    }
    #swagger.end
  */
  interviewsController.getAll
);

router.get(
  "/:id",
  validateObjectId,
  /*
    #swagger.start
    #swagger.tags = ['Interviews']
    #swagger.summary = 'Get a single interview'
    #swagger.description = 'Retrieves a specific interview by its MongoDB ID.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB ID of the interview',
      required: true,
      type: 'string'
    }

    #swagger.responses[200] = {
      description: 'Interview retrieved successfully.'
    }

    #swagger.responses[400] = {
      description: 'Invalid MongoDB ID format.'
    }

    #swagger.responses[404] = {
      description: 'Interview not found.'
    }

    #swagger.responses[500] = {
      description: 'An unexpected server error occurred.'
    }
    #swagger.end
  */
  interviewsController.getSingle
);

router.post(
  "/",
  validateInterview,
  /*
    #swagger.start
    #swagger.tags = ['Interviews']
    #swagger.summary = 'Create a new interview'
    #swagger.description = 'Creates a new interview in the database.'

    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Interview information',
      required: true,
      schema: {
        type: 'object',
        required: [
          'applicationId',
          'interviewType',
          'interviewDate',
          'interviewerName',
          'location',
          'status'
        ],
        properties: {
          applicationId: {
            type: 'string',
            example: '6a735c759eaa44e729a4b083'
          },
          interviewType: {
            type: 'string',
            enum: [
              'Phone',
              'Video',
              'In Person',
              'Technical',
              'Panel',
              'Final'
            ],
            example: 'Technical'
          },
          interviewDate: {
            type: 'string',
            format: 'date',
            example: '2026-08-10'
          },
          interviewerName: {
            type: 'string',
            example: 'Sarah Johnson'
          },
          location: {
            type: 'string',
            example: 'Zoom'
          },
          status: {
            type: 'string',
            enum: [
              'Scheduled',
              'Completed',
              'Cancelled',
              'Rescheduled'
            ],
            example: 'Scheduled'
          },
          notes: {
            type: 'string',
            example: 'Technical interview with the engineering team.'
          }
        }
      }
    }

    #swagger.responses[201] = {
      description: 'Interview created successfully.'
    }

    #swagger.responses[400] = {
      description: 'Interview validation failed or application does not exist.'
    }

    #swagger.responses[500] = {
      description: 'An unexpected server error occurred.'
    }
    #swagger.end
  */
  interviewsController.createInterview
);

router.put(
  "/:id",
  validateObjectId,
  validateInterview,
  /*
    #swagger.start
    #swagger.tags = ['Interviews']
    #swagger.summary = 'Update an interview'
    #swagger.description = 'Updates an existing interview by its MongoDB ID.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB ID of the interview',
      required: true,
      type: 'string'
    }

    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated interview information',
      required: true,
      schema: {
        type: 'object',
        required: [
          'applicationId',
          'interviewType',
          'interviewDate',
          'interviewerName',
          'location',
          'status'
        ],
        properties: {
          applicationId: {
            type: 'string',
            example: '6a735c759eaa44e729a4b083'
          },
          interviewType: {
            type: 'string',
            enum: [
              'Phone',
              'Video',
              'In Person',
              'Technical',
              'Panel',
              'Final'
            ],
            example: 'Final'
          },
          interviewDate: {
            type: 'string',
            format: 'date',
            example: '2026-08-12'
          },
          interviewerName: {
            type: 'string',
            example: 'Sarah Johnson'
          },
          location: {
            type: 'string',
            example: 'Google Meet'
          },
          status: {
            type: 'string',
            enum: [
              'Scheduled',
              'Completed',
              'Cancelled',
              'Rescheduled'
            ],
            example: 'Rescheduled'
          },
          notes: {
            type: 'string',
            example: 'Interview rescheduled due to a conflict.'
          }
        }
      }
    }

    #swagger.responses[200] = {
      description: 'Interview updated successfully.'
    }

    #swagger.responses[400] = {
      description: 'Interview validation failed, invalid MongoDB ID, or application does not exist.'
    }

    #swagger.responses[404] = {
      description: 'Interview not found.'
    }

    #swagger.responses[500] = {
      description: 'An unexpected server error occurred.'
    }
    #swagger.end
  */
  interviewsController.updateInterview
);

router.delete(
  "/:id",
  validateObjectId,
  /*
    #swagger.start
    #swagger.tags = ['Interviews']
    #swagger.summary = 'Delete an interview'
    #swagger.description = 'Deletes an existing interview by its MongoDB ID.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB ID of the interview',
      required: true,
      type: 'string'
    }

    #swagger.responses[200] = {
      description: 'Interview deleted successfully.'
    }

    #swagger.responses[400] = {
      description: 'Invalid MongoDB ID format.'
    }

    #swagger.responses[404] = {
      description: 'Interview not found.'
    }

    #swagger.responses[500] = {
      description: 'An unexpected server error occurred.'
    }
    #swagger.end
  */
  interviewsController.deleteInterview
);

module.exports = router;