import React,{useState,useEffect} from 'react';
import Header from '../Header';
import NavbarS from '../NavbarS';
import Footer from '../Footer';
import Banner from '../Banner';
import Ticker1 from '../Ticker1';
import EventsS from './EventsS';
import PostsS from './PostsS';
import clubs from '../allimages/clubs.jpg';

const SClubs=({setAuth})=>{

	   
	
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
		  <Banner img={clubs}/>
		  <Ticker1 speed={10}/>
		  <div className="events-posts">
		    <EventsS category="clubs" refreshto="club"/>
		    <PostsS category="clubs" refreshto="club"/>
		    
		  </div>
		  
		  <Footer/>
		</>


       )
}

export default SClubs;