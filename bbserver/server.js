const express = require('express');
const multer = require('multer');
const cors=require('cors');
const app= express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const pool=require('./db');
const authorization=require('./authorization');


const fileStorageEngine = multer.diskStorage({
	destination:(req,file,cb)=>{
		cb(null,'./notices')
	},
	filename:(req,file,cb)=>{
		cb(null,Date.now() +'--'+ file.originalname)
	}
});

const upload= multer({storage: fileStorageEngine});

//route for notices
app.post('/notices',upload.single('notice'),(req,res)=>{
  console.log(req.file);
  res.json("file uploaded succesfully");
});


//for login
app.use('/auth',require("./loginroutes"));

//home route
app.get('/home',authorization,async(req,res)=>{
	try{
		//after passing through the middleware req.user has the payload
    //res.json(req.user);  //req.user contains the user id   
	   
	  //query for home...fecth the name
	  const user= await pool.query("select name from users where userid=$1",[req.user]);
	  res.json(user.rows[0]); 
	}catch(err){
		console.error(err.message);
		res.status(500).json("server error");
	}
})

//user type route
app.get('/type',authorization,async(req,res)=>{
	try{
		//after passing through the middleware req.user has the payload
    //res.json(req.user);  //req.user contains the user id   
	   
	  //query for home...fecth the name
	  const user= await pool.query("select type from users where userid=$1",[req.user]);
	  res.json(user.rows[0]); 
	}catch(err){
		console.error(err.message);
		res.status(500).json("server error");
	}
})


//route to insert an event
app.post('/placements/events',async(req,res)=>{
	try{
		const {date}=req.body;
		const {description}=req.body;
		const newEvent= await pool.query("insert into events(edate,ecategory,e_desc)values($1,'placement',$2) returning *",[date,description]);
		res.json(newEvent).rows;
		

	}catch(err){
		console.error(err.message);
	}
});

//route to display all events
app.get('/placements/events',async(req,res)=>{
	try{
     const allEvents= await pool.query("select * from events where ecategory='placement'");
     res.json(allEvents.rows);
	}catch(err){
		console.error(err.message);
	}
});

//delete an event
app.delete('/placements/events/:id',async(req,res)=>{
	try{
		const {id}=req.params;
     const deleteEvent= await pool.query("delete from events where eid=$1",[id]);
     res.json("Post deleted");
	}catch(err){
		console.error(err.message);
	}
});

app.post('/placements/announcements',async(req,res)=>{
	try{
		const {title,desc}=req.body;
		const newPost= await pool.query("insert into announcements(an_title,an_category,an_desc)values($1,'placement',$2) returning *",[title,desc]);
		res.json(newPost).rows;
		

	}catch(err){
		console.error(err.message);
	}
});

app.get('/placements/announcements',async(req,res)=>{
	try{
     const allEvents= await pool.query("select * from announcements where an_category='placement'");
     res.json(allEvents.rows);
	}catch(err){
		console.error(err.message);
	}
});

//route to delete an announcement
app.delete('/placements/announcements/:id',async(req,res)=>{
	try{
		const {id}=req.params;
     const deletePost= await pool.query("delete from announcements where an_id=$1",[id]);
     res.json("Post deleted");
	}catch(err){
		console.error(err.message);
	}
});

app.put('/placements/announcements/:id',async(req,res)=>{
	try{
	 const {id}=req.params;
	 const {editPost}=req.body;
     const updatePost= await pool.query("update announcements set an_desc=$1 where an_id=$2 returning *",[editPost,id]);
     res.json("updated");
	}catch(err){
		console.error(err.message);
	}
});

////Now creating all these routes for department page/////****************************

app.post('/departments/events',async(req,res)=>{
	try{
		const {date}=req.body;
		const {description}=req.body;
		const newEvent= await pool.query("insert into events(edate,ecategory,e_desc)values($1,'department',$2) returning *",[date,description]);
		res.json(newEvent).rows;
		

	}catch(err){
		console.error(err.message);
	}
});

//route to display all events
app.get('/departments/events',async(req,res)=>{
	try{
     const allEvents= await pool.query("select * from events where ecategory='department'");
     res.json(allEvents.rows);
	}catch(err){
		console.error(err.message);
	}
});

//delete an event
app.delete('/departments/events/:id',async(req,res)=>{
	try{
		const {id}=req.params;
     const deleteEvent= await pool.query("delete from events where eid=$1",[id]);
     res.json("Post deleted");
	}catch(err){
		console.error(err.message);
	}
});

app.post('/departments/announcements',async(req,res)=>{
	try{
		const {title,desc}=req.body;
		const newPost= await pool.query("insert into announcements(an_title,an_category,an_desc)values($1,'department',$2) returning *",[title,desc]);
		res.json(newPost).rows;
		

	}catch(err){
		console.error(err.message);
	}
});

app.get('/departments/announcements',async(req,res)=>{
	try{
     const allEvents= await pool.query("select * from announcements where an_category='department'");
     res.json(allEvents.rows);
	}catch(err){
		console.error(err.message);
	}
});

//route to delete an announcement
app.delete('/departments/announcements/:id',async(req,res)=>{
	try{
		const {id}=req.params;
     const deletePost= await pool.query("delete from announcements where an_id=$1",[id]);
     res.json("Post deleted");
	}catch(err){
		console.error(err.message);
	}
});

app.put('/departments/announcements/:id',async(req,res)=>{
	try{
			 const {id}=req.params;
			 const {editPost}=req.body;
		     const updatePost= await pool.query("update announcements set an_desc=$1 where an_id=$2 returning *",[editPost,id]);
		     res.json("updated");
     
	}catch(err){
		console.error(err.message);
	}
});


app.listen(5000);