import {  model } from "mongoose";
import postScheme from "../schemes/postScheme.mjs";

const postModel = new model("POST", postScheme);


export default postModel;