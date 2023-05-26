import Fastify from "fastify";
import cors from "@fastify/cors";
import formBody from "@fastify/formbody"
import multer from "fastify-multer";
import { connectDb } from "./database.js";

// importacion de rutas

import {usersRoutes} from "./routes/user.routes.js";

connectDb();

const fastify=Fastify({
  logger: true
})

fastify.register(cors,{origin: "*"})
fastify.register(formBody)
fastify.register(multer.contentParser)

// ROUTES

fastify.register( usersRoutes,{prefix:"/user"});

const start=async()=>{
  try {
    await fastify.listen({port:4000, host: "0.0.0.0"})
    console.log("Servidor escuchando por el puerto 4000");
  } catch (error) {
    fastify.log.error(error)
    process.exit(1)
  }
}

start(); 

// Backend 5 Terminado :)