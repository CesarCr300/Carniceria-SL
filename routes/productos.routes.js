const { Router } = require("express");
const router = new Router();

const modelos = require("../data/modelos");
const Cliente = modelos.Cliente;
const Producto = modelos.Producto;
let categorias = ["res", "cerdo", "pollo", "carnero", "pavo", "otros"];

router.get("/clientes/:id/productos", async(req, res) => {
    const { id } = req.params;
    const cliente = await Cliente.findById(id).populate("productos");
    res.render("clientes/productos/mostrar", {
        cliente,
        productos: cliente.productos,
    });
});

router.get("/clientes/:id/productos/nuevo", async(req, res) => {
    const { id } = req.params;
    res.render("clientes/productos/nuevo", { id });
});
router.post("/clientes/:id/productos", async(req, res) => {
    const { id } = req.params;
    const { nombre, precio, categoria } = req.body;
    const cliente = await Cliente.findById(id);
    const producto = await Producto.create({
        nombre,
        precio,
        categoria,
    });
    await producto.save();
    cliente.productos.push(producto);
    await cliente.save();
    res.redirect(`/clientes/${id}/productos`);
});

router.get("/clientes/:id/productos/:idProducto/editar", async(req, res) => {
    const { id, idProducto } = req.params;
    const producto = await Producto.findById(idProducto);
    res.render("clientes/productos/editar", { id, producto, categorias });
});
router.put("/clientes/:id/productos/:idProducto", async(req, res) => {
    const { id, idProducto } = req.params;
    const { nombre, precio, categoria } = req.body;
    await Producto.findByIdAndUpdate(idProducto, {
        nombre,
        precio,
        categoria,
    });
    res.redirect(`/clientes/${id}/productos`);
});

router.delete("/clientes/:id/productos/:idProducto", async(req, res) => {
    const { idProducto, id } = req.params;
    const producto = await Producto.findByIdAndDelete(idProducto, { new: true });
    console.log("producto eliminado", producto);
    const cliente = await Cliente.findById(id).populate("productos");
    console.log("cliente", cliente);
    // await cliente.productos.pop(producto);
    // await cliente.save();
    // console.log("cliente luego de eliminar", cliente);
    res.redirect(`/clientes/${id}/productos`);
});

module.exports = router;