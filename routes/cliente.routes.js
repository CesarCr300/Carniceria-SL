const { Router } = require("express");
const router = new Router();
const modelos = require("../data/modelos");
const asyncError = require("../utils/asyncError");
const ExpressError = require("../utils/expressError");
const Cliente = modelos.Cliente;

const { esquemaCliente } = require("../esquemasJoi/validaciones")
const validacionCliente = (req, res, next) => {
    if (!req.body.ruc) {
        req.body.ruc = req.params.id;
    }
    const { error } = esquemaCliente.validate(req.body);
    if (error) throw new ExpressError(error.details[0].message, 500)
    next()
}

router.get("/", asyncError(async(req, res, next) => {
    const clientes = await Cliente.find();
    res.render("clientes/index.ejs", { clientes });
}));

router.get("/nuevo", (req, res) => {
    res.render("clientes/nuevo.ejs");
});
router.post("/", validacionCliente, asyncError(async(req, res) => {
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
}));

router.delete("/:id", asyncError(async(req, res) => {
    const { id } = req.params;
    const cliente = await Cliente.findOneAndDelete({ _id: id });
    req.flash("exito", `${cliente.nombre} fue borrado exitosamente`)
    res.redirect("/clientes");
}));

router.get("/:id/editar", asyncError(async(req, res) => {
    const { id } = req.params;
    const cliente = await Cliente.findById(id);
    res.render("clientes/editar.ejs", { cliente });
}));
router.put("/:id", validacionCliente, asyncError(async(req, res) => {
    const { id } = req.params;
    const { nombre, direccion, numero } = req.body;
    await Cliente.findByIdAndUpdate(id, {
        nombre,
        direccion,
        numero,
    });
    req.flash("exito", `${nombre} actualizado exitosamente`)
    res.redirect("/clientes");
}));

module.exports = router;