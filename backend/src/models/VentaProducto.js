import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const VentaProducto = sequelize.define("VentaProducto", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cantidad: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    precio_unitario: { type: DataTypes.DECIMAL(10, 2), allowNull: false } // El histórico
}, { tableName: "venta_producto", timestamps: false});

export default VentaProducto;