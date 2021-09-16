const mongoose = require("mongoose");
const modelos = require("./modelos");
const Cliente = modelos.Cliente;
const Producto = modelos.Producto;
require("dotenv").config();

mongoose.connect(process.env.CONECCION_BD);

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

agregarProducto("20600867548", {
    nombre: "bisteck de res",
    precio: 27.9,
    categoria: "res",
});
agregarProducto("20600867548", {
    nombre: "Pollo c/m",
    precio: 9.5,
    categoria: "pollo",
});