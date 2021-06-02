const express = require('express')
const router = express.Router()
const ctrl = require("../../controllers/contacts")

const {validationAddContact, validationUpdateContact} = require('./validation')


router.get('/', ctrl.listContacts).post('/', validationAddContact, ctrl.addContact)


router
  .get('/:id', ctrl.getContactById)
.delete('/:id', ctrl.removeContact)
.put('/:id', validationUpdateContact, ctrl.updateContact)


module.exports = router
