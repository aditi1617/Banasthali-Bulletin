import React,{useState,useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import {NavLink} from 'react-router-dom';


const Homeposts=({cat})=>{
  const [post,setPost]= useState([]);
  

   const getPosts= async()=>{
    try{
      const response= await fetch(`http://localhost:5000/home/announcements`);
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
  
  
  return(
       <>
       <div className="home-posts-container">
        <h4>Recent Announcements</h4>
       {post.map(p=>(
        <NavLink className="n2" to={p.an_category}>
        <div  key={p.an_id} className="home-post-container">
          
         <div className="post-utilities "> 
           <div className="home-post-title">
            <i class="fa-solid fa-thumbtack"></i> <h5>{p.an_title}</h5><span class="badge rounded-pill bg-info text-dark">new</span>
            
          </div>
          
          </div> 

         <div className="home-post-content">
            
             <p className="overflow-text">{p.an_desc}</p>
              
         </div>
         <hr/>
         </div>
        </NavLink>

        
        
        
        ))}

       
       
       </div>
       </>
		)
}

export default Homeposts;