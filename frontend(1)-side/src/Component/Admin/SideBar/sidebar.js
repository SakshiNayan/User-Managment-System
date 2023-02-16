import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
const userName = localStorage.getItem("userName");

const Sidebar = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial',fontSize:"2vh" }}>
      <CDBSidebar textColor="#ff8533" backgroundColor="#000033" maxWidth='300px'>
        <CDBSidebarHeader>
          <div style={{
            marginLeft:"70px",
            marginBottom:"30px"
          }} ><img src="./images/avatar (1).svg" alt="avatra"  style={{
            width:"100px"
          }}/></div>
            <div style={{
              textAlign:"center",
              width:"250px",
              fontSize:"3vh"
            }}>{userName}</div>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/body" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns" >Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/taskDetail" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Task</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/emp-data" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">User page</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <NavLink exact to="/" activeClassName="activeClicked" style={{ color:"#ff8533", fontWeight:"bold"}}>
        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '60px',
              fontSize: 'larger'
            }}
          >
            LOGOUT
          </div>
        </CDBSidebarFooter>
        </NavLink>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;