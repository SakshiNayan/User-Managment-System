import React, { useEffect, useState } from 'react'
import Sidebar from '../SideBar/sidebar';
import axios from 'axios';
//const userName = localStorage.getItem("userName");
function ManagerDetail() {
    const [users, setUser]=useState([])
    const authToken = localStorage.getItem("authorization");
    //console.log(authToken)
    //const count=0
    useEffect(()=>{
        axios({
            url:"http://localhost:7000/admin/userData",
            method:"GET",
            headers :{
                "Content-Type": "application/json",
                authorization : authToken
            }
        }).then((res)=>{
            setUser(res.data)
            //console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    return (
        <>
            <Sidebar/>
            <div style={{
                position:"absolute",
                left:"400px",
                top:"100px"
            }}>
                
                
                    <h1 style={{color:"blue"}}>Manager Details</h1>
                    <div style={{width:"600px", marginTop:"30px"}}>
                        <table className='table w-200 p-3'>
                            <thead>
                                <tr>
                                    <th>Serial No.</th>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>User Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users?.user?.map((item, idx)=>{
                                        console.log(item)
                                        return(
                                            <tr key={idx}>
                                                <td>{idx +1}</td>
                                                <td>{item.adminFullname}</td>
                                                <td>{item.email}</td>
                                                <td>{item.userName}</td>
                                            </tr>
                                        )
                                    })
                                }
                                
                            </tbody>
                        </table>
                    </div>
            </div>
        </>
      )
}

export default ManagerDetail