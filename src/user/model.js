const mongoose = require("mongoose");
const paspportLocalMongoose = require("passport-local-mongoose");

const usuarioEsquema = new mongoose.Schema({
    "correo": { type: String, required: false },
    "rango": { type: String, required: true, enum: ["administrador", "moderador", "visitante"] }
})
usuarioEsquema.plugin(paspportLocalMongoose)

module.exports = mongoose.model("Usuario", usuarioEsquema)