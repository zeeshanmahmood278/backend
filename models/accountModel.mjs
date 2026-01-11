import { model } from "mongoose";
import accountScheme from "../schemes/accountScheme.mjs";
const accountModel = new model("ACCOUNT", accountScheme);


export default accountModel;