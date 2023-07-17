import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom"

export const NavigationBar = ({ user, onLoggedOut, onSearch, searchQuery }) => {

    const location = useLocation();

    const isMovieOrProfileView = (id) => {

        console.log(id)
        return (
            location.pathname === `/movies/${id}` || location.pathname === "/profile"
        );
    };

    return (
        <Navbar expand="lg" className="navBar">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    NAME PLACEHOLDER
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="justify-content-end" style={{ width: "100%" }}>
                        {!user && (
                            <>
                                <Nav.Link as={Link} to="/login" className="text-right">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/signup" className="text-right">
                                    Signup
                                </Nav.Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/">
                                    Home
                                </Nav.Link>
                                <Nav.Link as={Link} to="/profile">
                                    Profile
                                </Nav.Link>
                                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>

                                {!isMovieOrProfileView() && (
                                    <Form className="d-flex">
                                        <Form.Control
                                            type="search"
                                            placeholder="Search"
                                            className="me-2"
                                            aria-label="Search"
                                            value={searchQuery}
                                            onChange={(e) => {
                                                console.log("Search query:", e.target.value);
                                                onSearch(e.target.value)
                                            }}
                                        />
                                    </Form>
                                )}


                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
};