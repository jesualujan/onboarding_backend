//Importar el cliente de prisma para interactuar con la base de datos
import { PrismaClient } from "@prisma/client";
// instanciar el cliente de prisma
const prisma = new PrismaClient();

// 🌱 Función principal que ejecuta el seeding (sembrado) de datos

async function runSeed () {
    console.log("🌱 Ejecutando el seed...");
    // ⚠️ Intenta limpiar la tabla antes de insertar nuevos datos
    try{
        //eliminar todos lso registros existentes en la tabla User
        await prisma.user.deleteMany();
        console.log("🧹 Tabla User limpiada exitosamente.");
    

    // insertar múltiples datos de usuarios de prueba en la tabla User
    const result = await prisma.user.createMany({
        data: [
        { name: "Alice", email: "alice@example.com" },
        { name: "Bob", email: "bob@example.com" },
        { name: "Charlie", email: "charlie@example.com" },
        { name: "Diana", email: "diana@example.com" },
        { name: "Ethan", email: "ethan@example.com" },
        { name: "Fiona", email: "fiona@example.com" },
        { name: "George", email: "george@example.com" },
        { name: "Hannah", email: "hannah@example.com" },
        { name: "Ivan", email: "ivan@example.com" }
        ]
    })

    //muestra en consola cuántos usuarios fueron creados/insertados
    console.log(`✅ se insertaron ${result.count} usuarios exitosamente.`);
    }catch(err){
        // captura y muestra cualquier error que ocurra durante el proceso
        console.error("💥 Error al ejecutar el seed:", err);
    } finally {
        // cierra la conexión con la base de datos
        await prisma.$disconnect();
        console.log("🔌 Conexión con la base de datos cerrada.");
    }
}

// ejecutamos la función de seeding directamente
runSeed();