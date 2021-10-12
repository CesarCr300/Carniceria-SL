const { Router } = require("express");
const router = new Router();

const modelos = require("../data/modelos");
const asyncError = require("../utils/asyncError");
const ExpressError = require("../utils/expressError");
const Cliente = modelos.Cliente;
const { inicioSesion, esModerador } = require("../utils/middlewares");
const clientes = require("../controladores/clientes");

const { esquemaCliente } = require("../esquemasJoi/validaciones")
const validacionCliente = (req, res, next) => {
    if (!req.body.ruc) {
        req.body.ruc = req.params.id;
    }
    const { error } = esquemaCliente.validate(req.body);
    if (error) throw new ExpressError(error.details[0].message, 500)
    next()
}

router.use(inicioSesion)

router.route("/")
    .get(asyncError(clientes.renrerizarIndex))
    .post(esModerador, validacionCliente, asyncError(clientes.nuevo));

router.get("/nuevo", esModerador, clientes.renderizarNuevo);

router.route("/:id")
    .delete(esModerador, asyncError(clientes.borrar))
    .put(esModerador, validacionCliente, asyncError(clientes.editar));

router.get("/:id/editar", esModerador, asyncError(clientes.renderizarEditar));

module.exports = router;