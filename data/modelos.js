const mongoose = require("mongoose");
const paspportLocalMongoose = require("passport-local-mongoose");

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
clienteEsquema.post("findOneAndDelete", async(farm) => {
    if (farm.productos.length > 0) {
        await Producto.deleteMany({ _id: { $in: farm.productos } });
    }
});
const Cliente = mongoose.model("Cliente", clienteEsquema);

const usuarioEsquema = new mongoose.Schema({
    "correo": { type: String, required: false },
    "rango": { type: String, required: true, enum: ["administrador", "moderador", "visitante"] }
})
usuarioEsquema.plugin(paspportLocalMongoose)

module.exports.Usuario = mongoose.model("Usuario", usuarioEsquema)
module.exports.Cliente = Cliente;
module.exports.Producto = Producto;