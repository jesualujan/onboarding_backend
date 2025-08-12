// importar express y prisma client
import express from "express";


// inicializar la app y prisma
const app = express();


// middleware para parsear JSON en las peticiones
app.use(express.json());

// ruta para mensaje de bienvenida
app.get("/", (request,response) => {
    response.send(" 🚀 Bienvenido a la API de Express con Prisma");
})

//  🚀 inicia el servidor usando la variable de entorno PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
})