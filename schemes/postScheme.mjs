import { Schema, Types } from "mongoose";
import common from "./common/commonStaticScheme.mjs";
import mongoose from "mongoose";
const postScheme = new Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: 150,
    },
    description: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ACCOUNT",
      required: true
    },

    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "COMMENT" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "LIKE" }],
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

export default postScheme;
