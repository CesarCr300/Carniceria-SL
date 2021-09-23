const { Router } = require("express");
const router = new Router({ mergeParams: true });

const { inicioSesion, esModerador } = require("../utils/middlewares");
const modelos = require("../data/modelos");
const Cliente = modelos.Cliente;
const Producto = modelos.Producto;
let categorias = ["res", "cerdo", "pollo", "carnero", "pavo", "otros"];

router.use(inicioSesion)

router.get("/", async(req, res) => {
    const { id } = req.params;
    const cliente = await Cliente.findById(id).populate("productos");
    res.render("clientes/productos/mostrar", {
        cliente,
        productos: cliente.productos,
    });
});

router.get("/nuevo", esModerador, async(req, res) => {
    const { id } = req.params;
    res.render("clientes/productos/nuevo", { id });
});
router.post("/", esModerador, async(req, res) => {
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
    req.flash("exito", `${nombre} fue agregado exitosamente`)
    res.redirect(`/clientes/${id}/productos`);
});

router.get("/:idProducto/editar", esModerador, async(req, res) => {
    const { id, idProducto } = req.params;
    const producto = await Producto.findById(idProducto);
    res.render("clientes/productos/editar", { id, producto, categorias });
});
router.put("/:idProducto", esModerador, async(req, res) => {
    const { id, idProducto } = req.params;
    const { nombre, precio, categoria } = req.body;
    await Producto.findByIdAndUpdate(idProducto, {
        nombre,
        precio,
        categoria,
    });
    req.flash("exito", `${nombre} fue actualizado correctamente`)
    res.redirect(`/clientes/${id}/productos`);
});

router.delete("/:idProducto", esModerador, async(req, res) => {
    const { idProducto, id } = req.params;
    await Cliente.findByIdAndUpdate(id, { $pull: { productos: idProducto } });
    const producto = await Producto.findByIdAndDelete(idProducto, { new: true });
    req.flash("exito", `${producto.nombre} fue eliminado correctamente`)
    res.redirect(`/clientes/${id}/productos`);
});

module.exports = router;