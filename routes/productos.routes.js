const { Router } = require("express");
const router = new Router({ mergeParams: true });

const productos = require("../controladores/productos");
const { inicioSesion, esModerador } = require("../utils/middlewares");

router.use(inicioSesion)

router.route("/")
    .get(productos.renderizarIndex)
    .post(esModerador, productos.nuevo);

router.get("/nuevo", esModerador, productos.renderizarNuevo);

router.route("/:idProducto")
    .put(esModerador, productos.editar)
    .delete(esModerador, productos.borrar);

router.get("/:idProducto/editar", esModerador, productos.renderizarEditar);

module.exports = router;