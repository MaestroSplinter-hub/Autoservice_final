import { ServerError, ErrorInterno } from "../errors/ErrorApp.js";
import { autenticarUsuario } from "../services/authServices.js";

const resLogin = (res) => res.redirect("/admin/dashboard");

const resLoginJSON = (res) => (usuario) => res.json({ status: true, mensaje: 'Login correcto', usuario });

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
        .then(() => resLogin(res))
        .catch(manejarErroresVista(res));
};

export const loguearJSON = (req, res) => {
    const { correo, contrasenia } = req.body;
    autenticarUsuario(correo, contrasenia)
        .then(resLoginJSON(res))
        .catch(manejarErroresJSON(res));
};

export const mostrarLogin = (req, res) => res.render('login', { error: null });