const express = require("express");
const router = express.Router();

const companiesController = require("../controllers/companies");

const {
  validateObjectId,
  validateCompany
} = require("../middleware/validation");

// GET all companies
router.get(
  "/",
  /*
    #swagger.start
    #swagger.tags = ['Companies']
    #swagger.summary = 'Get all companies'
    #swagger.description = 'Retrieves all companies from the database.'

    #swagger.responses[200] = {
      description: 'Companies retrieved successfully.'
    }

    #swagger.responses[500] = {
      description: 'An unexpected server error occurred.'
    }
    #swagger.end
  */
  companiesController.getAll
);

// GET one company
router.get(
  "/:id",
  validateObjectId,
  /*
    #swagger.start
    #swagger.tags = ['Companies']
    #swagger.summary = 'Get a single company'
    #swagger.description = 'Retrieves a specific company by its MongoDB ID.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB ID of the company',
      required: true,
      type: 'string'
    }

    #swagger.responses[200] = {
      description: 'Company retrieved successfully.'
    }

    #swagger.responses[400] = {
      description: 'Invalid MongoDB ID format.'
    }

    #swagger.responses[404] = {
      description: 'Company not found.'
    }

    #swagger.responses[500] = {
      description: 'An unexpected server error occurred.'
    }
    #swagger.end
  */
  companiesController.getSingle
);

// CREATE a company
router.post(
  "/",
  validateCompany,
  /*
    #swagger.start
    #swagger.tags = ['Companies']
    #swagger.summary = 'Create a new company'
    #swagger.description = 'Creates a new company in the database.'

    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Company information',
      required: true,
      schema: {
        type: 'object',
        required: [
          'name',
          'industry',
          'location'
        ],
        properties: {
          name: {
            type: 'string',
            example: 'Tech Solutions Inc.'
          },
          industry: {
            type: 'string',
            example: 'Software Development'
          },
          location: {
            type: 'string',
            example: 'Orlando, FL'
          },
          website: {
            type: 'string',
            example: 'https://www.techsolutions.com'
          },
          contactName: {
            type: 'string',
            example: 'John Smith'
          },
          contactEmail: {
            type: 'string',
            example: 'john.smith@techsolutions.com'
          },
          contactPhone: {
            type: 'string',
            example: '407-555-1234'
          },
          notes: {
            type: 'string',
            example: 'The company offers remote work opportunities.'
          }
        }
      }
    }

    #swagger.responses[201] = {
      description: 'Company created successfully.'
    }

    #swagger.responses[400] = {
      description: 'Company validation failed.'
    }

    #swagger.responses[500] = {
      description: 'An unexpected server error occurred.'
    }
    #swagger.end
  */
  companiesController.createCompany
);

// UPDATE a company
router.put(
  "/:id",
  validateObjectId,
  validateCompany,
  /*
    #swagger.start
    #swagger.tags = ['Companies']
    #swagger.summary = 'Update a company'
    #swagger.description = 'Updates an existing company by its MongoDB ID.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB ID of the company',
      required: true,
      type: 'string'
    }

    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated company information',
      required: true,
      schema: {
        type: 'object',
        required: [
          'name',
          'industry',
          'location'
        ],
        properties: {
          name: {
            type: 'string',
            example: 'Tech Solutions Inc.'
          },
          industry: {
            type: 'string',
            example: 'Software Development'
          },
          location: {
            type: 'string',
            example: 'Orlando, FL'
          },
          website: {
            type: 'string',
            example: 'https://www.techsolutions.com'
          },
          contactName: {
            type: 'string',
            example: 'Jane Smith'
          },
          contactEmail: {
            type: 'string',
            example: 'jane.smith@techsolutions.com'
          },
          contactPhone: {
            type: 'string',
            example: '407-555-5678'
          },
          notes: {
            type: 'string',
            example: 'Follow up regarding future job openings.'
          }
        }
      }
    }

    #swagger.responses[200] = {
      description: 'Company updated successfully.'
    }

    #swagger.responses[400] = {
      description: 'Company validation failed or invalid MongoDB ID.'
    }

    #swagger.responses[404] = {
      description: 'Company not found.'
    }

    #swagger.responses[500] = {
      description: 'An unexpected server error occurred.'
    }
    #swagger.end
  */
  companiesController.updateCompany
);

// DELETE a company
router.delete(
  "/:id",
  validateObjectId,
  /*
    #swagger.start
    #swagger.tags = ['Companies']
    #swagger.summary = 'Delete a company'
    #swagger.description = 'Deletes an existing company by its MongoDB ID.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB ID of the company',
      required: true,
      type: 'string'
    }

    #swagger.responses[200] = {
      description: 'Company deleted successfully.'
    }

    #swagger.responses[400] = {
      description: 'Invalid MongoDB ID format.'
    }

    #swagger.responses[404] = {
      description: 'Company not found.'
    }

    #swagger.responses[500] = {
      description: 'An unexpected server error occurred.'
    }
    #swagger.end
  */
  companiesController.deleteCompany
);

module.exports = router;