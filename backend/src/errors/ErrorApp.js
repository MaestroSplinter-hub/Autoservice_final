export class ServerError extends Error {
    constructor(statusCode, code, mensaje) {
        super(mensaje);
        this.statusCode = statusCode;
        this.code = code;
        this.name = "ServerError";
    }

    aResponse() {
        return {
            status: false,
            code: this.code,
            mensaje: this.message
        }
    }
}

export class UsuarioExistenteError extends ServerError {
    constructor() {
        super(409, "EMAIL_YA_EXISTE", "El correo ya está registrado");
        this.name = "UsuarioExistenteError";
    }
}

export class UsuarioInexistenteError extends ServerError {
    constructor() {
        super(404, "EMAIL_NO_EXISTE", "El correo no está registrado");
        this.name = "UsuarioInexistenteError";
    }
}

export class ProductoInexistenteError extends ServerError {
    constructor() {
        super(404, "PRODUCTO_NO_EXISTE", "El producto no existe");
        this.name = "ProductoInexistenteError";
    }
}

export class ContraseniaIncorrectaError extends ServerError {
    constructor() {
        super(401, "CONTRASENIA_INCORRECTA", "La contraseña es incorrecta");
        this.name = "ContraseniaIncorrectaError";
    }
}

export class ErrorInterno extends ServerError {
    constructor() {
        super(500, "ERROR_INTERNO_DEL_SERVER", "Ocurrió un error inesperado");
        this.name = "ErrorInterno";
    }
}

export class ventaInexistenteError extends ServerError {
    constructor() {
        super(404, "VENTA_NO_EXISTE", "La venta no existe");
        this.name = "VentaInexistenteError";
    }
}

export class JWTInexistenteError extends ServerError {
    constructor() {
        super(500, "JWT_SECRET_FALTANTE", "La clave secreta de autenticación no está configurada en el servidor");
        this.name = "JWTInexistenteError";
    }
}