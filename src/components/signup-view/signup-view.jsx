import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FloatingLabel } from "react-bootstrap";

export const SignupView = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setBirthDate] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            username: username,
            password: password,
            email: email,
            birthDate: birthDate
        };

        fetch("https://moviesapi-4d4b61d9048f.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Signup successful");
                window.location.reload();
            } else {
                alert("Signup failed");
            }
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Label className="fs-3 fw-semibold mt-3 text-center" style={{ width: "100%" }}>Register A New Account</Form.Label>

            <Form.Group controlId="signupUsername">
                <FloatingLabel
                    controlId="signupUsername"
                    label="Username"
                    className="mb-3"
                >
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength={3}
                    />
                </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="signupPassword">
                <FloatingLabel
                    controlId="signupPassword"
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

            <Form.Group controlId="signupEmail">
                <FloatingLabel
                    controlId="signupEmail"
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

            <Form.Group controlId="signupEmail">
                {/* <Form.Label>Birthday:</Form.Label> */}
                <FloatingLabel
                    controlId="signupEmail"
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

            <Button variant="primary" type="submit">
                Submit
            </Button>

        </Form>

    );
};