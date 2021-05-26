
const Joi = require('joi');

const schemaAddContact = Joi.object({
     name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone: Joi.string().min(9).max(19).required(),
    
})
const schemaUpdateContact = Joi.object({
     name: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
  phone: Joi.number().min(9).max(19).optional(),
}).or('name', 'email', 'phone')

const validate = async (schema, obj, next) => {
    try {
        await schema.validateAsync(obj)
        next()
    } catch (err) {
        next({
            status: 400,
             message: err.message.replace(/"/g, ''),
        })
    }
}
module.exports = {
    validationAddContact: (req, res, next) => {
    return validate(schemaAddContact, req.body, next)
    },
    validationUpdateContact: (req, res, next) => {
    return validate(schemaUpdateContact, req.body, next)
    },
   
}

