import { Router } from "express";
import { crearInventario } from "../controllers/inventario.controller";

const router = Router();

router.post("/inventarios", async (req, res, next) => {
  const { id_producto, id_bodega, cantidad } = req.body;

  const result = await crearInventario(id_producto, id_bodega, cantidad);

  res.json({ result });
});

export default router;
