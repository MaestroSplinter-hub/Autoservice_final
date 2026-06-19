import { ProductoInexistenteError } from "../errors/ErrorApp.js";
import { Producto } from "../models/index.js";
import { buscarProducto, verificarProducto } from "../utils/productoUtils.js";

export const listarProductosPaginados = (pagina = 1, limite = 9, soloActivos = false) => {
    const offset = (pagina - 1) * limite;
    const whereClause = soloActivos ? { activo: true } : {}; 
    return Producto.findAndCountAll({
        where: whereClause,
        limit: parseInt(limite),
        offset: parseInt(offset)
    }).then(resultado => {
        return {
            totalItems: resultado.count,
            paginasTotales: Math.ceil(resultado.count / limite),
            paginaActual: parseInt(pagina),
            productos: resultado.rows
        };
    });
};

export const leerProductoPorId = (id) => buscarProducto(id).then(verificarProducto);

export const crearProducto = (datos) => Producto.create(datos);

export const actualizarProducto = (id, datosActualizados) => {
    return Producto.update(datosActualizados, { where: { id } })
        .then(([rowsUpdated]) => {
            if (rowsUpdated === 0) throw new ProductoInexistenteError();
            return { mensaje: "Producto actualizado con éxito" };
        });
};

export const cambiarEstadoProducto = (id, nuevoEstado) => {
    return Producto.update({ activo: nuevoEstado }, { where: { id } })
        .then(([rowsUpdated]) => {
            if (rowsUpdated === 0) throw new ProductoInexistenteError();
            return { mensaje: `Producto ${nuevoEstado ? 'activado' : 'desactivado'} con éxito` };
        });
};