const Joi = require("joi");

module.exports.esquemaCliente = Joi.object({
    nombre: Joi.string().required(),
    ruc: Joi.string().required(),
    direccion: Joi.string().allow(""),
    numero: Joi.string().allow(""),
})

module.exports.esquemaProducto = Joi.object({
    nombre: Joi.string().required(),
    precio: Joi.number().required().min(0),
    categoria: Joi.string().valid("res", "cerdo", "pollo", "carnero", "pavo", "otros").required()
})