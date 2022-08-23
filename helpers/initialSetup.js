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
