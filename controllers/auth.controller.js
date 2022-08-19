

export const login = (req,res) =>{
  const {email, password} = req.body;
  res.json({ok: "login"});
}

export const register = (req,res) =>{
  const {email, password, name, lastName} = req.body;
  res.json({ok: "register"});
}
