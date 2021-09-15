const mongoose = require("mongoose");
mongoose.connect(
    "mongodb+srv://cesar:stickman2130@carniceria-sl.b0fcy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

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
const agregarProducto = async function(ruc, datos) {
    const cliente = await Cliente.findById(ruc);
    const producto = new Producto({
        nombre: datos.nombre,
        precio: datos.precio,
        categoria: datos.categoria,
        cliente: cliente,
    });
    producto.save();
};
const Cliente = mongoose.model("Cliente", clienteEsquema);
const Producto = mongoose.model("Producto", productoEsquema);
module.exports.Cliente = Cliente;
module.exports.Producto = Producto;
module.exports.agregarProducto = agregarProducto;