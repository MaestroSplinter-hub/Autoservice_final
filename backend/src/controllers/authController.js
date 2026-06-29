import { autenticarUsuario, abrirSesion } from "../services/authServices.js";

export const loguear = (req, res) => {
    const { correo, contrasenia } = req.body;
    autenticarUsuario(correo, contrasenia)
        .then(abrirSesion(res))
        .catch(manejarErroresVista(res));
};

export const mostrarLogin = (req, res) => res.render("login", { error: null });