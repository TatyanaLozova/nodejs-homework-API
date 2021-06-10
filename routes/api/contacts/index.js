const express = require('express')
const router = express.Router()
const ctrl = require('../../../controllers/contacts')
const guard = require('../../../helpers/guard')

const { validationAddContact,
  validationUpdateContact,
  validationUpdateContactStatus,
  validateMongoID } = require('./validation')


  router.use((req, res, next) => {
  console.log(req.url)
  next()
  })

router
  .get('/', guard, ctrl.getAll)
  .post('/', guard, validationAddContact, ctrl.addContact)


router
.get('/:id', guard, validateMongoID, ctrl.getContactById)
.delete('/:id', guard, validateMongoID, ctrl.removeContact)
.put('/:id', guard, validateMongoID, validationUpdateContact, ctrl.updateContact)


router.patch(
  '/:id/favorite', guard, validationUpdateContactStatus, ctrl.updateContact)
  
module.exports = router
