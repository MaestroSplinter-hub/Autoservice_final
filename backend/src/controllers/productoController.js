import { actualizarProducto, cambiarEstadoProducto, crearProducto, leerProductoPorId, listarProductosPaginados} from "../services/productoServices.js";
import { manejarErrores, responderExito } from "../utils/utilidades.js";

export const getProductosCliente = (req, res) => {
    const { pagina, limite } = req.query;
    listarProductosPaginados(pagina, limite, true)
        .then(responderExito(res))
        .catch(manejarErrores(res));
};

export const getProductosAdmin = (req, res) => {
    const { pagina, limite } = req.query;
    listarProductosPaginados(pagina, limite, false)
        .then(responderExito(res))
        .catch(manejarErrores(res));
};

export const getProducto = (req, res) => {
    const { id } = req.params;
    leerProductoPorId(id)
        .then(responderExito(res))
        .catch(manejarErrores(res));
};

export const createProducto = (req, res) => {
    const { nombre, precio, tipo } = req.body;
    // Si se subió un archivo, Multer lo deja en req.file 
    const imagen = req.file ? `/uploads/${req.file.filename}` : null;
    const datos = { nombre, precio, tipo, imagen }
    const enviarExito = (nuevoProducto) => res.status(201).json({ status: true, producto: nuevoProducto });
    crearProducto(datos)
        .then(enviarExito)
        .catch(manejarErrores(res));
};

export const updateProducto = (req, res) => {
    const { id } = req.params;
    const { nombre, precio, tipo, activo } = req.body;
    
    const datos = { nombre, precio, tipo, activo };
    if (req.file) {
        datos.imagen = `/uploads/${req.file.filename}`; 
    }
    actualizarProducto(id, datos)
        .then(responderExito(res))
        .catch(manejarErrores(res));
};

export const desactivarProducto = (req, res) => {
    const { id } = req.params;
    cambiarEstadoProducto(id, false)
        .then(responderExito(res))
        .catch(manejarErrores(res));
};

export const activarProducto = (req, res) => {
    const { id } = req.params;
    cambiarEstadoProducto(id, true)
        .then(responderExito(res))
        .catch(manejarErrores(res));
};