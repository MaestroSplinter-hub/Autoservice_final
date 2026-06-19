import { ServerError } from "../errors/ErrorApp.js";

export const manejarErrores = (res) => (error) => {
    if (error instanceof ServerError) return res.status(error.statusCode).json(error.aResponse());
    console.error(`Error no controlado: ${error}`);
    return res.status(500).json( {mensaje: "error desconocido"} );
};

export const responderExito = (res, statusCode = 200) => (data) => res.status(statusCode).json(data);