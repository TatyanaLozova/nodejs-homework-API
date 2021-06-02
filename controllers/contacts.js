const Contacts = require('../repositories/contacts')


const getAll = async (req, res, next) => {
  try {
    const contacts = await Contacts.getAll() 
   return res.json({ status: 'success', code: 200, data: { contacts } })
  } catch (e) {
    next(e)
  }
}


const getContactById = async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.id)
    if (contact){
return res.json({ status: 'success', code: 200, data: { contact } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not Found' })
  } catch (e) {
    next(e)
  }
}


const addContact = async (req, res, next) => {
 try {
    const contact = await Contacts.addContact(req.body)
    return res.status(201).json({ status: 'success', code: 201, data: { contact } })
  } catch (e) {
    next(e)
  }
}


const removeContact = async (req, res, next) => {
   try {
    const contact = await Contacts.removeContact(req.params.id)
    if (contact){
return res.json({ status: 'success', code: 200, message: "Deleted", data: { contact } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not Found' })
  } catch (e) {
    next(e)
  }
}

const updateContact = async (req, res, next) => {
   try {
    const contact = await Contacts.updateContact(req.params.id, req.body)
    if (contact){
return res.json({ status: 'success', code: 200, data: { contact } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not Found' })
  } catch (e) {
    next(e)
  }
}

module.exports = {
  getAll,
    getContactById,
    addContact,
    removeContact,
    updateContact,
        
}

