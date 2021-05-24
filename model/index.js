const fs = require('fs/promises')
const path = require('path')
const {v4:uuid} = require('uuid')
// считываем файл
const readData = async () => {
  const data = await fs.readFile(path.join(__dirname, './contacts.json'), 'utf8')
  return JSON.parse(data)
}

const listContacts = async () => {
 return await readData()
}

const getContactById = async (id) => {
  const data = await readData()
  const [filter] = data.filter((contact) => contact.id === id)
  return filter
}

const removeContact = async (id) => {}

const addContact = async (body) => {
  const id = uuid()
  const newContact = {
    id,
    ...body,
    }
  const data = await readData()
  data.push(newContact)
  await fs.writeFile(path.join(__dirname, './contacts.json'), JSON.stringify(data))
  return newContact
}

const updateContact = async (id, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
