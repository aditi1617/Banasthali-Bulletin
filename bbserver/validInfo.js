//middleware

module.exports= function(req,res,next) {
	const {userid,password} = req.body;

	if(req.path ==="/login"){
		if(![userid,password].every(Boolean)){
			return res.status(401).json("Missing Credentials");
		}

	}

	next();
};