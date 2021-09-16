const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
// const modelos = require("./data/modelos");
// const Cliente = modelos.Cliente;
// const Producto = modelos.Producto;
const ejsMate = require("ejs-mate");

// let categorias = ["res", "cerdo", "pollo", "carnero", "pavo", "otros"];

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// app.get("/", (req, res) => {
//     res.redirect("/clientes");
// });
// app.get("/clientes", async(req, res) => {
//     const clientes = await Cliente.find();
//     res.render("clientes/index.ejs", { clientes });
// });
app.use(require("./routes/productos.routes"));
// app.get("/clientes/:id/productos", async(req, res) => {
//     const { id } = req.params;
//     const cliente = await Cliente.findById(id);
//     const productos = await Producto.find({ cliente: cliente });
//     res.render("clientes/productos/mostrar", { cliente, productos });
// });
// app.get("/clientes/:id/productos/nuevo", async(req, res) => {
//     const { id } = req.params;
//     res.render("clientes/productos/nuevo", { id });
// });
// app.post("/clientes/:id/productos", async(req, res) => {
//     const { id } = req.params;
//     const { nombre, precio, categoria } = req.body;
//     const cliente = await Cliente.findById(id);
//     const producto = await Producto.create({
//         nombre,
//         precio,
//         categoria,
//         cliente,
//     });
//     await producto.save();
//     res.redirect(`/clientes/${id}/productos`);
// });

// app.get("/clientes/:id/productos/:idProducto/editar", async(req, res) => {
//     const { id, idProducto } = req.params;
//     const producto = await Producto.findById(idProducto);
//     res.render("clientes/productos/editar", { id, producto, categorias });
// });
// app.put("/clientes/:id/productos/:idProducto", async(req, res) => {
//     const { id, idProducto } = req.params;
//     const { nombre, precio, categoria } = req.body;
//     const cliente = await Cliente.findById(id);
//     const producto = await Producto.findByIdAndUpdate(idProducto, {
//         nombre,
//         precio,
//         categoria,
//     });
//     res.redirect(`/clientes/${id}/productos`);
// });
// app.delete("/clientes/:id/productos/:idProducto", async(req, res) => {
//     const { idProducto, id } = req.params;
//     await Producto.findByIdAndDelete(idProducto);
//     res.redirect(`/clientes/${id}/productos`);
// });

// app.get("/clientes/nuevo", async(req, res) => {
//     res.render("clientes/nuevo.ejs");
// });
// app.post("/clientes", async(req, res) => {
//     const { ruc, nombre, direccion, numero } = req.body;
//     const cliente = await new Cliente({
//         _id: ruc.toString(),
//         ruc,
//         nombre,
//         direccion,
//         numero,
//     });
//     await cliente.save();
//     res.json({ status: "ok" });
//     res.redirect("/clientes");
// });
// app.delete("/clientes/:id", async(req, res) => {
//     const { id } = req.params;
//     await Cliente.findByIdAndDelete(id);
//     res.redirect("/clientes");
// });
// app.get("/clientes/:id/editar", async(req, res) => {
//     const { id } = req.params;
//     const cliente = await Cliente.findById(id);
//     res.render("clientes/editar.ejs", { cliente });
// });
// app.put("/clientes/:id", async(req, res) => {
//     const { id } = req.params;
//     const { nombre, direccion, numero } = req.body;
//     await Cliente.findByIdAndUpdate(id, {
//         nombre,
//         direccion,
//         numero,
//     });
//     res.redirect("/clientes");
// });
app.listen(app.get("port"), () => {
    console.log("Listen");
});