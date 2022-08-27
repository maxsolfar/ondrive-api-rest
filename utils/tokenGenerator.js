import jwt from "jsonwebtoken";
//JWT Token Generate
export const generateToken = (uid) => {
  const expTime = 60 * 15;
  try {
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn: expTime });
    return {token: token, expiresIn: expTime};
  }
  catch (error) {
    console.log(error.message);
  }
};

export const generateRefreshToken = (uid, res) => {
  const expTime = 60 * 60 * 24 * 15;
  try {
    const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, { expiresIn: expTime });
    //Cookie config for Refresh Token
    res.cookie("refresh_token_api_od", refreshToken,{
      httpOnly: true,
      secure: !(process.env.MODE === "DEV"),
      expires: new Date(Date.now() + expTime * 1000),
      sameSite: 'none',
    });

  } catch (error) {
    console.log(error.message);
  }
};

export const tokenErrorsCollection = {
  "invalid signature": "Invalid TOKEN signature",
  "jwt expired": "TOKEN expired",
  "invalid token": "Invalid TOKEN",
  "no token": "No TOKEN for verification, use BEARER format",
  "jwt malformed": "The TOKEN sent is malformed"
};
