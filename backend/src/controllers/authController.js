import { ServerError, ErrorInterno } from "../errors/ErrorApp.js";
import { autenticarUsuario } from "../services/authServices.js";

const responderExito = (res) => res.redirect("/admin/dashboard");

const manejarErrores = (res) => (error) => {
    if (error instanceof ServerError) return res.status(error.statusCode).render("login", { error: error.message });
    console.error(`Error no controlado: ${error}`);
    const errorInesperado = new ErrorInterno();
    return res.status(errorInesperado.statusCode).render("login", { error: errorInesperado.message });
};

export const loguear = (req, res) => {
    const { correo, contrasenia } = req.body;
    autenticarUsuario(correo, contrasenia)
        .then(() => responderExito(res))
        .catch(manejarErrores(res));
};

export const mostrarLogin = (req, res) => res.render('login', { error: null });