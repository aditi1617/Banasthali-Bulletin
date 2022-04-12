import React,{useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const NewPost=({category,refreshto})=>{
  const [show, setShow] = useState(false);
  const [title,setTitle]=useState("");
  const [desc,setDesc]=useState("");
  const [file,setNotice]=useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //for sending attached file
  const onSubmitNotice=async(e)=>{
    e.preventDefault();
    try{
      const data= new FormData();
      data.append('notice',file)

      const response= await fetch('http://localhost:5000/notices',{
        method:"POST",
        body:data,
      });
      window.location=`${refreshto}`;

    }catch(err){
      console.error(err.message);
    }
    

  }

  const onSubmitForm=async(e)=>{
    e.preventDefault();    //to prevent refreshing
    try{
      const body={title,desc};
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
   return(
     <>
      <div className="container newpost-container">
       <div className="mb-3">
        <form onSubmit={onSubmitForm}>

         <label for="exampleFormControlTextarea1" className="form-label mt-2"><h5>Post a new Announcement</h5></label><br/>
         <input className="form-control bg-transparent" type="text" placeholder="Enter title"
                value={title} onChange={e=> setTitle(e.target.value)} name="title"/>
         <textarea className="form-control bg-transparent textarea" id="exampleFormControlTextarea1" 
                    value={desc} onChange={e=> setDesc(e.target.value)} name="desc">
         </textarea>
        <div className="form-buttons">
         <button className="btn btn-file" type="button" onClick={handleShow}>Attach a file</button>
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
          <form onSubmit={onSubmitNotice}>
           <div class="form-group">
              
               <input type="file" name="notice" value={file}
                      className="form-control" id="formFile" />
             </div>
               <button type="submit" className="btn btn-primary">Attach</button>
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