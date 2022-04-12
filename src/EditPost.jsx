import React,{useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';




const EditPost=({p,category,refreshto})=>{

  const [lgShow, setLgShow] = useState(false);
  const [editPost,setEditPost]= useState(p.an_desc);
  

  const updatePost= async e=>{
    e.preventDefault();
    try{

      const body={editPost};
      const response= await fetch(`http://localhost:5000/${category}/announcements/${p.an_id}`,{
        method:"PUT",
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
           <i className="fa-solid fa-pen-to-square" onClick={() => setLgShow(true)}> </i>
           <Modal
                   size="lg"
                   show={lgShow}
                   onHide={() => setLgShow(false)}
                   aria-labelledby="example-modal-sizes-title-lg"
                   id={`id${p.an_id}`}
                 >
                   <Modal.Header closeButton>
                     <Modal.Title id="example-modal-sizes-title-lg">
                       {p.an_title}
                     </Modal.Title>
                   </Modal.Header>
                   <Modal.Body>
                    <form onSubmit={updatePost}>
                     <div className="form-group">
                         
                         <textarea className="form-control" 
                                   id="exampleFormControlTextarea1" 
                                   rows="3"
                                   value={editPost}
                                   onChange={e=>setEditPost(e.target.value)}
                                   name="editPost"
                                   >
                         </textarea>
                         
                        
                         <button type="submit" value="Submit" className="btn btn-primary mt-2 float-end ">
                           Edit
                         </button>
                         
                      </div>
                     </form>
                   </Modal.Body>
                 </Modal>

           
           
		</>


		)
}

export default EditPost;