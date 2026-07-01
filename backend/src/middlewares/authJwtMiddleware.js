import {
    enviarErrorJWT,
    volverALogin,
    verificarToken,
    validarExistenciaUsuario,
    manejarErrores,
    obtenerTokenDesdeCookie,
    buscarUsuarioDesdePayload,
    irADashboard,
} from "./middlewareUtils/authJWTutils.js";

const opcionesCookieToken = {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
};

const limpiarCookieToken = (res) => {
    res.clearCookie('token', opcionesCookieToken);
};

export const verificarJWTAdmin = (req, res, next) => {
    const llave = process.env.JWT_SECRET;
    if (!llave) return enviarErrorJWT(res);

    const token = obtenerTokenDesdeCookie(req);
    if (!token) return volverALogin(res);

    verificarToken(token, llave)
        .then(buscarUsuarioDesdePayload(req))
        .then(validarExistenciaUsuario)
        .then(next)
        .catch(manejarErrores(res));
};

export const evitarReloguear = (req, res, next) => {
    const llave = process.env.JWT_SECRET;
    if (!llave) return enviarErrorJWT(res);

    const token = obtenerTokenDesdeCookie(req);
    if (!token) return next();

    verificarToken(token, llave)
        .then(irADashboard(res))
        .catch(() => {
            limpiarCookieToken(res);
            return next();
        });
};