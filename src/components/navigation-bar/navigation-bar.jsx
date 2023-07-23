import { Navbar, Container, Nav, Dropdown, DropdownButton } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useLocation } from "react-router-dom"
import topLogo from "./top-logo.png";


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

                <Navbar.Brand as={Link} to="/" className="logoBrand" title="Ghibli Movie Collection">
                    <img src={topLogo} alt="Ghibli Movie Collection Logo" className="navBarImg" role="img" aria-label="Ghibli Movie Collection Logo" />
                    <span className="logoHeader">Ghibli Movie Collection</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="justify-content-end" style={{ width: "100%" }}>
                        {!user && (
                            <>
                                <Nav.Link as={Link} to="/login" className="text-right navBarItem" role="link" title="Login">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/signup" className="text-right navBarItem" role="link" title="Signup">
                                    Signup
                                </Nav.Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/" className="navBarItem" role="link" title="Home">
                                    Home
                                </Nav.Link>
                                <Nav.Link as={Link} to="/profile" className="navBarItem" role="link" title="Profile">
                                    Profile
                                </Nav.Link>
                                <Nav.Link onClick={onLoggedOut} className="navBarItem" role="button" title="Logout">
                                    Logout
                                </Nav.Link>

                                {!isMovieOrProfileView() && (
                                    <Form className="d-flex">
                                        <Form.Control
                                            type="search"
                                            placeholder="Search"
                                            className="me-2 mt-1 mb-1"
                                            aria-label="Search"
                                            role="search"
                                            value={searchQuery}
                                            onChange={(e) => {
                                                onSearch(e.target.value)
                                            }}
                                            title="Search For A Movie By Title"
                                        />
                                    </Form>
                                )}

                                {!isMovieOrProfileView() && (

                                    <DropdownButton
                                        title="Sort By"
                                        onSelect={handleSortOptionSelect}
                                        className="sortButton mt-1 mb-1"
                                        align={"end"}
                                        role="button"
                                    >

                                        {sortOptions.map((option) => (
                                            <Dropdown.Item
                                                key={option.value}
                                                eventKey={option.value}
                                                active={currentSortOption === option.value}
                                                className="sortItems mt-1"
                                                role="menuitem"
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