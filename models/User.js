import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
    email:{
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: { unique: true },
    },
    password:{
      type: String,
      required: true,
    },
    name:{
      type: String,
      required: true,
      trim: true,
    },
    lastName:{
      type: String,
      required: true,
      trim: true,
    }
});

export const User = model("User", userSchema);