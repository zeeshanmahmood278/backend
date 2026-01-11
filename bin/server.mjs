import "dotenv/config";
import mongoose from "mongoose";
import app from "../app.mjs";

import ROLE from "../models/roleModel.mjs";
import roleSeeder from "../seeders/roleSeeders.mjs";
import seedUsers from "../seeders/creatorSeeder.mjs";


const startServer = () => {
  app.listen(process.env.PORT || 8080, () => {
    console.log(`SERVER IS STARTING AT PORT ${process.env.PORT || 8080}`);
  });
};

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.log("MONGO_URI not set. Skipping DB connection.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    /* POPULATE ROLES INTO DATABASE */
    const countRoles = await ROLE.countDocuments({});
    if (countRoles === 0) {
      await roleSeeder();
      console.log("Roles seeded");
    }

    await seedUsers();
  } catch (error) {
    console.error("DATABASE CONNECTION FAILED:", error.message);
  }
};
startServer();

connectDB();
