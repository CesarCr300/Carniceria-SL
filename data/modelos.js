const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.CONECCION_BD);

const productoEsquema = mongoose.Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    categoria: {
        type: String,
        required: true,
        enum: ["res", "cerdo", "pollo", "carnero", "pavo", "otros"],
    },
});
const Producto = mongoose.model("Producto", productoEsquema);

const clienteEsquema = new mongoose.Schema({
    _id: { type: String, required: true },
    nombre: { type: String, required: true },
    direccion: { type: String },
    numero: { type: String },
    productos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Producto" }],
});
const Cliente = mongoose.model("Cliente", clienteEsquema);
module.exports.Cliente = Cliente;
module.exports.Producto = Producto;