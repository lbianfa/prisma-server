import { database } from "../database";

/**
 * Obtener todas los productos
 * @return {Producto[]} Todos los productos existentes
 */
export const obtenerProductos = async () => {
  let productos = await database.producto.findMany({
    include: {
      inventario: {
        select: {
          cantidad: true,
        },
      },
    },
  });

  productos = productos.map((prod) => {
    const total = prod.inventario
      .map((inv) => inv.cantidad)
      .reduce((parcial, sigui) => parcial + sigui, 0);

    delete prod.inventario;

    return {
      ...prod,
      total,
    };
  });

  productos.sort((prod1, prod2) =>
    prod1.total > prod2.total ? -1 : prod1.total < prod2.total ? 1 : 0
  );

  return productos;
};

/**
 * Crear un producto
 * @param {nombre} nombre del producto a crear
 * @param {descripcion} descripcion del producto a crear
 * @return {Producto} Producto creado con los datos recibidos
 */
export const crearProducto = async (nombre, descripcion) =>
  await database.producto.create({
    data: {
      nombre,
      descripcion,
      estado: 1,
      created_by: 1,
      updated_by: 1,
    },
  });
