import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { IRoute } from "../../interface/IRoute/IRoute";

const AppNavBar = () => {

  const routerData = useSelector((state:any)=>state.routerReducer)


  return (
    <Navbar bg="light" expand="lg">
      <img src="https://image.freepik.com/free-vector/summer-vacation-icon-set_24640-44977.jpg" width="50px" height="50px"></img>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        {routerData
            .filter((element: IRoute) => element.isVisibale)
            .map((element: IRoute) => {
              const { name, path } = element;
              return <NavLink to={path} className="m-2" style={{color:"black",textDecoration:"none"}}>{name}</NavLink>;
            })}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    
  );
};

export default AppNavBar;
