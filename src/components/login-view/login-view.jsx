import React from "react";
import { useState } from "react";
import { FloatingLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            username: username,
            password: password
        };

        fetch("https://moviesapi-4d4b61d9048f.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {

                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token);
                    onLoggedIn(data.user, data.token);
                } else {
                    alert("No such user");
                }
            })
            .catch((e) => {
                alert("Something went wrong");
            });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Label className="fs-3 fw-semibold text-center mt-3 p-2 loginLabels" style={{ width: "100%" }}>Please Login</Form.Label>

            <Form.Group controlId="formUsername">
                <FloatingLabel
                    controlId="formUsername"
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

            <Form.Group controlId="formPassword">
                <FloatingLabel
                    controlId="formPassword"
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

            <Button className="loginButton mb-3" type="submit">
                Submit
            </Button>

        </Form>

    );
};