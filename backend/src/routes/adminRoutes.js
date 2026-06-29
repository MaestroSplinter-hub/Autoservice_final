import { Router } from "express";
import { mostrarDashboardAdmin, agregarProductoAdmin, editarProductoAdmin, desactivarProductoAdmin, activarProductoAdmin } from "../controllers/adminController.js";
import { subidorArchivos } from "../utils/multerUtils.js";
import { verificarJWTAdmin } from "../middlewares/authJwtMiddleware.js";

export const router = Router();

router.get('/admin/dashboard', verificarJWTAdmin, mostrarDashboardAdmin);

router.post('/admin/productos', verificarJWTAdmin, subidorArchivos.single('imagen'), agregarProductoAdmin);
router.post('/admin/productos/:id', verificarJWTAdmin, subidorArchivos.single('imagen'), editarProductoAdmin);

router.post('/admin/productos/:id/desactivar', verificarJWTAdmin, desactivarProductoAdmin);
router.post('/admin/productos/:id/activar', verificarJWTAdmin, activarProductoAdmin);

export default router;