import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
function EmpTableData({dataEmployee}) {
    //console.log(dataEmployee)
    const handleDelete=(_id)=>{
        axios.delete(`http://localhost:7000/emp/remove-emp/${_id}`).then((res)=>{
            console.log(res)
            window.alert(res.data.message)
        }).catch((err)=>{
            console.log(err)
        })
    }
  return (
    <>
    <table class="table table-condensed">
            <thead class="thead-dark">
                <tr>
                    <th>Serial No.</th>
                    <th>Full Name</th>
                    <th>Email Address</th>
                    <th>User Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {
                dataEmployee?.data?.map((item, index)=>{
                    console.log(item)
                    return(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.full_name}</td>
                            <td>{item.emp_email}</td>
                            <td>{item.emp_name}</td>
                            <td><img src="./images/trash3-fill.svg" alt="del" onClick={handleDelete} /></td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
        </>
  )
}

export default EmpTableData