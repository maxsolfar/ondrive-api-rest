import mongoose from "mongoose";
const { Schema, model } = mongoose;

const roleSchema = new Schema({
  name: String
},{
  versionKey: false
})

export default model('Role', roleSchema);