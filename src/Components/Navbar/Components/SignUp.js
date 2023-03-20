import React, {useState} from "react";
import { Link } from "react-router-dom";

/* bootstap styling */
import Form from 'react-bootstrap/Form';
import { Container, Row, Col, Button } from "react-bootstrap";
import signup from "../../../assets/imgs/signup.png";
import googlesign from "../../../assets/imgs/google.png";

/* firebase */
import { auth, providerGoogle} from "../../../firebase/FirebaseConfiq";
import { signInWithPopup } from "firebase/auth";


export default function SignUp() {
    const [form, setForm] = useState({
        fullname: "",
        email:"",
        password:""
    })
    const signinGoogle = () =>{
        signInWithPopup(auth, providerGoogle)
        .then((res)=>{
            localStorage.setItem("token", res.user.refreshToken)

        })
        .catch((err)=>console.log(err))
    }
    return (
        <Container className="my-5" style={{backgroundColor:"cornsilk"}}>
            <Row className="justify-content-center">
                <Col>
                    <h3 className="text-center my-2"> Sign Up</h3>
                    <Form>
                        <Form.Group className="mb-2" controlId="fullname">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control 
                            value={form.fullname}
                            onChange={(e)=>{
                                setForm({
                                    ...form, fullname:e.target.value
                                })
                            }}
                            type="text" placeholder="pls write your name and lastname ..." />
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                            value={form.email}
                            onChange={(e)=>{
                                setForm({
                                    ...form, email:e.target.value
                                })
                            }}
                            type="email" placeholder="name@example.com" />
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                            value={form.password}
                            onChange={(e)=>{
                                setForm({
                                    ...form, password:e.target.value
                                })
                                console.log(form);
                            }}
                            type="password" placeholder="pls write your password ..." />
                        </Form.Group>
                        <Container className="d-flex justify-content-center">
                            <Link
                                variant="dark"
                                className="btn justify-content-end w-25">
                                <img
                                    style={{ width: "100px" }}
                                    className="my-3" src={signup} alt="" />
                            </Link>
                        </Container>
                    </Form>
                </Col>
            </Row>
            <hr></hr>

            <Container className="m-3">
                <p className="text-center fs-3">Already have an account? <strong>Login</strong> with using</p>
            </Container>
            <Container className="d-flex justify-content-center gap-5">
                <Button
                onClick={signinGoogle}
                    variant="outline-warning">
                    <img src={googlesign} alt="" />
                </Button>
            </Container>

        </Container>
    )
}