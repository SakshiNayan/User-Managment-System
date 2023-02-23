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
    const handleDelet=(_id)=>{
        //e.preventDefault()
        axios.delete(`http://localhost:7000/assign/removeTask/${_id}`).then((res)=>{
            const newData = taskDetail.filter((ele)=> ele._id != _id);
            setTaskDeatil(newData);
            console.log(res);
            window.alert(res.taskDetail.message)
        }).catch((err)=>{
            console.log(err.message)
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
                                                <td><img src="./images/trash3-fill.svg" alt="trash" onClick={handleDelet} /></td>

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