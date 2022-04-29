import React,{useState,useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import EditPost from './EditPost';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import {NavLink} from 'react-router-dom';
import dp2 from './allimages/bv2.jpeg';


const Post=({category,refreshto})=>{
  const cat=category;
  const [post,setPost]= useState([]);
  const [file,setFile]=useState([]);

   

  const getPosts= async()=>{
    try{
      const response= await fetch(`http://localhost:5000/${category}/announcements`);
      const jsonData= await response.json();

      setPost(jsonData);

    }catch(err){
      console.error(err.message);
    }
  }

  const getFile = async()=>{
    try{
      const response= await fetch("http://localhost:5000/getfiles");
      const jsonData= await response.json();
     
      setFile(jsonData);
    }catch(err){
      console.error(err.message);
    }
  }


  useEffect(()=>{
    getPosts();
    getFile();
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
            <i class="fa-solid fa-thumbtack"></i><h4>{p.an_title}</h4>
            { category==="clubs" ?
              <h4 className="clubname">{p.club_name}</h4>
              :null
            }
          </div>
          <hr/>

        </div> 

         <div className="post-content">

            
              <p>{p.an_desc}</p>
              
            
            
         </div>

         {file.map(f=>(
             <div key={f.an_id}>
              { f.an_id==p.an_id ? (
               <div className="pdf-img">

                  { f.file_type!="image/png" ?
                  <div>
                   <i class="fa-solid fa-file"></i><a className="pdf-container" href={f.file_path}>{f.file_name}</a>
                  </div>
                  :null}
                
                  { f.file_type === "image/png" ?
                  <img className="post-img" src={f.file_path} height="400px" width="500px"/>
                   :null}
               </div>)
              :null }
             </div> 
             

          ))}
         
        

        
        </div>
        ))}


       </>
		)
}

export default Post;