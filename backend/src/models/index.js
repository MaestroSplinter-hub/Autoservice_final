import Usuario from "./Usuario.js";
import Producto from "./Producto.js";
import Venta from "./Venta.js";
import VentaProducto from "./VentaProducto.js";

// Relación Muchos a Muchos: Una Venta tiene muchos Productos
Venta.belongsToMany(Producto, { 
    through: VentaProducto, 
    foreignKey: "venta_id", 
    otherKey: "producto_id",
    as: "productos" 
});

// Un Producto puede estar en muchas Ventas
Producto.belongsToMany(Venta, { 
    through: VentaProducto, 
    foreignKey: "producto_id", 
    otherKey: "venta_id",
    as: "ventas" 
});

// Exportamos todo junto
export { Usuario, Producto, Venta, VentaProducto };