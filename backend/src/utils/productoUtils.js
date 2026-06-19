import { ProductoInexistenteError } from "../errors/ErrorApp.js";
import { Producto } from "../models/index.js";

export const buscarProducto = (id) => Producto.findByPk(id);

export const verificarProducto = (producto) => {
    if (!producto) throw new ProductoInexistenteError();
    return producto;
};