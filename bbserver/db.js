const Pool= require('pg').Pool;

const pool= new Pool({
	user:"postgres",
	password:"aditi",
	host:"localhost",
	port:5432,
	database:"bvbulletin",
})

module.exports=pool;