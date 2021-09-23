const express = require("express");
const router = express.Router();

const passport = require("passport");

const asyncError = require("../utils/asyncError");
const { Usuario } = require("../data/modelos")
const { inicioSesion, esModerador } = require("../utils/middlewares");


router.get("/registrar", inicioSesion, (req, res) => {
    res.render("usuario/registrar.ejs");
})
router.post("/registrar", inicioSesion, esModerador, asyncError(async(req, res, next) => {
    const { correo, username, password, rango } = req.body;
    const usuario = new Usuario({ correo, username, rango });
    const usuarioFinal = await Usuario.register(usuario, password)
    req.flash("exito", `${username} creado correctamente.`)
    res.redirect("/")
}))

router.get("/login", (req, res) => {
    res.render("usuario/login.ejs")
})
router.post("/login", passport.authenticate("local", { failureFlash: true, failureRedirect: "/" }), asyncError(async(req, res, next) => {
    req.flash("exito", "Sesión Iniciada correctamente")
    res.redirect("/")
}))

router.get("/logout", inicioSesion, (req, res) => {
    req.logOut();
    req.flash("exito", "Sesión cerrada correctamente");
    res.redirect("/")
})
module.exports = router;