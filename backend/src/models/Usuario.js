import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Usuario = sequelize.define("Usuario", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    correo: { type: DataTypes.STRING, allowNull: false, unique: true },
    contrasenia: { type: DataTypes.STRING, allowNull: false },
}, { tableName: "usuarios" , timestamps: false });

export default Usuario;