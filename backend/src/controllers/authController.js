import jwt from "jsonwebtoken";
import { ServerError, ErrorInterno, JWTInexistenteError } from "../errors/ErrorApp.js";
import { autenticarUsuario } from "../services/authServices.js";

const configurarCookieToken = (res, token) => {
    const DOS_HORAS_EN_MS = 2 * 60 * 60 * 1000;

    const opcionesCookie = {
        maxAge: DOS_HORAS_EN_MS,
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
    }

    res.cookie('token', token, opcionesCookie);
};

const abrirSesion = (res, callbackRespuesta) => (usuario) => {
    const llave = process.env.JWT_SECRET;
    if (!llave) throw new JWTInexistenteError();

    const payload = { id: usuario.id, correo: usuario.correo, rol: "admin" };
    const opciones = { expiresIn: "2h" }; 
    const token = jwt.sign(payload, llave, opciones);

    configurarCookieToken(res, token);
    callbackRespuesta(res)(usuario);
};

const resLogin = (res) => res.redirect("/admin/dashboard");

const resLoginJSON = (res) => (usuario) => res.json({ status: true, mensaje: "Login correcto", usuario });

const manejarErroresVista = (res) => (error) => {
    if (error instanceof ServerError) return res.status(error.statusCode).render("login", { error: error.message });
    console.error(`Error no controlado: ${error}`);
    const errorInesperado = new ErrorInterno();
    return res.status(errorInesperado.statusCode).render("login", { error: errorInesperado.message });
};

const manejarErroresJSON = (res) => (error) => {
    if (error instanceof ServerError) return res.status(error.statusCode).json(error.aResponse());
    console.error(`Error no controlado: ${error}`);
    const errorInesperado = new ErrorInterno();
    return res.status(errorInesperado.statusCode).json(errorInesperado.aResponse());
};

export const loguear = (req, res) => {
    const { correo, contrasenia } = req.body;
    autenticarUsuario(correo, contrasenia)
        .then(abrirSesion(res, () => resLogin))
        .catch(manejarErroresVista(res));
};

export const loguearJSON = (req, res) => {
    const { correo, contrasenia } = req.body;
    autenticarUsuario(correo, contrasenia)
        .then(abrirSesion(res, resLoginJSON))
        .catch(manejarErroresJSON(res));
};

export const mostrarLogin = (req, res) => res.render("login", { error: null });