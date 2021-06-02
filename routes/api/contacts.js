const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/contacts')

const { validationAddContact,
  validationUpdateContact,
  validationUpdateContactStatus,
  validateMongoID } = require('./validation')


  router.use((req, res, next) => {
  console.log(req.url)
  next()
  })

router
  .get('/', ctrl.getAll)
  .post('/', validationAddContact, ctrl.addContact)


router
.get('/:id', validateMongoID, ctrl.getContactById)
.delete('/:id', validateMongoID, ctrl.removeContact)
.put('/:id', validateMongoID, validationUpdateContact, ctrl.updateContact)


router.patch(
  '/:id/favorite', validationUpdateContactStatus, ctrl.updateContact)
  
module.exports = router
