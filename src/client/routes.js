const { Router } = require("express");
const router = new Router();

const asyncError = require("../utils/asyncError");
const ExpressError = require("../utils/expressError");
const { inicioSesion, esModerador } = require("../utils/middlewares");
const controllers = require("./controllers");

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
    .get(asyncError(controllers.renrerizarIndex))
    .post(esModerador, validacionCliente, asyncError(controllers.nuevo));

router.get("/nuevo", esModerador, controllers.renderizarNuevo);

router.route("/:id")
    .delete(esModerador, asyncError(controllers.borrar))
    .put(esModerador, validacionCliente, asyncError(controllers.editar));

router.get("/:id/editar", esModerador, asyncError(controllers.renderizarEditar));

module.exports = router;