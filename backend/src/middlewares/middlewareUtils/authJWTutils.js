import jwt from "jsonwebtoken";
import { Usuario } from "../../models/index.js";
import { JWTInexistenteError, UsuarioInexistenteError, ServerError } from "../../errors/ErrorApp.js";

export const obtenerTokenDesdeCookie = (req) => req.cookies.token || null;

const resolverJWT = (resolve, reject) => (error, payload) => error ? reject(error) : resolve(payload);

const ejecutarVerificación = (token, llave) => (resolve, reject) => jwt.verify(token, llave, resolverJWT(resolve, reject));

export const verificarTokenPromesa = (token, llave) => new Promise(ejecutarVerificación(token, llave));

const enviarError = (res, error) => res.status(error.statusCode).render("login", error.aResponse());

export const enviarErrorJWT = (res) => {
    const error = new JWTInexistenteError();
    enviarError(res, error);
} 

export const volverALogin = (res) => res.redirect("/login");

export const irADashboard = () => res.redirect("/admin/dashboard");

export const buscarUsuarioDesdePayload = (req) => (payload) => {
    req.auth = payload;
    return Usuario.findByPk(payload.id);
};

export const validarExistenciaUsuario = (usuario) => {if (!usuario) throw new UsuarioInexistenteError();};

export const manejarErrores = (res) => (error) => error instanceof ServerError ? enviarError(res, error) : volverALogin(res);