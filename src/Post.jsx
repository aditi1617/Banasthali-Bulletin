import React,{useState,useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import EditPost from './EditPost';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';



const Post=({category,refreshto})=>{
  const cat=category;
  const [post,setPost]= useState([]);
  

   

  const getPosts= async()=>{
    try{
      const response= await fetch(`http://localhost:5000/${category}/announcements`);
      const jsonData= await response.json();

      setPost(jsonData);

    }catch(err){
      console.error(err.message);
    }
  }

  useEffect(()=>{
    getPosts();
  },[]);

  //const [editpost,setEditpost]=useState(p.an_desc);
  
  
 const deletePost=async(id)=>{
    try{
     const deletePost= await fetch(`http://localhost:5000/${category}/announcements/${id}`,{
      method:"DELETE"
     })

     setPost(post.filter(p=>p.an_id!==id));        //to delete from page instantly without refreshing
    }catch(err){
      console.error(err.message);
    }
  }


	return(
       <>
       
       {post.map(p=>(
        <div key={p.an_id} className="post-container">
         <div className="post-icons">
           <EditPost p={p} category={cat} refreshto={refreshto}/>
           <i className="fa-solid fa-trash-can" onClick={()=>deletePost(p.an_id)} ></i>
          </div>
         <div className="post-utilities "> 
           <div className="post-title">
            <h4>{p.an_title}</h4>
            <hr/>
          </div>
          

        </div> 

         <div className="post-content">

            
              <p>{p.an_desc}</p>
              
            
            
         </div>
         
        

        
        </div>
        ))}

       
       

       </>
		)
}

export default Post;