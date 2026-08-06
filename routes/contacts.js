const express = require("express");
const router = express.Router();

const contactsController = require("../controllers/contacts");

const {
  validateObjectId,
  validateContact
} = require("../middleware/validation");

const { ensureAuthenticated } = require("../middleware/auth");

router.get(
  "/",
  /*
    #swagger.start
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Get all contacts'
    #swagger.description = 'Retrieves all contacts from the database.'

    #swagger.responses[200] = {
      description: 'Contacts retrieved successfully.'
    }

    #swagger.responses[500] = {
      description: 'An unexpected server error occurred.'
    }
    #swagger.end
  */
  contactsController.getAll
);

router.get(
  "/:id",
  validateObjectId,
  /*
    #swagger.start
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Get a single contact'
    #swagger.description = 'Retrieves a specific contact by its MongoDB ID.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB ID of the contact',
      required: true,
      type: 'string'
    }

    #swagger.responses[200] = {
      description: 'Contact retrieved successfully.'
    }

    #swagger.responses[400] = {
      description: 'Invalid MongoDB ID format.'
    }

    #swagger.responses[404] = {
      description: 'Contact not found.'
    }

    #swagger.responses[500] = {
      description: 'An unexpected server error occurred.'
    }
    #swagger.end
  */
  contactsController.getSingle
);

router.post(
  "/",
  ensureAuthenticated,
  validateContact,
  /*
    #swagger.start
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Create a new contact'
    #swagger.description = 'Creates a new professional contact in the database. Requires authentication.'

    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Contact information',
      required: true,
      schema: {
        $firstName: 'Laura',
        $lastName: 'Martinez',
        $email: 'laura.martinez@example.com',
        phone: '407-555-1234',
        companyId: '6a6abbbdc4a66a122543b9ed',
        $contactType: 'Recruiter',
        linkedInUrl: 'https://www.linkedin.com/in/laura-martinez',
        notes: 'Recruiter contact for future opportunities.'
      }
    }

    #swagger.responses[201] = {
      description: 'Contact created successfully.'
    }

    #swagger.responses[400] = {
      description: 'Contact validation failed or company does not exist.'
    }

    #swagger.responses[401] = {
      description: 'You must be logged in to perform this action.'
    }

    #swagger.responses[409] = {
      description: 'A contact with that email already exists.'
    }

    #swagger.responses[500] = {
      description: 'An unexpected server error occurred.'
    }
    #swagger.end
  */
  contactsController.createContact
);

router.put(
  "/:id",
  ensureAuthenticated,
  validateObjectId,
  validateContact,
  /*
    #swagger.start
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Update a contact'
    #swagger.description = 'Updates an existing contact by its MongoDB ID. Requires authentication.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB ID of the contact',
      required: true,
      type: 'string'
    }

    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated contact information',
      required: true,
      schema: {
        $firstName: 'Laura',
        $lastName: 'Martinez',
        $email: 'laura.martinez@example.com',
        phone: '407-555-9999',
        companyId: '6a6abbbdc4a66a122543b9ed',
        $contactType: 'Hiring Manager',
        linkedInUrl: 'https://www.linkedin.com/in/laura-martinez',
        notes: 'Updated contact information.'
      }
    }

    #swagger.responses[200] = {
      description: 'Contact updated successfully.'
    }

    #swagger.responses[400] = {
      description: 'Contact validation failed, invalid MongoDB ID, or company does not exist.'
    }

    #swagger.responses[401] = {
      description: 'You must be logged in to perform this action.'
    }

    #swagger.responses[404] = {
      description: 'Contact not found.'
    }

    #swagger.responses[409] = {
      description: 'Another contact already uses that email.'
    }

    #swagger.responses[500] = {
      description: 'An unexpected server error occurred.'
    }
    #swagger.end
  */
  contactsController.updateContact
);

router.delete(
  "/:id",
  validateObjectId,
  /*
    #swagger.start
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Delete a contact'
    #swagger.description = 'Deletes an existing contact by its MongoDB ID.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB ID of the contact',
      required: true,
      type: 'string'
    }

    #swagger.responses[200] = {
      description: 'Contact deleted successfully.'
    }

    #swagger.responses[400] = {
      description: 'Invalid MongoDB ID format.'
    }

    #swagger.responses[404] = {
      description: 'Contact not found.'
    }

    #swagger.responses[500] = {
      description: 'An unexpected server error occurred.'
    }
    #swagger.end
  */
  contactsController.deleteContact
);

module.exports = router;