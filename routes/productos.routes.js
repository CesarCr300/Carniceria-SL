const { Router } = require("express");
const router = new Router();

const modelos = require("../data/modelos");
const Cliente = modelos.Cliente;
const Producto = modelos.Producto;
let categorias = ["res", "cerdo", "pollo", "carnero", "pavo", "otros"];

router.get("/", (req, res) => {
    res.redirect("/clientes");
});
router.get("/clientes", async(req, res) => {
    const clientes = await Cliente.find();
    res.render("clientes/index.ejs", { clientes });
});

router.get("/clientes/:id/productos", async(req, res) => {
    const { id } = req.params;
    const cliente = await Cliente.findById(id);
    const productos = await Producto.find({ cliente: cliente });
    res.render("clientes/productos/mostrar", { cliente, productos });
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
        cliente,
    });
    await producto.save();
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
    const cliente = await Cliente.findById(id);
    const producto = await Producto.findByIdAndUpdate(idProducto, {
        nombre,
        precio,
        categoria,
    });
    res.redirect(`/clientes/${id}/productos`);
});
router.delete("/clientes/:id/productos/:idProducto", async(req, res) => {
    const { idProducto, id } = req.params;
    await Producto.findByIdAndDelete(idProducto);
    res.redirect(`/clientes/${id}/productos`);
});

router.get("/clientes/nuevo", async(req, res) => {
    res.render("clientes/nuevo.ejs");
});
router.post("/clientes", async(req, res) => {
    const { ruc, nombre, direccion, numero } = req.body;
    const cliente = await new Cliente({
        _id: ruc.toString(),
        ruc,
        nombre,
        direccion,
        numero,
    });
    await cliente.save();
    res.redirect("/clientes");
});
router.delete("/clientes/:id", async(req, res) => {
    const { id } = req.params;
    await Cliente.findByIdAndDelete(id);
    res.redirect("/clientes");
});
router.get("/clientes/:id/editar", async(req, res) => {
    const { id } = req.params;
    const cliente = await Cliente.findById(id);
    res.render("clientes/editar.ejs", { cliente });
});
router.put("/clientes/:id", async(req, res) => {
    const { id } = req.params;
    const { nombre, direccion, numero } = req.body;
    await Cliente.findByIdAndUpdate(id, {
        nombre,
        direccion,
        numero,
    });
    res.redirect("/clientes");
});

module.exports = router;