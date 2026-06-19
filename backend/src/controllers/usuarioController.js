import { manejarErrores } from "../utils/utilidades.js";
import { registrarNuevoUsuario } from "../services/usuarioServices.js";

const responderExito = (nuevoUsuario) => res.status(201).json({id: nuevoUsuario.id, correo: nuevoUsuario.correo, mensaje: "Usuario administrador creado correctamente"});

export const createUsuario = (req, res) => {
    const { correo, contrasenia } = req.body;
    registrarNuevoUsuario(correo, contrasenia)
        .then(responderExito)       
        .catch(manejarErrores(res));     
};