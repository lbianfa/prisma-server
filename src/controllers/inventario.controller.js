import { database } from "../database";

/**
 * Crear inventario para producto nuevo
 * @param {id_producto} id del nuevo producto creado
 * @param {cantidad} cantidad inicial
 * @return {Inventario} Inventario creado con los datos recibidos
 */
export const crearInventarioporDefecto = async (id_producto, cantidad) =>
  await database.inventario.create({
    data: {
      id_bodega: 1,
      id_producto: id_producto,
      cantidad,
      created_by: 1,
      updated_by: 1,
    },
  });

/**
 * Crear inventario
 * @param {id_producto} id del producto
 * @param {id_bodega} id de la bodega
 * @param {cantidad} cantidad para inicializar o sumar
 * @return {Inventario} Inventario creado con los datos recibidos
 */
export const crearInventario = async (id_producto, id_bodega, cantidad) => {
  const inventarioDB = await database.inventario.findFirst({
    where: {
      id_producto,
      id_bodega,
    },
    select: {
      id: true,
      cantidad: true,
    },
  });

  let result = {};
  if (inventarioDB) {
    result = await database.inventario.update({
      where: {
        id: inventarioDB.id,
      },
      data: {
        cantidad: inventarioDB.cantidad + cantidad,
      },
    });
  } else {
    result = await database.inventario.create({
      data: {
        id_bodega,
        id_producto,
        cantidad,
        created_by: 1,
        updated_by: 1,
      },
    });
  }

  return result;
};

/**
 * Actualizar cantidad
 * @param {id} id del inventario
 * @param {cantidad} cantidad a modificar
 * @return {Inventario} Inventario actualizado con los datos recibidos
 */
export const actualizarCantidad = (id, cantidad) =>
  database.inventario.update({
    where: {
      id,
    },
    data: {
      cantidad,
    },
  });
