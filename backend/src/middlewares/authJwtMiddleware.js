import jwt from "jsonwebtoken";
import { Usuario } from "../models";

const obtenerTokenDesdeCookie = (req) => req.cookies.token || null;

export const verificarJWTAdmin = async (req, res, next) => { 
    const secret = process.env.JWT_SECRET;
    if (!secret) return res.status(500).render("login", { error: "JWT_SECRET no configurado" });

    try {
        const token = obtenerTokenDesdeCookie(req);
        if (!token) return res.redirect("/login");

        const payload = jwt.verify(token, secret); 

        const usuario = await Usuario.findByPk(payload.id);
        
        if (!usuario) return res.redirect("/login");

        req.auth = payload;
        next();
    } catch (error) {
        return res.redirect("/login");
    }
};