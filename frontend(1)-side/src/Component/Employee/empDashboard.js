import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";

function EmpDashboard() {
    const [emptaskData , setempTaskData] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:7000/assign/task-data").then((response)=>{
            setempTaskData(response.data)
            // console.log(response.data)
        })
    },[])
  return (
    <div><h2>Wellcome to Employee DashBoard</h2>
    <Link to={'/'}><button className="btn_con">LOG OUT</button></Link>
    <div>
        <table class="table table-striped">
            <thead class="thead-dark">
                <tr>
                    <th>Serial No.</th>
                    <th>Employee Name</th>
                    <th> Title</th>
                    <th>Task Description</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    emptaskData?.data?.map((item,id)=>{
                        // console.log(item)
                        return(
                            <tr key={id} >
                                <td>{id+1}</td>
                                <td>{item.Name}</td>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td>{item.startTime}</td>
                                <td>{item.endTime}</td>
                                <td>{item.status}</td>

                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
        
    </div>

  )
}

export default EmpDashboard