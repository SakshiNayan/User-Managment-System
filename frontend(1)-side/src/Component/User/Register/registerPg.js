import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css'

function RegisterPg() {
  const [show,setshow]=useState(false)
    const[usererr,setuserError] = useState("user-false")
  const navigate = useNavigate()
  const [data, setData] = useState({
    userName: "",
    adminFullname:"",
    email:"",
    password: ""
  })
  const [confirmpass, setconfirmPass]= useState({confirmPassword: ""});

  const handleRegister =(e)=>{
    e.preventDefault();
    if(!data.userName || !data.password || !confirmpass.confirmPassword){
        window.alert("Please provide All details !");
        return;
    }
    else if(confirmpass.confirmPassword !== data.password){
        window.alert("Passdword does not Matched");
        return;
    }else{
      axios({
        // url: "https://todo-server-pg.herokuapp.com/userRegister/register",
        url: "http://localhost:7000/admin/register",
        method: "POST",
        headers: {
        },
        data: data
      }).then((res) => {
        console.log(res);
        navigate("/");
      }).catch((err) => {
        if(err.response.data ==="User-Exist"){
          setuserError("user-true")
          alert("User Name already exist")
          setshow(!show)
          setTimeout(()=>{
              setshow(!setshow)
          },2000)
          console.log(err);
      }
    })
    }
    setData({userName:"",adminFullname:"",email:"", password:"", confirmpassword:""})
  }

    
  
  
  return(
    <div className='body'>
    <div className='regis-card'>
      <h1>REGISTER</h1>
      <form onSubmit={handleRegister} className='form-r'>
                <div className='field'>
                    <input type="text" required={true} placeholder='User Name'  onChange={(e)=>{setData({...data, userName: e.target.value})}}/>
                </div>
                <div className='field'>
                    <input type="text" required={true} placeholder='Full Name'  onChange={(e)=>{setData({...data, adminFullname: e.target.value})}}/>
                </div>
                <div className='field'>
                    <input type="text" required={true} placeholder='Email'  onChange={(e)=>{setData({...data, email: e.target.value})}}/>
                </div>
                <div className='field'>
                    <input type="password" required={true} placeholder='Password'  onChange={(e)=>{setData({...data, password: e.target.value})}}/>
                </div>
                <div className='field'>
                    <input type="password" required={true}  placeholder='Confirm-Pass' onChange={(e)=>{setconfirmPass({...confirmpass, confirmPassword: e.target.value})}}/>
                </div >
                <div className='field'>
                    <button type="submit" className='regBtn'>Register</button>
                </div>
                <Link to='/' className='linksource'>Member LogIn?</Link>
            </form>

    </div>
    </div>
  )

  } 
export default RegisterPg