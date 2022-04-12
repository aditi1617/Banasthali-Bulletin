import React,{useState,useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';


const PostS=({category,refreshto})=>{
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
  
  
  return(
       <>
       
       {post.map(p=>(
        <div key={p.an_id} className="post-container">
         <div className="post-icons">
           
           
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

export default PostS;