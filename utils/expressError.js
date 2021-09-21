module.exports = class ExpressError extends error {
    constructor(mensaje, estado) {
        super();
        this.mensaje = mensaje;
        this.estado = estado;
    }
}