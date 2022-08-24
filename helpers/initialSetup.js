/* import Role from "../models/Role.js";

export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count > 0) return;

    await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "monitor" }).save(),
      new Role({ name: "admin" }).save(),
    ]);
    
  } catch (error) {
    throw new Error({errors: "Roles could not be created"});
  }
}; */
import path from "path";
import { fileURLToPath } from 'url';

/*Swagger Initial Spec*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager API",
      version: "1.0.0"
    },
    servers: [
      {
        url: `${process.env.URL}`,
        description: "Local dev"
      },
      {
        url: `${process.env.URLP}`,
        description: "Production dev"
      }
    ]
  },
  apis: [`${path.join(__dirname, "../routes/*.route.js")}`]
}
