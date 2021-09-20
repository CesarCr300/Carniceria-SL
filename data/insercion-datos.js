const mongoose = require("mongoose");
const modelos = require("./modelos");
const Cliente = modelos.Cliente;
const Producto = modelos.Producto;
require("dotenv").config();

mongoose.connect(process.env.CONECCION_BD);

const Petros = async function() {
    try {
        const cliente = await new Cliente({
            nombre: "Petros",
            _id: "20210799",
        });
        await cliente.save();
        console.log(cliente);
    } catch (e) {
        console.log(e);
    }
};

const agregarProductos = async() => {
    try {
        const producto = await new Producto({
            nombre: "bisteck",
            categoria: "res",
            precio: 27.9,
        });
        const cliente = await Cliente.findById("20210799");
        await cliente.productos.push(producto);
        await producto.save();
        await cliente.save();
    } catch (e) {
        console.log(e);
    }
};
// agregarProductos();

const mostrarProductos = async() => {
    try {
        const cliente = await Cliente.find().populate("productos");
        console.log(cliente);
    } catch (e) {
        console.log(e);
    }
};

const actualizarProducto = async() => {
    try {
        const producto = await Producto.findByIdAndUpdate(
            "6147de05813a66edd83aca01", { precio: 39.9 }
        );
    } catch (e) {}
};
// actualizarProducto();
mostrarProductos();