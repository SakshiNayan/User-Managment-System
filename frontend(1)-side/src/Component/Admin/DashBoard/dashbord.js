import React from 'react'
import './dashbord.css'
import Sidebar from '../SideBar/sidebar'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function Dashbord() {
  return (
    <div>
        <Sidebar/>
        <div className='card-area'>
            <div className='card-container'>
                <Link to="/emp-data" style={{ textDecoration: 'none' }}><div className='card-div'>
                <Card style={{ 
                    width: '27rem' ,
                    height:'24rem' , 
                    // backgroundColor:"#F99A36",
                    backgroundImage: "linear-gradient(to bottom right,rgb(160, 163, 255), rgb(255, 199, 199))",
                    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.295)",
                    transition:"all 0.3s ease"}}>
                <Card.Img variant="top" src="./images/avatar (3).svg" style={{width:"150px", marginLeft:"140px", marginTop:"20px"}} />
                <Card.Body style={{textAlign:"center",color:"grey", paddingTop:"50px" }}>
                    <Card.Title style={{fontSize:"4.5vh"}}> EMPLOYEE</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted" style={{fontSize:"3.5vh"}}>DETAILS</Card.Subtitle>
                    
                </Card.Body>
                </Card>
                </div></Link>
                <Link to="/manager-data" style={{ textDecoration: 'none' }}><div className='card-div'>
                <Card style={{ 
                    width: '27rem', 
                    height:'24rem', 
                    // backgroundColor:"#F99A36" ,
                    backgroundImage: "linear-gradient( to bottom right,rgb(247, 239, 170), rgb(233, 122, 122))",
                    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.295)"}}>
                <Card.Img variant="top" src="./images/avatar (3).svg"  style={{width:"150px", marginLeft:"140px", marginTop:"20px", }} />
                <Card.Body style={{textAlign:"center",color:"grey", paddingTop:"50px"}}>
                    <Card.Title style={{fontSize:"4.5vh"}}>MANAGER</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted" style={{fontSize:"3.5vh"}}>DETAILS</Card.Subtitle>
                </Card.Body>
                </Card>
                </div></Link>
            </div>
        </div>
    </div>
  )
}

export default Dashbord