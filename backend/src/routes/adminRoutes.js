import { Router } from "express";
import { mostrarDashboardAdmin, agregarProductoAdmin, editarProductoAdmin, desactivarProductoAdmin, activarProductoAdmin } from "../controllers/adminController.js";
import { subidorArchivos } from "../utils/multerUtils.js";

export const router = Router();

router.get('/admin/dashboard', mostrarDashboardAdmin);

router.post('/admin/productos', subidorArchivos.single('imagen'), agregarProductoAdmin);
router.post('/admin/productos/:id', subidorArchivos.single('imagen'), editarProductoAdmin);

router.post('/admin/productos/:id/desactivar', desactivarProductoAdmin);
router.post('/admin/productos/:id/activar', activarProductoAdmin);

export default router;