const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session")
const flash = require("connect-flash")
const passport = require("passport");
const passportLocal = require("passport-local");

const ExpressError = require("./utils/expressError")
    // const routerUsuario = require("./routes/usuario.routes");
const User = require("./usuario");
const { Cliente, ClientRoutes } = require("./cliente")
const products = require("./productos")
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
}))
app.use(flash());

//configuraciones passport

app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.model.authenticate()));
passport.serializeUser(User.model.serializeUser());
passport.deserializeUser(User.model.deserializeUser());

app.use((req, res, next) => {
    res.locals.usuarioLogeado = req.user;
    res.locals.exito = req.flash('exito');
    res.locals.error = req.flash('error');
    next();
})


app.get("/", async(req, res, next) => {
    const cliente = await Cliente.findById("PUBLICO").populate("productos");
    return res.render("inicio.ejs", { cliente })
})

app.use(User.routes);
app.use("/clientes", ClientRoutes);
app.use("/clientes/:id/productos", products.routes);
app.get("*", (req, res, next) => {
    throw new ExpressError("Page dont found", 404)
})

app.use((err, req, res, next) => {
    const { message = "Error desconocido", status = "500" } = err;
    req.flash("error", message);
    res.redirect("/clientes")
})

module.exports = app