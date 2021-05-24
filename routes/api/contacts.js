const express = require('express')
const router = express.Router()
const Contacts = require('../../model')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    res.json({ status: 'success', code: 200, data: { contacts } })
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
 try {
    const contact = await Contacts.addContact(req.body)
    res.status(201).json({ status: 'success', code: 201, data: { contact } })
  } catch (e) {
    next(e)
  }
})

router.delete('/:id', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:id', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
