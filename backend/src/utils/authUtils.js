import bcrypt from "bcrypt";
import { Usuario } from "../models/index.js";
import { UsuarioInexistenteError, ContraseniaIncorrectaError } from "../errors/ErrorApp.js";

const compararContraseña = (contra1, contra2) => bcrypt.compare(contra1, contra2);

export const validarUsuario = (usuario) => {
    if (!usuario) throw new UsuarioInexistenteError();
    return usuario;
};

export const validarContra = (contrasenia) => (usuario) => {
    const validarCoincidencia = (coinciden) => {if (!coinciden) throw new ContraseniaIncorrectaError();}
    return compararContraseña(contrasenia, usuario.contrasenia)
        .then(validarCoincidencia)
        .then(() => usuario);
};