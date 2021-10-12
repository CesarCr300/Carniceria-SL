const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const app = require("./app")
const { conneccion } = require("./db")

async function main() {
    await conneccion()
    app.listen(app.get("port"), () => {
        console.log("Listen");
    });
}
main()