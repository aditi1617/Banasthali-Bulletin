//middleware 

const jwt=require('jsonwebtoken');
require('dotenv').config();

//it can access the req and res without hitting the route
module.exports= async (req,res,next)=>{
  try{
    //destructure the token
    const jwtToken=req.header("token");
    
    //if there is no token
    if(!jwtToken){
    	return res.status(403).json("Not Authorized");
    }
   
    const payload = jwt.verify(jwtToken,process.env.jwtSecret);
    req.user=payload.user;
    next();
  }catch(err){
  	console.error(err.message);
  	return res.status(403).json("Not Authorized");
  }
}