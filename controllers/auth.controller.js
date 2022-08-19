import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const login = async (req,res) =>{
  const { email, password } = req.body;

  try {
    const user = await User.findOne({email});
    if(!user){
      throw { code: 1101 };
    }
    else{
      const userPassword = await user.comparePassword(password);
      if(!userPassword){
        throw { code: 1102 };
      }
      else{
        //Token Generate
        const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET);
        return res.status(200).send({ token });
      }
    }
  }
  catch (error) {
    console.log(error.code);
    switch(error.code){
      case 1101: res.status(403).send({ errors: "Username(email) does not exist" }); break;
      case 1102: res.status(403).send({ errors: "Wrong password" }); break;
      default: res.status(500).send({ errors: "Server error" }); break;
    }
  }
}

export const register = async (req,res) =>{
  const { email, password, name, lastName } = req.body;

  try {
    const user = await User.findOne({ email });
    if(user){
      throw { code: 1100 }
    }
    else{
      const user = new User({ email,password,name,lastName });
      await user.save();
      return res.status(201).send(user);
    }
  }
  catch (error) {
    switch(error.code){
      case 1100: return res.status(400).send({ errors: "the user(email) already exists" });
      default: return res.status(500).send({ errors: "Server error" });
    }
  }
}
