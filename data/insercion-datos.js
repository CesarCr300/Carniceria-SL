const mongoose = require("mongoose");
const modelos = require("./modelos");
const Cliente = modelos.Cliente;
const Producto = modelos.Producto;
require("dotenv").config();

mongoose.connect(process.env.CONECCION_BD);

const mostrarProductos = async() => {
    try {
        const cliente = await Cliente.findById("20600867548").populate("productos");
        console.log(cliente);
    } catch (e) {
        console.log(e);
    }
};

mostrarProductos();