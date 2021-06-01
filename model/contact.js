const { Schema, model } = require('Mongoose')


const contactSchema = new Schema({
name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
}, {
    versionKey: false,
    timestamps: true,
  
  }
)
 
const Contact = model('contacts', contactSchema) // из за этого тоже не работало б
// так как в бд название contacts а было написано contact оно бы не видело б ее

    module.exports = Contact
