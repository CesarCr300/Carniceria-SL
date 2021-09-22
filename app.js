const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const ExpressError = require("./utils/expressError")
const routerCliente = require("./routes/cliente.routes");
const routerProductos = require("./routes/productos.routes");
const asyncError = require("./utils/asyncError");

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
    res.redirect("/clientes");
});
app.use("/clientes", routerCliente);
app.use("/clientes/:id/productos",
    routerProductos);

app.get("*", (req, res, next) => {
    throw new ExpressError("Page dont found", 404)
})

app.use((err, req, res, next) => {
    const { message = "Error desconocido", status = "500" } = err;
    res.status(status).send(err.message)
})

app.listen(app.get("port"), () => {
    console.log("Listen");
});