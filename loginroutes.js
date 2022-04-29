const router=require('express').Router();
const pool=require('./db');
const bcrypt=require('bcrypt');
const jwtGenerator=require('./jwtGenerator');
const validInfo =require('./validInfo');
const authorization= require('./authorization');

//login route

router.post('/login',validInfo,async(req,res)=>{
	try{
     //destructure
     const {userid,password}=req.body;

     //if the user does'nt exit 
      const user = await pool.query("select * from users where userid=$1",[userid])
       
       if(user.rows.length===0){
       	return res.status(401).json("Id or Password is incorrect");
       }
     //if exsits verify password
     const cmp= password.localeCompare(user.rows[0].password);
     if(cmp!=0)
     {
     	return res.status(401).json("incorrect password");
     }

     const token= jwtGenerator(user.rows[0].userid);
     console.log('logged in');
     res.json({token});

	}catch(err){

	}
})

router.get('/is-verify',authorization,async(req,res)=>{
    try{
       res.json(true); 

    }catch(err){
        console.error(err.message);
        res.status(500).send("server error");
    }
})




module.exports=router;