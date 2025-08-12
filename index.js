// importar express y prisma client
import express from "express";
import { PrismaClient  } from "@prisma/client";
import { runSeed } from "./prisma/seed.js";

// inicializar la app y prisma
const app = express();
const prisma = new PrismaClient();

// middleware para parsear JSON en las peticiones
app.use(express.json());

// ruta para mensaje de bienvenida
// req -> request, res -> response
app.get("/", (req,res) => {
    res.send(" 🚀 Bienvenido a la API de Express con Prisma");
})

// Get /users - Obtener todos los usuarios
app.get("/users", async(req,res) => {
    try{
        const users = await prisma.user.findMany();
        res.json(users)
    }catch(err){
        console.error("💥 Error al obtener usuarios:", err)
        res.status(500).json({error: "Algo salió mal al obtener a los usuarios."});
    }
})

// 🌱 Post /users - Crear un nuevo usuario (solo en desarrollo)
app.post("/seed", async(req,res) => {
    if(process.env.NODE_ENV !== "development"){
        return res.status(403).json({error: "Esta ruta solo está disponible en el entorno de desarrollo."});
    }
    try {
        await runSeed();
        res.json({
            message: "🌱 Seed ejecutado exitosamente. Usuarios creados."
        })
    }catch(err){
        console.error("💥 Error al insertar datos:", err);
        res.status(500).json({error: "Algo salió mal al insertar los datos."});
    }
})

//  🚀 inicia el servidor usando la variable de entorno PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
})