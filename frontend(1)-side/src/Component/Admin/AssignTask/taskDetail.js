import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Sidebar from '../SideBar/sidebar'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
function TaskDetail() {
    const Navigate = useNavigate()
    const [empDta , setempDta] = useState([])
    const [taskData , setTaskData] = useState({
        title:"",
        description :"",
        Name :"",
        status:"",
        startTime :"",
        endTime :"",
    })
    const [taskDetail , setTaskDeatil] =useState([]);
    useEffect(()=>{
        axios.get("http://localhost:7000/assign/task-data").then((response)=>{
            setTaskDeatil(response.data)
            // console.log(response.data)
        })
    },[])
    useEffect(()=>{
        axios.get("http://localhost:7000/emp/empData").then((res)=>{
            setempDta(res.data)
            //console.log(res.data)
        })
    },[])
    const handleTaskAdd =()=>{
        // e.preventDefault();
        if(taskData.title ==="" && taskData.description ==="" && taskData.Name ==="" && taskData.status === "" && taskData.startTime ==="" && taskData.endTime===""){
            alert("All fields are Required !")
        } else{
            axios({
                url:"http://localhost:7000/assign/addTask",
                method: "POST",
                // headers :{

                // },
                data : taskData
            }).then((post)=>{
                Navigate('/taskDetail')
            }).catch((err)=>{console.log(err)})
            // console.log(taskData)
            setTaskData({title:"",
                description :"",
                Name :"",
                status:"",
                startTime :"",
                endTime :"",})

        }
    }
    const handleDelet=()=>{
        axios.delete(`http://localhost:7000/assign/removeTask/${taskDetail._id}`).then((res)=>{
            console.log(res);
            window.alert(res.data.message)
        }).catch((err)=>{
            console.log(err)
        })
    }
    return (
        <>
            <Sidebar/>
            <div style={{
                position:"absolute",
                left:"400px",
                top:"100px"
            }}>
                <div>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
            Assign New Task
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content w-200 p-3" style={{fontWeight:"bold"}} >
                <div className="modal-header">
                    <h3 className="modal-title" id="exampleModalLabel" style={{color:"blue"}}>Task Assignment</h3>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{background:"white", width:"100px" , marginTop:"-10px"}}>
                    <span aria-hidden="true" style={{color:"black" ,fontSize:"2vw"}}>&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleTaskAdd}>
                        <div>
                            <label htmlFor="name" >Task Title :</label>
                            <input type="text"  
                                className='form-control' 
                                placeholder='title' 
                                onChange={(e) => { setTaskData({ ...taskData, title: e.target.value }) }}
                                />
                        </div>
                        <div>
                            <label htmlFor="name">Task Description :</label>
                            <textarea row="10" cols="50"  
                                className='form-control' 
                                placeholder='Description...' 
                                onChange={(e) => { setTaskData({ ...taskData, description: e.target.value }) }}
                                />
                        </div>
                        <div>
                            <label htmlFor="name">Employee Name :</label>
                                <select  onChange={(e)=>{setTaskData({...taskData, Name:e.target.value})}}>
                                    <option>--select--</option>
                                    {
                                        empDta?.data?.map((user,id)=>{
                                            return(
                                                <option key={id}>{user.full_name}</option>
                                            )
                                        })
                                    }
                                </select>
                        </div>
                        <div>
                            <label htmlFor="name">Start Time :</label>
                            <input type="datetime-local"  
                                className='form-control' 
                                onChange={(e) => { setTaskData({ ...taskData, startTime: e.target.value }) }}
                                />
                        </div>
                        <div>
                            <label htmlFor="name">End Time :</label>
                            <input type="datetime-local"  
                                className='form-control' 
                                onChange={(e) => { setTaskData({ ...taskData, endTime: e.target.value }) }}
                                />
                        </div>
                        <div>
                            <label htmlFor="name">Status :</label>
                            <input type='radio'  value='Active' onChange={(e)=> {setTaskData({...taskData, status:e.target.value})}} style={{width:"20px" , marginLeft:"20px"}} />Active
                            <input type='radio'  value='Inactive' onChange={(e)=> {setTaskData({...taskData, status:e.target.value})}} style={{width:"20px",marginLeft:"20px"}} />Inactive
                        </div>

                        <button type="submit" className="close" aria-label="Close" >Submit</button>
                    </form>
                </div>
                
                </div>
            </div>
            </div>
                </div>
                <div>
                    <h2 style={{fontWeight:"bold", fontSize:"2vw"}}>Task Details</h2>
                    <div style={{width:"1200px", marginTop:"30px"}}>
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
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    taskDetail?.data?.map((item,id)=>{
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
                                                <td onClick={()=>handleDelet()}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                                </svg></td>

                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
      )
}

export default TaskDetail