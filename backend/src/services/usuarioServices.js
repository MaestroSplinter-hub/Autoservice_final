import { buscarUsuario, encriptarContrasenia, guardarUsuario, verificarDisponibilidad } from "../utils/usuarioUtils.js";

export const registrarNuevoUsuario = (correo, contrasenia) => {
    return buscarUsuario(correo)
        .then(verificarDisponibilidad)
        .then(() => encriptarContrasenia(contrasenia))
        .then(guardarUsuario(correo));
};