import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import { MovieCard } from "../movie-card/movie-card";
import { FloatingLabel, ModalTitle } from "react-bootstrap";


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


    const getMonthInWords = (monthNumber) => {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return months[monthNumber - 1] || "";
    };
    const getDayInWords = (dayNumber) => {
        if (dayNumber < 1 || dayNumber > 31) return "";
        const suffixes = ["st", "nd", "rd"];
        const day = dayNumber <= 20 ? dayNumber : dayNumber % 10;
        return day + (suffixes[day - 1] || "th");
    }
    const newDate = new Date(user.birthDate);
    const formattedDate = `${getMonthInWords(newDate.getUTCMonth() + 1)} ${getDayInWords(newDate.getUTCDate())}, ${newDate.getUTCFullYear()}`;


    return (
        <>
            <h1 className="text-center fancyText mb-3 profileBanner">Profile</h1>
            <Row className="profileWrap">
                <Col className="profileDetails">
                    <h3 className="mt-3 pt-3 pb-3 fancyText profileBorders text-center">Your profile details</h3>
                    <div className="detailsText mt-3"><span className="fw-bold">&#129497; Username:</span> {user.username}</div>
                    <div className="detailsText pt-3"><span className="fw-bold">&#128221; Email:</span> {user.email}</div>
                    <div className="detailsText pt-3"><span className="fw-bold">&#128197; Birthday:</span> {formattedDate}</div>
                    <Button onClick={handleShowModal} className="deleteButton mt-3">
                        Delete my account
                    </Button>
                </Col>
                <Col className="updateProfile">
                    <h3 className="mt-3 mb-3 pt-3 pb-3 fancyText profileBorders text-center">Update your information</h3>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group controlId="updateUsername">
                            <FloatingLabel
                                controlId="updateUsername"
                                label="Username"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    minLength={5}
                                />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group controlId="updatePassword">
                            <FloatingLabel
                                controlId="updatePassword"
                                label="Password"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group controlId="updateEmail">
                            <FloatingLabel
                                controlId="updateEmail"
                                label="Email"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group controlId="updateBirthday">
                            <FloatingLabel
                                controlId="updateBirthday"
                                label="Birthday"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="date"
                                    value={birthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                    required
                                />
                            </FloatingLabel>
                        </Form.Group>

                        <Button className="mb-3 saveButton" type="submit">Save changes</Button>

                    </Form>
                </Col>
            </Row>



            <Row className="cardContainer">
                <h3 className="mt-5 mb-3 fancyText text-center favMovies">Favorite Movies</h3>
                {favoriteMovies.map((movie) => (
                    <Col className="mb-5 smallCard" key={movie._id} md={4}>
                        <MovieCard movie={movie}></MovieCard>
                    </Col>
                ))}
            </Row>


            <Modal show={showModal} onHide={handleCloseModal} className="modalContainer">
                <div className="modalBorder">
                    <Modal.Header closeButton className="modalHead">
                        <Modal.Title className="modalTitle pt-2 pb-2">Delete Account</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="modalMiddle mb-3">Are you sure you want to delete?</Modal.Body>

                    <Modal.Footer className="modalFooter">
                        <Button onClick={handleDeleteUser} className="modalButton">Yes</Button>
                        <Button onClick={handleCloseModal} className="modalButton">No</Button>
                    </Modal.Footer>
                </div>
            </Modal>
        </>
    );
};