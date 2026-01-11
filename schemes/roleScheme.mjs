import { Schema } from "mongoose";
import common from "./common/commonStaticScheme.mjs";

const roleScheme = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "ACCOUNT",
      },
    ],
    createdOn: {
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

export default roleScheme;
