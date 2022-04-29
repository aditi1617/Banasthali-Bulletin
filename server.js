const express = require('express');
const multer = require('multer');
const fileupload= require('express-fileupload');
const cors=require('cors');
const app= express();
app.use(fileupload());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const pool=require('./db');
const authorization=require('./authorization');


//upload endpoint(route)
app.post('/file',async(req,res)=>{
	try{
		if(req.files=== null){
			return res.status(400).json("No file attached");
		}

		const file= req.files.file;           //here i files.file file is the name that we used in front end
		file.mv(`${__dirname}/reactfend/public/uploads/${file.name}` ,err=>{
			if(err){
				console.error(err);
				return res.status(500).send(err);
			}
		});
		const filepath=`/uploads/${file.name}`;
		const mt= req.files.file.mimetype;

      const id= await pool.query("SELECT an_id FROM announcements WHERE an_id=(SELECT max(an_id) from announcements)");
      const nid=id.rows[0].an_id;
			const newfile= await pool.query("insert into notices values($1,$2,$3,$4)",[file.name,filepath,nid,mt]);

			//res.json({fileName:file.name,filePath:`/notices${file.name}`});
			res.json(newfile).rows;
	

	}catch(err){
		console.error(err.message);
	}
});

//route to display notices

app.get('/getfiles',async(req,res)=>{
	try{
     const allfiles= await pool.query("select * from notices");
     res.json(allfiles.rows);
	}catch(err){
		console.error(err.message);
	}
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

//route to display announcements at home page
app.get('/home/announcements',async(req,res)=>{
	try{
     const allEvents= await pool.query("select * from (select * from announcements order by an_id desc limit 7) sub order by an_id asc");
     res.json(allEvents.rows);
	}catch(err){
		console.error(err.message);
	}
});


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
		const newPost= await pool.query("insert into announcements(an_title,an_category,an_desc)values($1,'/placement',$2) returning *",[title,desc]);
		res.json(newPost).rows;
		

	}catch(err){
		console.error(err.message);
	}
});

app.get('/placements/announcements',async(req,res)=>{
	try{
     const allEvents= await pool.query("select * from announcements where an_category='/placement'");
     res.json(allEvents.rows);
	}catch(err){
		console.error(err.message);
	}
});

//route to delete an announcement
app.delete('/placements/announcements/:id',async(req,res)=>{
	try{
		const {id}=req.params;
	 const delfile= await pool.query("delete from notices where an_id=$1",[id]);
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
		const newPost= await pool.query("insert into announcements(an_title,an_category,an_desc)values($1,'/department',$2) returning *",[title,desc]);
		res.json(newPost).rows;
		

	}catch(err){
		console.error(err.message);
	}
});

app.get('/departments/announcements',async(req,res)=>{
	try{
     const allEvents= await pool.query("select * from announcements where an_category='/department'");
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

//for restof the departments
 //ce

 app.post('/cedepartments/events',async(req,res)=>{
 	try{
 		const {date}=req.body;
 		const {description}=req.body;
 		const newEvent= await pool.query("insert into events(edate,ecategory,e_desc)values($1,'cedepartment',$2) returning *",[date,description]);
 		res.json(newEvent).rows;
 		

 	}catch(err){
 		console.error(err.message);
 	}
 });

 //route to display all events
 app.get('/cedepartments/events',async(req,res)=>{
 	try{
      const allEvents= await pool.query("select * from events where ecategory='cedepartment'");
      res.json(allEvents.rows);
 	}catch(err){
 		console.error(err.message);
 	}
 });

 //delete an event
 app.delete('/cedepartments/events/:id',async(req,res)=>{
 	try{
 		const {id}=req.params;
      const deleteEvent= await pool.query("delete from events where eid=$1",[id]);
      res.json("Post deleted");
 	}catch(err){
 		console.error(err.message);
 	}
 });

 app.post('/cedepartments/announcements',async(req,res)=>{
 	try{
 		const {title,desc}=req.body;
 		const newPost= await pool.query("insert into announcements(an_title,an_category,an_desc)values($1,'/cedepartment',$2) returning *",[title,desc]);
 		res.json(newPost).rows;
 		

 	}catch(err){
 		console.error(err.message);
 	}
 });

 app.get('/cedepartments/announcements',async(req,res)=>{
 	try{
      const allEvents= await pool.query("select * from announcements where an_category='/cedepartment'");
      res.json(allEvents.rows);
 	}catch(err){
 		console.error(err.message);
 	}
 });

 //route to delete an announcement
 app.delete('/cedepartments/announcements/:id',async(req,res)=>{
 	try{
 		const {id}=req.params;
      const deletePost= await pool.query("delete from announcements where an_id=$1",[id]);
      res.json("Post deleted");
 	}catch(err){
 		console.error(err.message);
 	}
 });

 app.put('/cedepartments/announcements/:id',async(req,res)=>{
 	try{
 			 const {id}=req.params;
 			 const {editPost}=req.body;
 		     const updatePost= await pool.query("update announcements set an_desc=$1 where an_id=$2 returning *",[editPost,id]);
 		     res.json("updated");
      
 	}catch(err){
 		console.error(err.message);
 	}
 });

 //BT------------------------------------------------------------------------------------

 app.post('/btdepartments/events',async(req,res)=>{
 	try{
 		const {date}=req.body;
 		const {description}=req.body;
 		const newEvent= await pool.query("insert into events(edate,ecategory,e_desc)values($1,'btdepartment',$2) returning *",[date,description]);
 		res.json(newEvent).rows;
 		

 	}catch(err){
 		console.error(err.message);
 	}
 });

 //route to display all events
 app.get('/btdepartments/events',async(req,res)=>{
 	try{
      const allEvents= await pool.query("select * from events where ecategory='btdepartment'");
      res.json(allEvents.rows);
 	}catch(err){
 		console.error(err.message);
 	}
 });

 //delete an event
 app.delete('/btdepartments/events/:id',async(req,res)=>{
 	try{
 		const {id}=req.params;
      const deleteEvent= await pool.query("delete from events where eid=$1",[id]);
      res.json("Post deleted");
 	}catch(err){
 		console.error(err.message);
 	}
 });

 app.post('/btdepartments/announcements',async(req,res)=>{
 	try{
 		const {title,desc}=req.body;
 		const newPost= await pool.query("insert into announcements(an_title,an_category,an_desc)values($1,'/btdepartment',$2) returning *",[title,desc]);
 		res.json(newPost).rows;
 		

 	}catch(err){
 		console.error(err.message);
 	}
 });

 app.get('/btdepartments/announcements',async(req,res)=>{
 	try{
      const allEvents= await pool.query("select * from announcements where an_category='/btdepartment'");
      res.json(allEvents.rows);
 	}catch(err){
 		console.error(err.message);
 	}
 });

 //route to delete an announcement
 app.delete('/btdepartments/announcements/:id',async(req,res)=>{
 	try{
 		const {id}=req.params;
      const deletePost= await pool.query("delete from announcements where an_id=$1",[id]);
      res.json("Post deleted");
 	}catch(err){
 		console.error(err.message);
 	}
 });

 app.put('/btdepartments/announcements/:id',async(req,res)=>{
 	try{
 			 const {id}=req.params;
 			 const {editPost}=req.body;
 		     const updatePost= await pool.query("update announcements set an_desc=$1 where an_id=$2 returning *",[editPost,id]);
 		     res.json("updated");
      
 	}catch(err){
 		console.error(err.message);
 	}
 });

 //ece-----------------------------------------------------------------------------------------------

 app.post('/ecedepartments/events',async(req,res)=>{
 	try{
 		const {date}=req.body;
 		const {description}=req.body;
 		const newEvent= await pool.query("insert into events(edate,ecategory,e_desc)values($1,'ecedepartment',$2) returning *",[date,description]);
 		res.json(newEvent).rows;
 		

 	}catch(err){
 		console.error(err.message);
 	}
 });

 //route to display all events
 app.get('/ecedepartments/events',async(req,res)=>{
 	try{
      const allEvents= await pool.query("select * from events where ecategory='ecedepartment'");
      res.json(allEvents.rows);
 	}catch(err){
 		console.error(err.message);
 	}
 });

 //delete an event
 app.delete('/ecedepartments/events/:id',async(req,res)=>{
 	try{
 		const {id}=req.params;
      const deleteEvent= await pool.query("delete from events where eid=$1",[id]);
      res.json("Post deleted");
 	}catch(err){
 		console.error(err.message);
 	}
 });

 app.post('/ecedepartments/announcements',async(req,res)=>{
 	try{
 		const {title,desc}=req.body;
 		const newPost= await pool.query("insert into announcements(an_title,an_category,an_desc)values($1,'/ecedepartment',$2) returning *",[title,desc]);
 		res.json(newPost).rows;
 		

 	}catch(err){
 		console.error(err.message);
 	}
 });

 app.get('/ecedepartments/announcements',async(req,res)=>{
 	try{
      const allEvents= await pool.query("select * from announcements where an_category='/ecedepartment'");
      res.json(allEvents.rows);
 	}catch(err){
 		console.error(err.message);
 	}
 });

 //route to delete an announcement
 app.delete('/ecedepartments/announcements/:id',async(req,res)=>{
 	try{
 		const {id}=req.params;
      const deletePost= await pool.query("delete from announcements where an_id=$1",[id]);
      res.json("Post deleted");
 	}catch(err){
 		console.error(err.message);
 	}
 });

 app.put('/ecedepartments/announcements/:id',async(req,res)=>{
 	try{
 			 const {id}=req.params;
 			 const {editPost}=req.body;
 		     const updatePost= await pool.query("update announcements set an_desc=$1 where an_id=$2 returning *",[editPost,id]);
 		     res.json("updated");
      
 	}catch(err){
 		console.error(err.message);
 	}
 });

 //mteeei

 //---------------------------------------

 app.post('/mtdepartments/events',async(req,res)=>{
 	try{
 		const {date}=req.body;
 		const {description}=req.body;
 		const newEvent= await pool.query("insert into events(edate,ecategory,e_desc)values($1,'mtdepartment',$2) returning *",[date,description]);
 		res.json(newEvent).rows;
 		

 	}catch(err){
 		console.error(err.message);
 	}
 });

 //route to display all events
 app.get('/mtdepartments/events',async(req,res)=>{
 	try{
      const allEvents= await pool.query("select * from events where ecategory='mtdepartment'");
      res.json(allEvents.rows);
 	}catch(err){
 		console.error(err.message);
 	}
 });

 //delete an event
 app.delete('/mtdepartments/events/:id',async(req,res)=>{
 	try{
 		const {id}=req.params;
      const deleteEvent= await pool.query("delete from events where eid=$1",[id]);
      res.json("Post deleted");
 	}catch(err){
 		console.error(err.message);
 	}
 });

 app.post('/mtdepartments/announcements',async(req,res)=>{
 	try{
 		const {title,desc}=req.body;
 		const newPost= await pool.query("insert into announcements(an_title,an_category,an_desc)values($1,'/mtdepartment',$2) returning *",[title,desc]);
 		res.json(newPost).rows;
 		

 	}catch(err){
 		console.error(err.message);
 	}
 });

 app.get('/mtdepartments/announcements',async(req,res)=>{
 	try{
      const allEvents= await pool.query("select * from announcements where an_category='/mtdepartment'");
      res.json(allEvents.rows);
 	}catch(err){
 		console.error(err.message);
 	}
 });

 //route to delete an announcement
 app.delete('/mtdepartments/announcements/:id',async(req,res)=>{
 	try{
 		const {id}=req.params;
      const deletePost= await pool.query("delete from announcements where an_id=$1",[id]);
      res.json("Post deleted");
 	}catch(err){
 		console.error(err.message);
 	}
 });

 app.put('/mtdepartments/announcements/:id',async(req,res)=>{
 	try{
 			 const {id}=req.params;
 			 const {editPost}=req.body;
 		     const updatePost= await pool.query("update announcements set an_desc=$1 where an_id=$2 returning *",[editPost,id]);
 		     res.json("updated");
      
 	}catch(err){
 		console.error(err.message);
 	}
 });

//creating all routes for covid page

//route to insert an event
app.post('/covid/events',async(req,res)=>{
	try{
		const {date}=req.body;
		const {description}=req.body;
		const newEvent= await pool.query("insert into events(edate,ecategory,e_desc)values($1,'covid',$2) returning *",[date,description]);
		res.json(newEvent).rows;
		

	}catch(err){
		console.error(err.message);
	}
});

//route to display all events
app.get('/covid/events',async(req,res)=>{
	try{
     const allEvents= await pool.query("select * from events where ecategory='covid'");
     res.json(allEvents.rows);
	}catch(err){
		console.error(err.message);
	}
});

//delete an event
app.delete('/covid/events/:id',async(req,res)=>{
	try{
		const {id}=req.params;
     const deleteEvent= await pool.query("delete from events where eid=$1",[id]);
     res.json("Post deleted");
	}catch(err){
		console.error(err.message);
	}
});

app.post('/covid/announcements',async(req,res)=>{
	try{
		const {title,desc}=req.body;
		const newPost= await pool.query("insert into announcements(an_title,an_category,an_desc)values($1,'/covid',$2) returning *",[title,desc]);
		res.json(newPost).rows;
		

	}catch(err){
		console.error(err.message);
	}
});

app.get('/covid/announcements',async(req,res)=>{
	try{
     const allEvents= await pool.query("select * from announcements where an_category='/covid'");
     res.json(allEvents.rows);
	}catch(err){
		console.error(err.message);
	}
});

//route to delete an announcement
app.delete('/covid/announcements/:id',async(req,res)=>{
	try{
		const {id}=req.params;
     const deletePost= await pool.query("delete from announcements where an_id=$1",[id]);
     res.json("Post deleted");
	}catch(err){
		console.error(err.message);
	}
});

app.put('/covid/announcements/:id',async(req,res)=>{
	try{
	 const {id}=req.params;
	 const {editPost}=req.body;
     const updatePost= await pool.query("update announcements set an_desc=$1 where an_id=$2 returning *",[editPost,id]);
     res.json("updated");
	}catch(err){
		console.error(err.message);
	}
});


//all routes for clubs page
//route to insert an event
app.post('/clubs/events',async(req,res)=>{
	try{
		const {date}=req.body;
		const {description}=req.body;
		const newEvent= await pool.query("insert into events(edate,ecategory,e_desc)values($1,'club',$2) returning *",[date,description]);
		res.json(newEvent).rows;
		

	}catch(err){
		console.error(err.message);
	}
});

//route to display all events
app.get('/clubs/events',async(req,res)=>{
	try{
     const allEvents= await pool.query("select * from events where ecategory='club'");
     res.json(allEvents.rows);
	}catch(err){
		console.error(err.message);
	}
});

//delete an event
app.delete('/clubs/events/:id',async(req,res)=>{
	try{
		const {id}=req.params;
     const deleteEvent= await pool.query("delete from events where eid=$1",[id]);
     res.json("Post deleted");
	}catch(err){
		console.error(err.message);
	}
});

app.post('/clubs/announcements',async(req,res)=>{
	try{
		const {title,desc,clubname}=req.body;
		const newPost= await pool.query("insert into announcements(an_title,an_category,an_desc,club_name)values($1,'/club',$2,$3) returning *",[title,desc,clubname]);
		res.json(newPost).rows;
		

	}catch(err){
		console.error(err.message);
	}
});

app.get('/clubs/announcements',async(req,res)=>{
	try{
     const allEvents= await pool.query("select * from announcements where an_category='/club'");
     res.json(allEvents.rows);
	}catch(err){
		console.error(err.message);
	}
});

//route to delete an announcement
app.delete('/clubs/announcements/:id',async(req,res)=>{
	try{
		const {id}=req.params;
     const deletePost= await pool.query("delete from announcements where an_id=$1",[id]);
     res.json("Post deleted");
	}catch(err){
		console.error(err.message);
	}
});

app.put('/clubs/announcements/:id',async(req,res)=>{
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