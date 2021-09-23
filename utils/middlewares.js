module.exports.inicioSesion = async(req, res, next) => {
    if (req.isAuthenticated()) return next()
    req.flash("error", "Solo personal de la empresa puede ir ahí");
    res.redirect("/")
}

// module.exports.esModerador = async(req,res,next)