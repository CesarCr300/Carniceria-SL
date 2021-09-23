const { Router } = require("express");
const router = new Router({ mergeParams: true });

const productos = require("../controladores/productos");
const { inicioSesion, esModerador } = require("../utils/middlewares");

router.use(inicioSesion)

router.get("/", productos.renderizarIndex);

router.get("/nuevo", esModerador, productos.renderizarNuevo);

router.post("/", esModerador, productos.nuevo);

router.get("/:idProducto/editar", esModerador, productos.renderizarEditar);
router.put("/:idProducto", esModerador, productos.editar);

router.delete("/:idProducto", esModerador, productos.borrar);

module.exports = router;