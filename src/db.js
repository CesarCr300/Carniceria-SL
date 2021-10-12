const mongoose = require('mongoose');
module.exports.conneccion = async() => {
    mongoose.connect(process.env.CONECCION_BD).then(d => { console.log("DB connected") })
}

module.exports.closeConnection = async() => {
    await mongoose.connection.close()
}