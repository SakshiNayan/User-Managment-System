import React from 'react'
import { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import '../Register/style.css'
import axios from 'axios'
function LoginPg() {
  const navigate = useNavigate()
  const [login, setLogin] = useState({
    userName: "",
    email:"",
    password: ""
  })
  const [show , setshow]= useState(false)
  const handleLogin=(e)=>{
    e.preventDefault()            
    console.log(login)
    if(login.userName ==="" && login.password ===""){
        alert("User and password are requied")
    }
    else{
        axios({
          url: "http://localhost:7000/admin/login",
          method :"POST",
          headers:{

          },
          data:login
        }).then((loginData) => {
              console.log(loginData.data.userName)
                localStorage.setItem("authorization", loginData.data.authToken);
                localStorage.setItem("userName", loginData.data.userName)
              // navigate("/body");
              console.log(loginData.data.Usertype)
              if(loginData.data.Usertype === "Employee"){
                navigate("/EmpBody")
              }else{
                navigate("/body");
              }
        }).catch((err)=>{
          setshow(!show)
          setTimeout(()=>{
              setshow(!setshow)
          },2000)
          console.log(err)
      })
        setLogin({userName:"",email:"", password:""})
    }
  }
  return (
    <div className='body'>
        <div className='login-card'>
          <h1>LOGIN</h1>
          <form onSubmit={handleLogin} className='login-form'>
                <div className='field'>
                    <input type="text" required={true} onChange={(e) => { setLogin({ ...login, userName: e.target.value }) }}  placeholder='User Name'/>
                </div>
                <div className='field'>
                    <input type="text" required={true} onChange={(e) => { setLogin({ ...login, email: e.target.value }) }}  placeholder='Email'/>
                </div>
                <div className='field'>
                    <input type="password" required={true}  placeholder='Password' onChange={(e) => { setLogin({ ...login, password: e.target.value }) }}/>
                </div>
                <div className='field'>
                    <button type="submit" className='logBtn'>Login</button>
                </div>
                <div className='regisLink'>
                    <Link to='/register' className='linksource'>Register?</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default LoginPg