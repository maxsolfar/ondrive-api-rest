import { tokenErrorsCollection } from "../utils/tokenGenerator.js";
import jwt from "jsonwebtoken";

export const verifyRefreshToken = (req, res, next) => {
  try {
    const refreshTokenCookie = req.cookies.refresh_token_api_od;
    if(!refreshTokenCookie){
      throw new Error("no token");
    }
    else{
      const {uid} = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
      req.uid = uid;
      next();
    }
  }
  catch (error) {
    return res.status(500).send({ errors: tokenErrorsCollection[error.message] || error.message });
  }
};