const { Router } = require("express");
const router = new Router();

const modelos = require("../data/modelos");
const Cliente = modelos.Cliente;
const Producto = modelos.Producto;


router.get("/", async(req, res) => {
    const clientes = await Cliente.find();
    res.render("clientes/index.ejs", { clientes });
});

router.get("/nuevo", async(req, res) => {
    res.render("clientes/nuevo.ejs");
});
router.post("/", async(req, res) => {
    const { ruc, nombre, direccion, numero } = req.body;
    const cliente = await new Cliente({
        _id: ruc,
        nombre,
        direccion,
        numero,
    });
    await cliente.save();
    res.redirect("/clientes");
});

router.delete("/:id", async(req, res) => {
    const { id } = req.params;
    let cliente = await Cliente.findOneAndDelete({ _id: id });
    res.redirect("/clientes");
});

router.get("/:id/editar", async(req, res) => {
    const { id } = req.params;
    const cliente = await Cliente.findById(id);
    res.render("clientes/editar.ejs", { cliente });
});
router.put("/:id", async(req, res) => {
    const { id } = req.params;
    const { nombre, direccion, numero } = req.body;
    await Cliente.findByIdAndUpdate(id, {
        nombre,
        direccion,
        numero,
    });
    res.redirect("/clientes");
});

module.exports = router;