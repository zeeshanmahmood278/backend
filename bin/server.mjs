import mongoose from "mongoose";
import app from "../app.mjs";

import ROLE from "../models/roleModel.mjs";
import roleSeeder from "../seeders/roleSeeders.mjs";
import seedUsers from "../seeders/creatorSeeder.mjs";

import dotenv from "dotenv";
dotenv.config();

try {
  await mongoose.connect(process.env.MONGO_URI);

  /* POPULATE ROLES INTO DATABASE. */
  const countRoles = await ROLE.countDocuments({});
  
  if ( countRoles == 0){
    await roleSeeder();
  } 

  /* SEED DEFAULT USERS */
  await seedUsers();


  

  const server = app.listen(process.env.PORT || 3000, () => {
    const { port } = server.address();
    console.log(`SERVER IS STARTING AT PORT ${port}`);
  });
} catch (error) {
  const { message } = error;
  console.log(`DATABASE CONNECTION FAILED. ${message}`);
  process.exit(1);
}