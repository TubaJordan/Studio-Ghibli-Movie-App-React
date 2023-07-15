import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, movies, onLoggedOut }) => {
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.email);
    const [birthDate, setBirthDate] = useState(user.birthDate);
    const [showModal, setShowModal] = useState(false);
    const favoriteMovies = movies.filter((movie) => {
        return user.favoriteMovies.includes(movie._id)
    });

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            username: username,
            password: password,
            email: email,
            birthDate: birthDate,
        };

        fetch(`https://moviesapi-4d4b61d9048f.herokuapp.com/users/${user.username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                alert("Success, please re-login")
                onLoggedOut()
            } else {
                alert("Update failed.")
            }
        });
    };

    const handleDeleteUser = () => {
        fetch(`https://moviesapi-4d4b61d9048f.herokuapp.com/users/${user.username}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }

        }).then((response) => {
            if (response.ok) {
                alert("Profile Delete sucessful")
                onLoggedOut();
            } else {
                alert("Something went wrong.")
            }
        })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <>
            <h1>Profile</h1>
            <Row>
                <Col>
                    <h3>Your profile details</h3>
                    <div>Username: {user.username}</div>
                    <div>Email: {user.email}</div>
                    <div>Birthday: {user.birthDate}</div>
                </Col>
                <Col>
                    <h3>Update your profile information here</h3>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group controlId="formUsername">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                minLength={5}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBirthday">
                            <Form.Label>Birthday:</Form.Label>
                            <Form.Control
                                type="date"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">Save changes</Button>

                    </Form>
                </Col>
            </Row>

            <Button variant="primary" onClick={handleShowModal}>
                Delete my account
            </Button>

            <Row>
                <h3>Favorite Movies:</h3>
                {favoriteMovies.map((movie) => (
                    <Col className="mb-5 smallCard" key={movie._id} md={4}>
                        <MovieCard movie={movie}></MovieCard>
                    </Col>
                ))}
            </Row>


            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete?</Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleDeleteUser}>Yes</Button>
                    <Button onClick={handleCloseModal}>No</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};