import React,{useState,useEffect} from 'react';
import Header from '../Header';
import NavbarS from '../NavbarS';
import Footer from '../Footer';
import Banner from '../Banner';
import Ticker1 from '../Ticker1';
import EventsS from './EventsS';
import PostsS from './PostsS';

const SClubs=({setAuth})=>{

	   const setAuth1=boolean=> {
	     setAuth(boolean);
	 } 
	
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
		  <Header setAuth={setAuth1} name={name} />
		  <NavbarS />
		  <Banner />
		  <Ticker1 speed={10}/>
		  <div className="events-posts">
		    <EventsS category="clubs" refreshto="sclubs"/>
		    <PostsS category="clubs" refreshto="sclubs"/>
		    
		  </div>
		  
		  <Footer/>
		</>


       )
}

export default SClubs;