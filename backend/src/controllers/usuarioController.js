import { manejarErrores } from "../utils/utilidades.js";
import { registrarNuevoUsuario } from "../services/usuarioServices.js";

const responderExito = (res) => (nuevoUsuario) => res.status(201).json({id: nuevoUsuario.id, correo: nuevoUsuario.correo, mensaje: "Usuario administrador creado correctamente"});

export const createUsuario = (req, res) => {
    const { correo, contrasenia } = req.body;
    registrarNuevoUsuario(correo, contrasenia)
        .then(responderExito(res))       
        .catch(manejarErrores(res));     
};