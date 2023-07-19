import { Navbar, Container, Nav, Dropdown, DropdownButton } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom"
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";

export const NavigationBar = ({ user, onLoggedOut, onSearch, searchQuery, handleSortOptionSelect, sortOptions, currentSortOption }) => {

    const location = useLocation();

    const isMovieOrProfileView = () => {
        return (
            location.pathname.includes("/movies/") || location.pathname === "/profile"
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
                                            className="me-2 mt-1 mb-1"
                                            aria-label="Search"
                                            value={searchQuery}
                                            onChange={(e) => {
                                                onSearch(e.target.value)
                                            }}
                                        />
                                    </Form>
                                )}

                                {!isMovieOrProfileView() && (

                                    <DropdownButton
                                        title="Sort By"
                                        onSelect={handleSortOptionSelect}
                                        className="sortButton mt-1 mb-1"
                                        align={"end"}
                                    >

                                        {sortOptions.map((option) => (
                                            <Dropdown.Item
                                                key={option.value}
                                                eventKey={option.value}
                                                active={currentSortOption === option.value}
                                                className="sortItems mt-1"
                                            >
                                                {option.label}
                                            </Dropdown.Item>
                                        ))}

                                    </DropdownButton>

                                )}

                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
};