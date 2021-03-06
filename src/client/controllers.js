const Cliente = require("./model");

module.exports.renrerizarIndex = async(req, res, next) => {
    const clientes = await Cliente.find();
    res.render("clientes/index.ejs", { clientes });
}

module.exports.renderizarNuevo = (req, res) => {
    res.render("clientes/nuevo.ejs");
}

module.exports.nuevo = async(req, res) => {
    const { ruc, nombre, direccion, numero } = req.body;
    const cliente = await new Cliente({
        _id: ruc,
        nombre,
        direccion,
        numero,
    });
    await cliente.save();
    req.flash("exito", "Cliente creado exitosamente")
    res.redirect("/clientes");
}

module.exports.borrar = async(req, res) => {
    const { id } = req.params;
    const cliente = await Cliente.findOneAndDelete({ _id: id });
    req.flash("exito", `${cliente.nombre} fue borrado exitosamente`)
    res.redirect("/clientes");
}

module.exports.renderizarEditar = async(req, res) => {
    const { id } = req.params;
    const cliente = await Cliente.findById(id);
    res.render("clientes/editar.ejs", { cliente });
}

module.exports.editar = async(req, res) => {
    const { id } = req.params;
    const { nombre, direccion, numero } = req.body;
    await Cliente.findByIdAndUpdate(id, {
        nombre,
        direccion,
        numero,
    });
    req.flash("exito", `${nombre} actualizado exitosamente`)
    res.redirect("/clientes");
}