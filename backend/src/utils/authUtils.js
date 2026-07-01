import bcrypt from "bcrypt";
import { Usuario } from "../models/index.js";
import { UsuarioInexistenteError, ContraseniaIncorrectaError, ServerError, ErrorInterno } from "../errors/ErrorApp.js";

const compararContraseña = (contra1, contra2) => bcrypt.compare(contra1, contra2);

const validarCoincidencia = (coinciden) => {if (!coinciden) throw new ContraseniaIncorrectaError();}

export const validarUsuario = (usuario) => {
    if (!usuario) throw new UsuarioInexistenteError();
    return usuario;
};

export const validarContra = (contrasenia) => (usuario) => {
    return compararContraseña(contrasenia, usuario.contrasenia)
        .then(validarCoincidencia)
        .then(() => usuario);
};

export const cargarCookie = (res, token) => {
    const DOS_HORAS_EN_MS = 2 * 60 * 60 * 1000;

    const cookieConfig = {
        maxAge: DOS_HORAS_EN_MS,
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
    }

    res.cookie('token', token, cookieConfig);
};

export const resDashboard = (res) => res.redirect("/admin/dashboard");

export const manejarErroresVista = (res) => (error) => {
    if (error instanceof ServerError) return res.status(error.statusCode).render("login", { error: error.message });
    console.error(`Error no controlado: ${error}`);
    const errorInesperado = new ErrorInterno();
    return res.status(errorInesperado.statusCode).render("login", { error: errorInesperado.message });
};