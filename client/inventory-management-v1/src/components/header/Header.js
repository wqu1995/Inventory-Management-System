import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faVideoSlash} from "@fortawesome/free-solid-svg-icons";
import {Button} from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {NavLink} from "react-router-dom";
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" className="mb-3">
    <div >
      <Navbar.Brand href='/'>Animal figure Inc</Navbar.Brand>
    </div>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
        <Nav.Link as={Link} to="/warehouse">
          Warehouses
        </Nav.Link>
        <Nav.Link as={Link} to="/items">
          Figures
        </Nav.Link>
        <Nav.Link as={Link} to="/inventory">
          Stocks
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  )
}

export default Header