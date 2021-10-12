const mongoose = require("mongoose");
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
module.exports = Producto;