module.exports = class ExpressError extends Error {
    constructor(mensaje, estado) {
        super();
        this.message = mensaje;
        this.status = estado;
    }
}