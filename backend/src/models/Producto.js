import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Producto = sequelize.define("Producto", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    imagen: { type: DataTypes.STRING, allowNull: true }, // La ruta 
    tipo: { type: DataTypes.STRING, allowNull: false },   
    activo: { type: DataTypes.BOOLEAN, defaultValue: true } // Para la baja
}, { tableName: "productos", timestamps: false });

export default Producto;