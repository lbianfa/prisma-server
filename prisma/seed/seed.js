import usuarios from "./usuarios.json";
import productos from "./productos.json";
import bodegas from "./bodegas.json";
import inventarios from "./inventarios.json";
import historiales from "./historiales.json";
import { database } from "../../src/database";

async function seed() {
  await Promise.all(
    usuarios.map(async (usuario) =>
      database.usuario.upsert({
        where: { id: usuario.id, nombre: "fabian" },
        update: {},
        create: {
          ...usuario,
        },
      })
    )
  );

  await Promise.all(
    productos.map(async (producto) =>
      database.producto.upsert({
        where: { id: producto.id },
        update: {},
        create: {
          ...producto,
        },
      })
    )
  );

  await Promise.all(
    bodegas.map(async (bodega) =>
      database.bodega.upsert({
        where: { id: bodega.id },
        update: {},
        create: {
          ...bodega,
        },
      })
    )
  );

  await Promise.all(
    inventarios.map(async (inventario) =>
      database.inventario.upsert({
        where: { id: inventario.id },
        update: {},
        create: {
          ...inventario,
        },
      })
    )
  );

  await Promise.all(
    historiales.map(async (historial) =>
      database.historial.upsert({
        where: { id: historial.id },
        update: {},
        create: {
          ...historial,
        },
      })
    )
  );
}

seed()
  .then(async () => {
    await database.$disconnect();
    console.log("Seed sown!!!");
  })
  .catch(async (e) => {
    console.error(e);
    await database.$disconnect();
    process.exit(1);
  });
