const express = require('express')
const router = express.Router()
const Contacts = require('../../model')
const {validationAddContact, validationUpdateContact} = require('./validation')

// listContacts
router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    res.json({ status: 'success', code: 200, data: { contacts } })
  } catch (e) {
    next(e)
  }
})

// getContactById
router.get('/:id', async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.id)
    if (contact){
return res.json({ status: 'success', code: 200, data: { contact } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not Found' })
  } catch (e) {
    next(e)
  }
})

// addContact
router.post('/', validationAddContact, async (req, res, next) => {
 try {
    const contact = await Contacts.addContact(req.body)
    res.status(201).json({ status: 'success', code: 201, data: { contact } })
  } catch (e) {
    next(e)
  }
})

// removeContact
router.delete('/:id', async (req, res, next) => {
   try {
    const contact = await Contacts.removeContact(req.params.id)
    if (contact){
return res.json({ status: 'success', code: 200, data: { contact } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not Found' })
  } catch (e) {
    next(e)
  }
})

router.put('/:id', validationUpdateContact, async (req, res, next) => {
   try {
    const contact = await Contacts.updateContact(req.params.id, req.body)
    if (contact){
return res.json({ status: 'success', code: 200, data: { contact } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not Found' })
  } catch (e) {
    next(e)
  }
})

module.exports = router
