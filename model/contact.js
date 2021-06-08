const { Schema, model } = require('mongoose')


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
