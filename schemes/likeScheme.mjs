import { Schema } from "mongoose";
import POST from "../models/postModel.mjs";
import ACCOUNT from "../models/accountModel.mjs";
import common from "./common/commonStaticScheme.mjs";
const LikeScheme = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: POST,
      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: ACCOUNT,
      required: true,
    },
  },
  {
    statics: {
      ...common,
    },
  },
  { timestamps: true }
);
LikeScheme.index({ post: 1, user: 1 }, { unique: true });

export default LikeScheme;
