import { actualizarProducto, cambiarEstadoProducto, crearProducto, leerProductoPorId, listarProductosPaginados} from "../services/productoServices.js";
import { manejarErrores, responderExito } from "../utils/utilidades.js";

// GET /api/productos (Para el cliente, solo activos) [cite: 114, 129]
export const getProductosCliente = (req, res) => {
    const { pagina, limite } = req.query;
    listarProductosPaginados(pagina, limite, true)
        .then(responderExito(res))
        .catch(manejarErrores(res));
};

// GET /api/productos/admin (Para el dashboard, ve todos) [cite: 162]
export const getProductosAdmin = (req, res) => {
    const { pagina, limite } = req.query;
    listarProductosPaginados(pagina, limite, false)
        .then(responderExito(res))
        .catch(manejarErrores(res));
};

// GET /api/productos/:id (Detalle de producto) [cite: 194]
export const getProducto = (req, res) => {
    const { id } = req.params;
    leerProductoPorId(id)
        .then(responderExito(res))
        .catch(manejarErrores(res));
};

// POST /api/productos (Alta) [cite: 169]
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

// PUT /api/productos/:id (Modificación) [cite: 70]
export const updateProducto = (req, res) => {
    const { id } = req.params;
    const { nombre, precio, tipo, activo } = req.body;
    
    const datos = { nombre, precio, tipo, activo };
    if (req.file) {
        datos.imagen = `/uploads/${req.file.filename}`; // Nueva imagen si se sube [cite: 117]
    }
    actualizarProducto(id, datos)
        .then(responderExito(res))
        .catch(manejarErrores(res));
};

// PATCH /api/productos/:id/desactivar (Baja lógica) [cite: 167]
export const desactivarProducto = (req, res) => {
    const { id } = req.params;
    cambiarEstadoProducto(id, false)
        .then(responderExito(res))
        .catch(manejarErrores(res));
};

// PATCH /api/productos/:id/activar (Reactivación) [cite: 168]
export const activarProducto = (req, res) => {
    const { id } = req.params;
    cambiarEstadoProducto(id, true)
        .then(responderExito(res))
        .catch(manejarErrores(res));
};