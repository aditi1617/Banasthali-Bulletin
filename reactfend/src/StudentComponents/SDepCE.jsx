import React,{useState,useEffect} from 'react';
import Header from '../Header';
import NavbarS from '../NavbarS';
import Footer from '../Footer';
import DBanner from '../DBanner';
import banner from '../allimages/depbanner.jpg';
import Ticker1 from '../Ticker1';
import EventsS from './EventsS';
import PostsS from './PostsS';

const SDepCE=({setAuth})=>{

	   
	
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
		  <DBanner img={banner} text="Chemical Engineering"/>
		  <Ticker1 speed={10}/>
		  <div className="events-posts">
		    <EventsS category="cedepartments" refreshto="sdepartments"/>
		    <PostsS category="cedepartments" refreshto="sdepartments"/>
		    
		  </div>
		  
		  <Footer/>
		</>


       )
}

export default SDepCE;