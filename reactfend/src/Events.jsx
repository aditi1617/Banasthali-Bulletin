import React,{useState,useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Events=({category,refreshto})=>{

  const [show, setShow] = useState(false);
  const [event,setEvent]= useState([]);
  const [date,setDate]=useState("");
  const [description,setDescription]=useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getEvents= async()=>{
    try{
      const response= await fetch(`http://localhost:5000/${category}/events`);
      const jsonData= await response.json();

      setEvent(jsonData);

    }catch(err){
      console.error(err.message);
    }
  }

  useEffect(()=>{
    getEvents();
  },[]);

  const onSubmitForm=async(e)=>{
    e.preventDefault();    //to prevent refreshing
    try{
      const body={date,description};
      const response=await fetch(`http://localhost:5000/${category}/events`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(body)
      });
      window.location=`${refreshto}`;
      
    }catch(err){
      console.error(err.message);
    }

  }

  const deleteEvent=async(id)=>{
    try{
     const deleteEvent= await fetch(`http://localhost:5000/${category}/events/${id}`,{
      method:"DELETE"
     })

     setEvent(event.filter(e=>e.eid!==id));        //to delete from page instantly without refreshing
    }catch(err){
      console.error(err.message);
    }
  }

	return(
      <>
       <div className="event-container">
        <div className="event-heading">
          <h5>Important Dates/Events</h5>
        </div>
       <div className="table-responsive">
        <table class="table table-borderless table-hover">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {event.map(e=>(
              <tr key={e.eid}>
               <td className="table-color">{e.edate}</td>
               <td className="table-color">{e.e_desc}</td>
               <td><i className="fa-solid fa-trash-can" onClick={()=>deleteEvent(e.eid)} ></i></td>
              </tr>
              ))}
            
          </tbody>
        </table>
        </div>
        <button className="btn btn-primary btn-event" onClick={handleShow}>Add event</button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <form onSubmit={onSubmitForm}>
            <input type="text" placeholder="Date" value={date} 
                   onChange={e=> setDate(e.target.value)} name="date"/>&emsp;
            <input type="text" placeholder="Description" value={description} 
                   onChange={e=> setDescription(e.target.value)} name="description"/>
            <Button variant="primary" type="submit" value="Submit">
              Add
            </Button>
           </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            
            
          </Modal.Footer>
        </Modal>

       </div>
      </>
		)
}

export default Events;