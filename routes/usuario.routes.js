const express = require("express");
const router = express.Router();

const passport = require("passport");

const asyncError = require("../utils/asyncError");
const { Usuario } = require("../data/modelos")


router.get("/registrar", (req, res) => {
    res.render("usuario/registrar.ejs");
})
router.post("/registrar", asyncError(async(req, res, next) => {
    const { correo, username, password, rango } = req.body;
    const usuario = new Usuario({ correo, username, rango });
    const usuarioFinal = await Usuario.register(usuario, password)
    req.flash("exito", `Bienvenido, ${username}`)
    res.redirect("/clientes")
}))

router.get("/login", (req, res) => {
    res.render("usuario/login.ejs")
})
router.post("/login", passport.authenticate("local", { failureFlash: true, failureRedirect: "/clientes" }), asyncError(async(req, res, next) => {
    req.flash("exito", "Sesión Iniciada correctamente")
    res.redirect("/clientes")
}))
module.exports = router;