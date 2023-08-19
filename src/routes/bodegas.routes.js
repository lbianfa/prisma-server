import { Router } from "express";
import {
  obtenerBodegas,
  crearBodega,
  obtenerBodegaProducto,
} from "../controllers/bodegas.controller";
import { database } from "../database";
import { actualizarCantidad } from "../controllers/inventario.controller";
import { crearHistorial } from "../controllers/historial.controller";

const router = Router();

router.get("/bodegas", async (req, res, next) => {
  try {
    const result = await obtenerBodegas();

    res.json({ result });
  } catch (error) {
    return next(error);
  }
});

router.post("/bodegas", async (req, res, next) => {
  try {
    const { id_usuario, nombre } = req.body;

    const result = await crearBodega(id_usuario, nombre);

    res.json({ result });
  } catch (error) {
    return next(error);
  }
});

router.put("/bodegas/trasladar", async (req, res, next) => {
  try {
    const { id_producto, id_bodega_origen, id_bodega_destino, cantidad } =
      req.body;

    const bodegaOrigen = await obtenerBodegaProducto(
      id_bodega_origen,
      id_producto
    );

    if (!bodegaOrigen) {
      const error = new Error("Bodega origen inexistente");
      error.statusCode = 404;
      throw error;
    }

    const inventarioOrigen = bodegaOrigen.inventario[0];
    const cantidadOrigen = inventarioOrigen?.cantidad ?? 0;

    if (cantidadOrigen < cantidad) {
      const error = new Error("Cantidad insuficiente en la bodega origen");
      error.statusCode = 400;
      throw error;
    }

    const bodegaDestino = await obtenerBodegaProducto(
      id_bodega_destino,
      id_producto
    );

    if (!bodegaDestino) {
      const error = new Error("Bodega destino inexistente");
      error.statusCode = 404;
      throw error;
    }

    const inventarioDestino = bodegaDestino.inventario[0];
    const cantidadDestino = inventarioDestino?.cantidad;

    if (isNaN(cantidadDestino)) {
      const error = new Error("Producto inexistente en la bodega destino");
      error.statusCode = 400;
      throw error;
    }

    const traslation = await database.$transaction([
      actualizarCantidad(inventarioOrigen.id, cantidadOrigen - cantidad),
      actualizarCantidad(inventarioDestino.id, cantidadDestino + cantidad),
      crearHistorial(
        id_bodega_origen,
        id_bodega_destino,
        inventarioDestino.id,
        cantidad
      ),
    ]);

    res.json({ result: traslation ? "Traslación exitosa" : "Hubo un error" });
  } catch (error) {
    return next(error);
  }
});

export default router;
