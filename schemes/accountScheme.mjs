import { Schema } from "mongoose";
import common from "./common/commonStaticScheme.mjs";
const accountScheme = new Schema(
  {
    accountType: {
      type: Schema.Types.ObjectId,
      ref: "ROLE",
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 6,
      maxLength: 20,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    statics: {
      ...common,
    },
  }
);

export default accountScheme;