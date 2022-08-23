import { User } from "../models/User.js";
import { generateRefreshToken, generateToken } from "../utils/tokenGenerator.js";

export const login = async (req,res) =>{
  const { email, password } = req.body;

  try {
    const user = await User.findOne({email});
    if(!user){
      throwError(1101);  
    } 
    else{
      const userPassword = await user.comparePassword(password);
      if(!userPassword){
        throwError(1102);   
      }
      else{
        //Token
        const { token, expiresIn } = generateToken(user._id);
        generateRefreshToken(user._id, res);
       
        return res.status(200).send({ token, expiresIn });
      }
    }
  }
  catch (error) {
    return res.status(error.code || 500).send({ errors: error.message });
  }
};

export const register = async (req,res) =>{
  const { email, password, name, lastName } = req.body;

  try {
    const user = await User.findOne({ email });
    if(user){
      throwError(1100);
    }
    else{
      const user = new User({ email, password, name, lastName });
      await user.save();
      return res.status(201).send(user);
    }
  }
  catch (error) {
    return res.status(error.code || 500).send({ errors: error.message });  
  }
};

export const refreshToken = (req, res) => {
  const uid = req.uid;
  try {
    const {token, expiresIn} = generateToken(uid);
    return res.status(200).send({token, expiresIn});
  }
  catch (error) {
    return res.status(error.code || 500).send({ errors: "Server error" });
  }
}

export const logout = (req,res) => {
  res.clearCookie("refresh_token_api_od");
  res.json({logout: true});
};

const throwError = (errorType) => {
  if(errorType === 1100){
    const error = new Error("Username(email) already exists");
    error.code = 403;
    throw error; 
  }
  if(errorType === 1101){
    const error = new Error("Username(email) does not exist");
    error.code = 401;
    throw error; 
  } 
  if(errorType === 1102){
    const error = new Error("Wrong password");
    error.code = 403;
    throw error; 
  } 
};