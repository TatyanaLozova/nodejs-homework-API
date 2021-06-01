const db = require('./db')
const { ObjectId } = require('mongodb')
const { object } = require('joi')

const getCollection = async (db, name) => {
  const client = await db
  const collection = await client.db().collection(name)
  return collection
}

const listContacts = async () => {
  const collection = await getCollection(db, 'contacts')
  const results = await collection.find({}).toArray()
  return results
}

const getContactById = async id => {
  const collection = await getCollection(db, 'contacts')
  const objId = new ObjectId(id);
  const [result] = await collection.find({ _id: objId }).toArray
  return result
}

const removeContact = async id => {
  const collection = await getCollection(db, 'contacts')
  const objId = new ObjectId(id)
  const { value: result } = await collection.findOneAndDelete({ _id: objId });
  return result
};

const addContact = async body => {
  const collection = await getCollection(db, 'contacts')
  const newContact = {
    ...body,
    ...(body.favorite ? {} : { isFavorite: false }),
  }
  const {
    ops: [result],
  } = await collection.insertOne(newContact)
  return result
}

const updateContact = async (id, body) => {
  const collection = await getCollection(db, 'contacts')
  const objId = new ObjectId(id)
  const { value: result } = await collection.findOneAndUpdate(
    { _id: objId },
    { $set: body },
    { returnOriginal: false },
  )
  return result;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}


// // считываем файл
// const readData = async () => {
//   const data = await fs.readFile(path.join(__dirname, './contacts.json'), 'utf8')
//   return JSON.parse(data)
// }

// const listContacts = async () => {
//  return await readData()
// }

// const getContactById = async (id) => {
//   const data = await readData()
//   const [filter] = data.filter((contact) => contact.id === id)
//   return filter
// }

// const removeContact = async (id) => {
//   const data = await readData()
//   const deletedContact = data.find((el) => el.id === id)
//   if (deletedContact) {
//      const contactList = data.filter((el) => el.id !== id);
//     await fs.writeFile(path.join(__dirname, 'contacts.json'), JSON.stringify(contactList))
//     return contactList;
//   }
//   return null;
//   }


// const addContact = async (body) => {
//   const id = uuid()
//   const newContact = {
//     id,
//     ...body,
//     }
//   const data = await readData()
//   data.push(newContact)
//   await fs.writeFile(path.join(__dirname, './contacts.json'), JSON.stringify(data))
//   return newContact
// }

// const updateContact = async (id, body) => {
//   const data = await readData()
//   const [filter] = data.filter((contact) => contact.id === id)
//   if (filter) {
//     Object.assign(filter, body)
//   await fs.writeFile(path.join(__dirname, './contacts.json'), JSON.stringify(data))
//   }
  
//   return filter
// }

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }
