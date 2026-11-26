import { Router } from "express";
import { listarProductos, listarCategorias } from "../controllers/productosController.js";
const router = Router();
router.get("/", listarProductos);
router.get("/categorias", listarCategorias);
export default router;
