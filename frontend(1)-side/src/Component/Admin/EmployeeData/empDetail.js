import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Sidebar from '../SideBar/sidebar'
import EmpTableData from './empTable';
import axios from 'axios';
function EmpDetail() {
    const Navigate = useNavigate()
    //const [modal, setmodal] = useState(false)
    const [empdetails,setEmpdetails]=useState({
        full_name:"",
        emp_name :"",
        emp_email :"",
    });
    const [dataEmployee, setData] =useState([])
    useEffect(()=>{
        axios.get("http://localhost:7000/emp/empData").then((response)=>{
            setData(response.data)
        })
    },[])

    const handleEmpAdd =()=>{
        // e.preventDefault();
        if(empdetails.full_name ==="" && empdetails.emp_name ==="" && empdetails.emp_email===""){
            alert("All fields Are Required!")
        }
        else{
            axios({
                url:"http://localhost:7000/emp/addEmp",
                method: "POST",

                data : empdetails
            }).then((post)=>{
                Navigate('/emp-data')
            }).catch((err)=>{console.log(err)})
            console.log(empdetails)
            setEmpdetails({full_name:"", emp_name:"", emp_email:""})
        }
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
                
                {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
            Add New Employee
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content" style={{fontWeight:"bold"}}>
                <div className="modal-header">
                    <h3 className="modal-title" id="exampleModalLabel" style={{color:"blue"}}>Add Employee</h3>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{background:"white", width:"100px" , marginTop:"-10px"}}>
                    <span aria-hidden="true" style={{color:"black" ,fontSize:"2vw"}}>&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleEmpAdd}>
                        <div>
                            <label htmlFor="name">Employee Name</label>
                            <input type="text"  
                                className='form-control' 
                                placeholder='full name' 
                                onChange={(e) => { setEmpdetails({ ...empdetails, full_name: e.target.value }) }}
                                />
                        </div>
                        <div>
                            <label htmlFor="name">Employee User</label>
                            <input type="text"  
                                className='form-control' 
                                name="emp_name"
                                placeholder='User name' 
                                onChange={(e) => { setEmpdetails({ ...empdetails, emp_name: e.target.value }) }}
                                />
                        </div>
                        <div>
                            <label htmlFor="name">Email I'D</label>
                            <input type="text"  
                                className='form-control' 
                                name="emp_email"
                                placeholder='email' 
                                onChange={(e) => { setEmpdetails({ ...empdetails, emp_email: e.target.value }) }}
                                />
                        </div>
                        <button type="submit" className="close" aria-label="Close">Submit</button>
                    </form>
                </div>
                
                </div>
            </div>
            </div>

            </div>
            <div style={{width:"800px"}}>
                <h2 style={{fontWeight:"bold", fontSize:"2vw"}}>Employee Details</h2>
                <div style={{marginTop:"30px"}}>
                    <EmpTableData dataEmployee={dataEmployee}/>
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default EmpDetail