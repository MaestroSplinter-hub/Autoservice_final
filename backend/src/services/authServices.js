import jwt from "jsonwebtoken";
import { buscarUsuario } from "../utils/usuarioUtils.js";
import { validarUsuario, validarContra, cargarCookie, resDashboard } from "../utils/authUtils.js";
import { JWTInexistenteError } from "../errors/ErrorApp.js";

export const autenticarUsuario = (correo, contrasenia) => 
    buscarUsuario(correo)
        .then(validarUsuario)
        .then(validarContra(contrasenia));

export const abrirSesion = (res) => (usuario) => {
    const llave = process.env.JWT_SECRET;
    if (!llave) throw new JWTInexistenteError();

    const payload = { id: usuario.id, correo: usuario.correo, rol: "admin" };
    const opciones = { expiresIn: "2h" }; 
    const token = jwt.sign(payload, llave, opciones);

    cargarCookie(res, token);
    resDashboard(res);
};