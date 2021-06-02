const Contact = require('../model/contact')


const listContacts = async () => {
  const results = await Contact.find({})
  return results
}

const getContactById = async id => {
  const result = await Contact.findOne({ _id: id })
  return result
}

const removeContact = async id => {
   const result = await Contact.findOneAndDelete({ _id: id });
  return result
};

const addContact = async body => {
   const newContact = await Contact.create(body)
  return newContact
}

const updateContact = async (id, body) => {
  const result = await Contact.findOneAndUpdate(
    { _id: id },
    { ...body },
    { new: true },
  )
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
