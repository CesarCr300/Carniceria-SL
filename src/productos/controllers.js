const { Cliente } = require("../cliente")
const { Producto } = require("./modelo")
let categorias = ["res", "cerdo", "pollo", "carnero", "pavo", "otros"];

module.exports.renderizarIndex = async(req, res) => {
    const { id } = req.params;
    const cliente = await Cliente.findById(id).populate("productos");
    res.render("clientes/productos/mostrar", {
        cliente,
        productos: cliente.productos,
    });
}

module.exports.renderizarNuevo = async(req, res) => {
    const { id } = req.params;
    res.render("clientes/productos/nuevo", { id });
};

module.exports.nuevo = async(req, res) => {
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
};

module.exports.renderizarEditar = async(req, res) => {
    const { id, idProducto } = req.params;
    const producto = await Producto.findById(idProducto);
    res.render("clientes/productos/editar", { id, producto, categorias });
};

module.exports.editar = async(req, res) => {
    const { id, idProducto } = req.params;
    const { nombre, precio, categoria } = req.body;
    await Producto.findByIdAndUpdate(idProducto, {
        nombre,
        precio,
        categoria,
    });
    req.flash("exito", `${nombre} fue actualizado correctamente`)
    res.redirect(`/clientes/${id}/productos`);
};

module.exports.borrar = async(req, res) => {
    const { idProducto, id } = req.params;
    await Cliente.findByIdAndUpdate(id, { $pull: { productos: idProducto } });
    const producto = await Producto.findByIdAndDelete(idProducto, { new: true });
    req.flash("exito", `${producto.nombre} fue eliminado correctamente`)
    res.redirect(`/clientes/${id}/productos`);
}