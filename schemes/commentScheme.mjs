import { Schema } from "mongoose";

import ACCOUNT from "../models/accountModel.mjs";
import POST from "../models/postModel.mjs";

const commentScheme = new Schema({
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
  comment: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});
export default commentScheme;