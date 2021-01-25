import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const Header = ({ brand, authComponent }) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">{brand}</Navbar.Brand>
      <Nav className="mr-auto"></Nav>
      <Nav className="justify-content-end">
        <Nav.Link>{authComponent}</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Header;
