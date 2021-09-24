const express = require("express");
const router = express.Router();

const passport = require("passport");

const asyncError = require("../utils/asyncError");
const { Usuario } = require("../data/modelos")
const { inicioSesion, esModerador } = require("../utils/middlewares");
const usuarios = require("../controladores/usuarios");

router.route("/registrar")
    .get(inicioSesion, usuarios.renderizarRegistrar)
    .post(inicioSesion, esModerador, asyncError(usuarios.registrar))

router.route("/login")
    .get(usuarios.renderizarLogin)
    .post(passport.authenticate("local", { failureFlash: true, failureRedirect: "/" }), asyncError(usuarios.login))

router.get("/logout", inicioSesion, usuarios.logout);

module.exports = router;