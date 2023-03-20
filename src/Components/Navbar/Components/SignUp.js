import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* bootstap styling */
import Form from 'react-bootstrap/Form';
import { Container, Row, Col, Button } from "react-bootstrap";

/* images */
import signup from "../../../assets/imgs/signup.png";
import googlesign from "../../../assets/imgs/google.png";

/* firebase */
import { auth, providerGoogle, userInfo } from "../../../firebase/FirebaseConfiq";
import { signInWithPopup, createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

/*pages and components */
import GeneralModal from "../../GeneralModal";


export default function SignUp() {
    const navigate = useNavigate();
    const [errorModal, setErrorModal] = useState(false);
    const [form, setForm] = useState({
        fullname: "",
        email: "",
        password: ""
    })
    // handle google sign up authentication
    const signinGoogle = () => {
        signInWithPopup(auth, providerGoogle)
            .then((res) => {
                localStorage.setItem("token", res.user.refreshToken)
                navigate("/")
            })
            .catch((err) => console.log(err))
    }
    // handle submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        // validation of form
        if (form.fullname === "" || form.email === "" || form.password === "") {
            setErrorModal(true)
        }
        // handle email/password authentication on farebase
        const auth =getAuth();
        createUserWithEmailAndPassword(auth, form.email, form.password)
        .then((userCredentials)=>{
            console.log(userCredentials.user);
            navigate("/")
        })
        .catch((err)=>{
            console.log(err.message);
        })
    }
    return (
        <Container className="my-5" style={{ backgroundColor: "cornsilk" }}>
            <Row className="justify-content-center">
                <Col>
                    <h3 className="text-center my-2"> Sign Up</h3>
                    <Form>
                        <Form.Group className="mb-2" controlId="fullname">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                value={form.fullname}
                                onChange={(e) => {
                                    setForm({
                                        ...form, fullname: e.target.value
                                    })
                                }}
                                type="text" placeholder="pls write your name and lastname ..." />
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                value={form.email}
                                onChange={(e) => {
                                    setForm({
                                        ...form, email: e.target.value
                                    })
                                }}
                                type="email" placeholder="name@example.com" />
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                value={form.password}
                                onChange={(e) => {
                                    setForm({
                                        ...form, password: e.target.value
                                    })
                                }}
                                type="password" placeholder="pls write your password ..." />
                        </Form.Group>
                        <Container className="d-flex justify-content-center">
                            <Button
                                onClick={handleSubmit}
                                variant="light"
                                className="btn justify-content-end w-25">
                                <img
                                    style={{ width: "100px" }}
                                    className="my-3" src={signup} alt="" />
                            </Button>
                        </Container>
                    </Form>
                    {
                        errorModal && (
                            <GeneralModal
                                title="Error"
                                content="All the fields must be filled"
                                clsBtnTxt="Pls try again"
                                clsBtnClck={() => setErrorModal(false)}
                            />
                        )
                    }
                </Col>
            </Row>
            <hr></hr>
            <Container className="m-3">
                <p className="text-center fs-3">Already have an account? <strong>Login</strong> with using</p>
            </Container>
            <Container className="d-flex justify-content-center gap-5">
                <Button
                    onClick={signinGoogle}
                    variant="outline-warning"
                    style={{ marginBottom: "2rem" }}>
                    <img src={googlesign} alt="" />
                </Button>
            </Container>
        </Container>
    )
}