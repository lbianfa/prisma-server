import { Router } from "express";
import {
  obtenerProductos,
  crearProducto,
} from "../controllers/productos.controller";
import { crearInventarioporDefecto } from "../controllers/inventario.controller";

const router = Router();

router.get("/productos", async (req, res, next) => {
  try {
    const result = await obtenerProductos();

    res.json({ result });
  } catch (error) {
    return next(error);
  }
});

router.post("/productos", async (req, res, next) => {
  try {
    const { nombre, descripcion, cantidad } = req.body;

    const producto = await crearProducto(nombre, descripcion);

    const inventario = await crearInventarioporDefecto(producto.id, cantidad);

    res.json({
      result: {
        ...producto,
        inventario_id: inventario.id,
        cantidad: inventario.cantidad,
      },
    });
  } catch (error) {
    return next(error);
  }
});

export default router;
