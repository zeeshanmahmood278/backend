import { model } from "mongoose";
import LikeScheme from "../schemes/likeScheme.mjs";
const LikeModel = new model("LIKE", LikeScheme);
export default LikeModel;
