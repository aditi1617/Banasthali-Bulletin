import React,{useState,useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const EventsS=({category,refreshto})=>{

  
  const [event,setEvent]= useState([]);
  const [date,setDate]=useState("");
  const [description,setDescription]=useState("");

  

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
               <td>{e.edate}</td>
               <td>{e.e_desc}</td>
               
              </tr>
              ))}
            
          </tbody>
        </table>
        </div>
        

       </div>
      </>
    )
}

export default EventsS;