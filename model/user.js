const { Schema, model } = require('mongoose')
const { Subscription } = require('../helpers/constants')

const contactSchema = new Schema(
{
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
     validate(value) {
        const re = /\S+@\S+\.\S+/g
        return re.test(String(value).toLowerCase())
      },
  },
  subscription: {
    type: String,
    enum: [Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS],
    default: Subscription.STARTER
  },
  token: {
    type: String,
    default: null,
  },

     owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    }
},
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
)
 
const Contact = model('contacts', contactSchema)

contactSchema.virtual("info").get(function () {
  return `This is contact ${this.name}`
})
    module.exports = Contact
