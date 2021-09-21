const Joi = require("joi");

module.exports.cliente = Joi.object({
    nombre: Joi.string().required(),
    _id: Joi.string().required(),
    direccion: Joi.string(),
    numero: Joi.string(),
}.required())

module.exports.producto = Joi.object({
    nombre: Joi.string().required(),
    precio: Joi.number().required().min(0),
    categoria: Joi.string().valid("res", "cerdo", "pollo", "carnero", "pavo", "otros").required()
})