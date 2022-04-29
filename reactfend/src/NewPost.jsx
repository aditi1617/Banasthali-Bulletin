import React,{useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const NewPost=({category,refreshto})=>{
  const [show, setShow] = useState(false);
  const [title,setTitle]=useState("");
  const [desc,setDesc]=useState("");
  const [file,setFile]=useState('');
  const [clubname,setClubname]=useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //for sending attached file
  const onSubmitFile=async() =>{
    //e.preventDefault();
    const formData= new FormData();
    formData.append('file',file);

    try{
      const res= await axios.post('http://localhost:5000/file',formData,{
        headers:{
          'Content-Type':'multipart/form-data'
        }
      })

    }catch(err){
      console.error(err.message);
    }

  }

 const testf=()=>{
   console.log("second function called");
 }

 const onSubmitForm=async()=>{
   //e.preventDefault();    //to prevent refreshing
   try{
     const body={title,desc,clubname};
     const response=await fetch(`http://localhost:5000/${category}/announcements`,{
       method:"POST",
       headers:{"Content-Type":"application/json"},
       body:JSON.stringify(body)
     });
     window.location=`${refreshto}`;
     
   }catch(err){
     console.error(err.message);
   }

 }

 const handleboth=(e)=>{
  e.preventDefault();
  
  onSubmitForm();
  onSubmitFile();
  testf();
 }
  

  //<button className="btn btn-file" type="button" onClick={handleShow}>Attach a file</button>
   return(
     <>
      <div className="container newpost-container">
       <div className="mb-3">
        <form onSubmit={handleboth}>

         <label for="exampleFormControlTextarea1" className="form-label mt-2"><h5>Post a new Announcement</h5></label><br/>
         <input className="form-control bg-transparent" type="text" placeholder="Enter title"
                value={title} onChange={e=> setTitle(e.target.value)} name="title"/>
          { category==="clubs" ?
            <div>
            <input className="form-control bg-transparent mt-2" type="text" placeholder="Enter Club Name"
                value={clubname} onChange={e=> setClubname(e.target.value)} name="clubname"/>
            </div>
            :null
          }
         <textarea className="form-control bg-transparent textarea" id="exampleFormControlTextarea1" 
                    value={desc} onChange={e=> setDesc(e.target.value)} name="desc">
         </textarea>
         <div className="mb-3">
           <input className="form-control mt-3 bg-transparent" type="file" id="formFile" onChange={e=> setFile(e.target.files[0])}/>
         </div>
        <div className="form-buttons">
         
         <button className="btn btn-post" type="submit">Post</button>
        </div>
        </form>
        </div> 
       </div>

       <Modal show={show} onHide={handleClose}>
         <Modal.Header closeButton>
           <Modal.Title>Choose a file</Modal.Title>
         </Modal.Header>
         <Modal.Body>
          <form >
           
             <input type="submit" value="Attach" className="btn btn-primary" />
          </form>
         </Modal.Body>
         <Modal.Footer>
           <Button variant="secondary" onClick={handleClose}>
             Close
           </Button>
           
           
         </Modal.Footer>
       </Modal>
     </>
   	)

}

export default NewPost;