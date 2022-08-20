import mongoose from "mongoose";
const { Schema, model } = mongoose;
import bcrypt from "bcryptjs";

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
},{
  timestamps: true,
  versionKey: false
});

userSchema.pre("save", async function(next){
  const user = this;

  if(!user.isModified("password")) return next();
  
  try {
    const salt = await bcrypt.genSalt(8);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    throw new Error("Password has not been hashed");
  }
});

userSchema.methods.comparePassword = async function(candidatePassword){
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User = model("User", userSchema);