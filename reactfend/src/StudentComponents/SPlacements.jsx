import React,{useState,useEffect} from 'react';
import Header from '../Header';
import NavbarS from '../NavbarS';
import Footer from '../Footer';
import Banner from '../Banner';
import placement from '../allimages/placement.jpg'
import Ticker1 from '../Ticker1';
import EventsS from './EventsS';
import PostsS from './PostsS';

const SPlacements=({setAuth})=>{

	   
	
	const [name,setName]=useState("")

	async function getName(){
	  
	   try{
	       const response=await fetch("http://localhost:5000/home",{
	           method:"GET",
	           headers:{token:localStorage.token}
	       })

	       const parseRes=await response.json()
	       setName(parseRes.name);

	   }catch(err){
	       console.error(err.message)
	   }
	}

	useEffect(()=>{
	   getName()
	},[])      //bracket to make only single request

	return(
		<>
		  <Header setAuth={setAuth} name={name} />
		  <NavbarS />
		  <Banner img={placement} text="Placement Bulletin"/>
		  <Ticker1 speed={10}/>
		  <div className="events-posts">
		    <EventsS category="placements" refreshto="splacements"/>
		    <PostsS category="placements" refreshto="splacements"/>
		    
		  </div>
		  
		  <Footer/>
		</>


       )
}

export default SPlacements;