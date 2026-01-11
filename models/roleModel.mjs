import { model } from "mongoose";
import roleScheme from "../schemes/roleScheme.mjs";
const roleModel = new model("ROLE", roleScheme);
export default roleModel;
