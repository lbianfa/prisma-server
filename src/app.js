import express, { json } from "express";
import cors from "cors";
import bodegasRoutes from "./routes/bodegas.routes";
import inventariosRoutes from "./routes/inventario.routes";
import productosRoutes from "./routes/productos.routes";

const app = express();

// middlewares
app.use(cors());
app.use(json());

// routes
app.use("/api", bodegasRoutes);
app.use("/api", inventariosRoutes);
app.use("/api", productosRoutes);
app.get("/", (req, res) => {
  res.json({ status: "Bienvenido a Riwi Server" });
});

// error handler
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    error: error.message || "Internal Server Error",
    success: false,
    code: error.code || 0,
  });
});

export default app;
