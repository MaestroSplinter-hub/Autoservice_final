import { Producto } from "../models/index.js";
import { crearProducto, actualizarProducto, cambiarEstadoProducto } from "../services/productoServices.js";

export const mostrarDashboardAdmin = async (req, res) => {
    try {
        const productosVideojuego = await Producto.findAll({ where: { tipo: 'videojuego' }, order: [['id','ASC']] });
        const productosConsola = await Producto.findAll({ where: { tipo: 'consola' }, order: [['id','ASC']] });
        return res.render('admin/dashboard', {
            productosPorTipo: {
                videojuego: productosVideojuego,
                consola: productosConsola
            }
        });
    } catch (e) {
        console.error(e);
        return res.status(500).render('login', { error: 'Error cargando dashboard' });
    }
};

export const agregarProductoAdmin = (req, res) => {
    const { nombre, precio, tipo } = req.body;
    const imagen = req.file ? `/uploads/${req.file.filename}` : null;
    const datos = { nombre, precio, tipo, imagen };

    crearProducto(datos)
        .then(() => res.redirect('/admin/dashboard'))
        .catch(() => res.status(500).redirect('/login'));
};

export const editarProductoAdmin = (req, res) => {
    const { id } = req.params;
    const { nombre, precio, tipo, activo } = req.body;

    const datos = { nombre, precio, tipo, activo };
    if (req.file) datos.imagen = `/uploads/${req.file.filename}`;

    actualizarProducto(id, datos)
        .then(() => res.redirect('/admin/dashboard'))
        .catch(() => res.status(500).redirect('/login'));
};

export const desactivarProductoAdmin = (req, res) => {
    const { id } = req.params;
    cambiarEstadoProducto(id, false)
        .then(() => res.redirect('/admin/dashboard'))
        .catch(() => res.redirect('/login'));
};

export const activarProductoAdmin = (req, res) => {
    const { id } = req.params;
    cambiarEstadoProducto(id, true)
        .then(() => res.redirect('/admin/dashboard'))
        .catch(() => res.redirect('/login'));
};

