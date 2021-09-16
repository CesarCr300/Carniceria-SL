const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.CONECCION_BD);

const clienteEsquema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    ruc: {
        type: Number,
    },
    direccion: {
        type: String,
    },
    numero: {
        type: String,
    },
});
const productoEsquema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    categoria: {
        type: String,
        required: true,
        enum: ["res", "cerdo", "pollo", "carnero", "pavo", "otros"],
    },
    cliente: {
        type: clienteEsquema,
    },
});
const Cliente = mongoose.model("Cliente", clienteEsquema);
const Producto = mongoose.model("Producto", productoEsquema);
module.exports.Cliente = Cliente;
module.exports.Producto = Producto;