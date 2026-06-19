import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Venta = sequelize.define("Venta", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre_cliente: { type: DataTypes.STRING, allowNull: false }, // El que ponemos en el Tótem
    fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    total: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0.00 }
}, { tableName: "ventas", timestamps: false });

export default Venta;