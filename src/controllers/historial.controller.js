import { database } from "../database";

/**
 * Crear historial de una traslación de producto
 * @param {id_bodega_origen} id de la bodega al que pertenece el inventario de origen
 * @param {id_bodega_destino} id de la bodega al que pertenece el inventario de destino
 * @param {id_inventario} id del inventario destino
 * @param {cantidad} cantidad trasladada del inventario origen al destino
 * @return {Historial} Historial creada con los datos recibidos
 */
export const crearHistorial = (
  id_bodega_origen,
  id_bodega_destino,
  id_inventario,
  cantidad
) =>
  database.historial.create({
    data: {
      cantidad,
      id_bodega_origen,
      id_bodega_destino,
      id_inventario,
      created_by: 1,
      updated_by: 1,
    },
  });
