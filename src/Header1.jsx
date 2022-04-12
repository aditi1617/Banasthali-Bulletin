import React,{useState} from 'react';
import logo from './allimages/college_logo.jpg';
import {NavLink} from 'react-router-dom';
import './index.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';



const Header1 =({setAuth})=> {

  const [inputs,setInputs]=useState({
    userid:"",
    password:""
  });

  const {userid,password}=inputs;

  const onChange = e=>{
    setInputs({...inputs,[e.target.name]: e.target.value});
  }

  const onSubmitForm =async e=>{
    e.preventDefault();
    try{

      const body={userid,password};
      const response= await fetch('http://localhost:5000/auth/login',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(body)
      });

      const parseRes =await response.json();


      //if(parseRes.jwtToken){
        localStorage.setItem("token",parseRes.token);
        setAuth(true);    //prop
        //toast.success("logged in successfully");
      //}
      /*else{
        setAuth(false);
        //toast.error(parseRes);
      }*/



    }catch(err){
      console.error(err.message);
    }
  }

	return(
	<>	
       <header className="Header1">
        <img className="Logo" src={logo} height="80" alt="logo" />
        <div className="login-form">

          <form onSubmit={onSubmitForm}>
            User ID:<input className="login-input" type="text" name="userid" value={userid} onChange={e=> onChange(e)} />
            Password:<input className="login-input" type="password" name="password" value={password} onChange={e=> onChange(e)} />
            <button className="btn btn-primary btn-login" >Log in</button>
          </form>

        </div>
       </header>
    </>   
		)
}

export default Header1;