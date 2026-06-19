import bcrypt from "bcrypt";
import { Usuario } from "../models/index.js";
import { UsuarioExistenteError } from "../errors/ErrorApp.js";

export const buscarUsuario = (correo) => Usuario.findOne({ where: {correo} });

export const verificarDisponibilidad = (usuario) => {if (usuario) throw new UsuarioExistenteError();};

export const encriptarContrasenia = (contrasenia) => bcrypt.hash(contrasenia, 10);

export const guardarUsuario = (correo) => (contrasenia) => Usuario.create({ correo: correo, contrasenia: contrasenia });