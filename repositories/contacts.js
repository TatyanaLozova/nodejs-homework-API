const Contact = require('../model/contact')


const getAll = async (userId, query) => {
  
  const {
    sortBy,
    sortByDesc,
    filter,
    favorite = null,
    limit = 5,
    offset = 0,
  } = query

 
  const optionsSearch = { owner: userId }
  if (favorite !== null) {
    optionsSearch.favorite = favorite
  }
  const results = await Contact.paginate(optionsSearch, {
    limit,
    offset,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    select: filter ? {filter: [favorite]} : '',
    populate: { path: 'owner', select: 'name email subscription' },
  })
  return results
}

const getContactById = async (userId, id) => {
  const result = await Contact.findOne({ _id: id, owner: userId  }).populate({
    path: 'owner',
    select: 'name email subscription',
  })
  return result
}

const removeContact = async (userId, id) => {
   const result = await Contact.findOneAndDelete({ _id: id, owner: userId });
  return result
};

const addContact = async (userId,  body) => {
   const newContact = await Contact.create({ owner: userId, ...body })
  return newContact
}

const updateContact = async (userId, id, body) => {
  const result = await Contact.findOneAndUpdate(
    { _id: id, owner: userId },
    { ...body },
    { new: true },
  )
  return result
}

module.exports = {
  getAll,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}

