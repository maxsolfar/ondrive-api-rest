import jwt from "jsonwebtoken";
import { tokenErrorsCollection } from "../utils/tokenGenerator.js";

export const verifyToken = (req, res, next) => {
  try {
    const authorizationToken = req.headers.authorization;
    if(!authorizationToken){
      throw new Error("no token");
    }
    else{
      const token = authorizationToken.split(" ")[1];
      const {uid} = jwt.verify(token, process.env.JWT_SECRET);
      req.uid = uid;
      next();
    }
  }
  catch (error) {
    return res.status(500).send({ errors: tokenErrorsCollection[error.message] || error.message });
  }
};