import { User } from "../models/User.js";
import { generateRefreshToken, generateToken } from "../utils/tokenGenerator.js";

const authErrorsCollection = {
  1100: "Username(email) already exists",
  1101: "Username(email) does not exist" ,
  1102: "Wrong password",
};

export const login = async (req,res) =>{
  const { email, password } = req.body;

  try {
    const user = await User.findOne({email});
    if(!user){
      throw new Error(1101);
    } 
    else{
      const userPassword = await user.comparePassword(password);
      if(!userPassword){
        throw new Error(1102);
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
    return res.status(500).send({ errors: authErrorsCollection[error.message] || error.message });
  }
};

export const register = async (req,res) =>{
  const { email, password, name, lastName } = req.body;

  try {
    const user = await User.findOne({ email });
    if(user){
      throw new Error(1100);
    }
    else{
      const user = new User({ email,password,name,lastName });
      await user.save();
      return res.status(201).send(user);
    }
  }
  catch (error) {
    return res.status(500).send({ errors: authErrorsCollection[error.message] || error.message });  
  }
};


export const prueba = async (req, res) => {
  const uid = req.uid;
  
  try {
    const user = await User.findById(uid).lean();
    return res.status(200).send({ id: user._id, email: user.email, name: `${user.name} ${user.lastName}` });
  }
  catch (error) {
    return res.status(500).send({ errors: "Server error" });
  }
};

export const refreshToken = (req, res) => {
  const uid = req.uid;
  try {
    const {token, expiresIn} = generateToken(uid);
    return res.status(200).send({token, expiresIn});
  }
  catch (error) {
    return res.status(500).send({ errors: "Server error" });
  }
}

export const logout = (req,res) => {
  res.clearCookie("refresh_token_api_od");
  res.json({ok: true});
};