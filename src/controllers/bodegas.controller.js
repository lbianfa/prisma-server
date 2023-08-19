import { database } from "../database";

/**
 * Obtener todas las bodegas
 * @return {Bodega[]} Todas las bodegas existentes
 */
export const obtenerBodegas = async () => {
  let bodegas = await database.bodega.findMany();

  bodegas.sort((bo1, bo2) =>
    bo1.nombre < bo2.nombre ? -1 : bo1.nombre > bo2.name ? 1 : 0
  );

  return bodegas;
};

/**
 * Crear una bodega
 * @param {id_usuario} id del usuario responsable de crear la bodega
 * @param {nombre} nombre de la bodega que se desea crear
 * @return {Bodega} Bodega creada con los datos recibidos
 */
export const crearBodega = async (id_usuario, nombre) =>
  await database.bodega.create({
    data: {
      nombre,
      estado: 1,
      id_responsable: id_usuario,
      created_by: id_usuario,
      updated_by: id_usuario,
    },
  });

/**
 * Obtener inventario del producto por el id de la bodega
 * @param {id_bodega} id de la bodega que se quiere consultar
 * @param {id_producto} id del producto que se quiere consultar en inventario
 * @return {Bodega} Bodega con el inventario del producto
 */
export const obtenerBodegaProducto = async (id_bodega, id_producto) =>
  await database.bodega.findFirst({
    where: {
      id: id_bodega,
    },
    select: {
      inventario: {
        where: {
          id_producto,
        },
        select: {
          id: true,
          cantidad: true,
        },
      },
    },
  });
