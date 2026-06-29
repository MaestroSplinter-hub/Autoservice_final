import { buscarUsuario } from "../utils/usuarioUtils.js";
import { validarUsuario, validarContra } from "../utils/authUtils.js";

export const autenticarUsuario = (correo, contrasenia) => 
    buscarUsuario(correo)
        .then(validarUsuario)
        .then(validarContra(contrasenia));