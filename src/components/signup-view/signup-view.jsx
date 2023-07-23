import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FloatingLabel, Alert } from "react-bootstrap";

export const SignupView = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setBirthDate] = useState("");

    const [usernameValid, setUsernameValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [birthDateValid, setBirthDateValid] = useState(true);

    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);

    const validateFormUsername = () => {
        const isUsernameValid = username.length >= 5;
        setUsernameValid(isUsernameValid);
        return isUsernameValid;
    }

    const validateFormPassword = () => {
        const isPasswordValid = password.length >= 6;
        setPasswordValid(isPasswordValid);
        return isPasswordValid
    }

    const validateFormEmail = () => {
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        setEmailValid(isEmailValid);
        return isEmailValid;
    }

    const validateFormBirthDate = () => {
        const isBirthDateValid = birthDate !== "";
        setBirthDateValid(isBirthDateValid);
        return isBirthDateValid;
    }

    const validateFormConfirmPassword = () => {
        const isConfirmPasswordValid = confirmPassword === password;
        setConfirmPasswordValid(isConfirmPasswordValid);
        return isConfirmPasswordValid;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const isFormValid = validateFormUsername() && validateFormPassword() && validateFormEmail() && validateFormBirthDate() && validateFormConfirmPassword();

        if (isFormValid) {
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
                    alert("Signup successful, please login");
                    window.location.replace("/");
                } else {
                    alert("Signup failed");
                }
            })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    };


    return (

        <Form onSubmit={handleSubmit}>

            <Form.Label className="fs-3 fw-semibold mt-3 p-2 text-center loginLabels" style={{ width: "100%" }}>
                Register A New Account
            </Form.Label>

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
                        onBlur={validateFormUsername}
                        isInvalid={!usernameValid}
                        required
                        minLength={5}
                        aria-label="Username"
                        aria-invalid={!usernameValid}
                    />

                    <Form.Control.Feedback type="invalid">
                        Username must be at least 5 characters
                    </Form.Control.Feedback>

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
                        onBlur={validateFormPassword}
                        isInvalid={!passwordValid}
                        required
                        aria-label="Password"
                        aria-invalid={!passwordValid}
                    />

                    <Form.Control.Feedback type="invalid">
                        Password must be at least 6 characters
                    </Form.Control.Feedback>

                </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="confirmPassword">

                <FloatingLabel
                    controlId="confirmPassword"
                    label="Confirm Password"
                    className="mb-3"
                >
                    <Form.Control
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onBlur={validateFormConfirmPassword}
                        isInvalid={!confirmPasswordValid}
                        required
                        aria-label="Confirm Password"
                        aria-invalid={!confirmPasswordValid}
                    />

                    <Form.Control.Feedback type="invalid">
                        Passwords do not match
                    </Form.Control.Feedback>

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
                        onBlur={validateFormEmail}
                        isInvalid={!emailValid}
                        required
                        aria-label="Email"
                        aria-invalid={!emailValid}
                    />

                    <Form.Control.Feedback type="invalid">
                        Enter a valid email address
                    </Form.Control.Feedback>

                </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="signupBirthday">
                <FloatingLabel
                    controlId="signupBirthday"
                    label="Birthday"
                    className="mb-3"
                >
                    <Form.Control
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        onBlur={validateFormBirthDate}
                        isInvalid={!birthDateValid}
                        required
                        aria-label="Birthday"
                        aria-invalid={!birthDateValid}
                    />

                    <Form.Control.Feedback type="invalid">
                        Select your birthday
                    </Form.Control.Feedback>

                </FloatingLabel>
            </Form.Group>

            <Button className="mb-3 loginButton" type="submit">
                Submit
            </Button>

        </Form>
    );
};