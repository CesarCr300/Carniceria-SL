const { Usuario } = require("../usuario");

module.exports.renderizarRegistrar = (req, res) => {
    res.render("usuario/registrar.ejs");
};

module.exports.registrar = async(req, res, next) => {
    const { correo, username, password, rango } = req.body;
    const usuario = new Usuario({ correo, username, rango });
    const usuarioFinal = await Usuario.register(usuario, password)
    req.flash("exito", `${username} creado correctamente.`)
    res.redirect("/")
}

module.exports.renderizarLogin = (req, res) => {
    res.render("usuario/login.ejs")
}
module.exports.login = async(req, res, next) => {
    req.flash("exito", "Sesión Iniciada correctamente")
    res.redirect("/")
}

module.exports.logout = (req, res) => {
    req.logOut();
    req.flash("exito", "Sesión cerrada correctamente");
    res.redirect("/")
}