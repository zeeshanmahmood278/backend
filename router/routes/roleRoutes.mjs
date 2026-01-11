import { Router } from "express";
import getRoles from "../../controllers/roleController.mjs";

const roleRoutes = Router();

roleRoutes.get("/getRoles",  getRoles);
export default roleRoutes;
