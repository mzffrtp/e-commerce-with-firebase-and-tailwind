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
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/*pages and components */
import GeneralModal from "../../GeneralModal";

/* redux */
import { useDispatch, useSelector } from "react-redux";
import actionTypes from "../../../redux/actionTypes/actionTypes";

export default function SignUp() {
    const { loginState } = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorModal, setErrorModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

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
                dispatch({
                    type: actionTypes.loginActions.LOGIN_SUCCESS
                })

                console.log(res.user);
                const userInforef = collection(userInfo, "userInfo");
                addDoc(userInforef, {
                    fullname: res.user.displayName,
                    email: res.user.email,
                    password: "",
                    logedIn: serverTimestamp(),
                })

                    .then(
                        setSuccessMessage(true)
                    )
                    .catch((e) => {
                        setErrorModal(true)
                        console.log(e);
                    })
                navigate("/")
            })
            .catch((err) => {
                console.log(err)
                setErrorModal(true)
            })

    }
    // handle submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        // validation of form
        if (form.fullname === "" || form.email === "" || form.password === "") {
            setErrorModal(true)
        }
        // handle email/password authentication on farebase
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, form.email, form.password)
            .then((userCredentials) => {
                const userInforef = collection(userInfo, "userInfo");
                addDoc(userInforef, {
                    fullname: form.fullname,
                    email: form.email,
                    password: form.password,
                    logedIn: serverTimestamp(),
                })

                    .then(() => {
                        setSuccessMessage(true)
                    }

                    )
                    .catch((e) => {
                        setErrorModal(true)
                        console.log(e);
                    })
                 
            })
            .catch((err) => {
                console.log(err.message);
                setErrorModal(true)
            })
    }

    return (

        <div >

            <Container className="mt-5">
                <Row className="justify-content-md-center">
                    <Col xs lg="4"
                        style={{ backgroundColor: "cornsilk" }}>
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
                                    className="btn justify-content-end w-25 my-1">
                                    <img
                                        style={{ width: "75px" }}
                                        className="my-3" src={signup} alt="" />
                                </Button>
                            </Container>
                        </Form>
                        {
                            errorModal && (
                                <GeneralModal
                                    style={{ backgroundColor: "pink" }}
                                    title="Error"
                                    content="All the fields must be filled correctly or this user already exits"
                                    clsBtnTxt="Pls try again"
                                    clsBtnClck={() => {
                                        setErrorModal(false)
                                        setForm("")
                                    }}
                                />
                            )
                        }
                        {
                            successMessage && (
                                <GeneralModal
                                    title="Signup Successful"
                                    content="You will now get automatically redirected to Login"
                                    clsBtnTxt="To Login"
                                    clsBtnClck={() => {
                                        setSuccessMessage(false)
                                        navigate("/login")
                                        setForm("")
                                    }}
                                />
                            )
                        }
                    </Col>
                </Row>
                <Container className="m-3 d-flex justify-content-center">
                    <Row >
                        <Col sm lg="12"
                            style={{ backgroundColor: "azure" }}>
                            <p className="text-center fs-3">Already have an account? <strong>Login</strong> with using <Button
                                className="my-3"
                                onClick={signinGoogle}
                                variant="outline-light"
                                style={{ marginBottom: "2rem" }}>
                                <img src={googlesign} alt="" />
                            </Button></p>
                        </Col>
                    </Row>

                </Container>
            </Container>
        </div>

    )
}