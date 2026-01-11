import { model } from "mongoose";
import commentScheme from "../schemes/commentScheme.mjs";
const commentModel = new model("COMMENT", commentScheme);
export default commentModel;
