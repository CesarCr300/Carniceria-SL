const mongoose = require("mongoose");

const clienteEsquema = new mongoose.Schema({
    _id: { type: String, required: true },
    nombre: { type: String, required: true },
    direccion: { type: String },
    numero: { type: String },
    productos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Producto" }],
});
clienteEsquema.post("findOneAndDelete", async(cliente) => {
    if (cliente.productos.length > 0) {
        await Producto.deleteMany({ _id: { $in: cliente.productos } });
    }
});

module.exports = mongoose.model("Cliente", clienteEsquema);