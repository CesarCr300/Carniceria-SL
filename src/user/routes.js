const express = require("express");
const router = express.Router();

const passport = require("passport");

const asyncError = require("../utils/asyncError");
const { inicioSesion, esModerador } = require("../utils/middlewares");
const controllers = require("./controllers")

router.route("/registrar")
    .get(inicioSesion, controllers.renderizarRegistrar)
    .post(inicioSesion, esModerador, asyncError(controllers.registrar))

router.route("/login")
    .get(controllers.renderizarLogin)
    .post(passport.authenticate("local", { failureFlash: true, failureRedirect: "/" }), asyncError(controllers.login))

router.get("/logout", inicioSesion, controllers.logout);

module.exports = router;