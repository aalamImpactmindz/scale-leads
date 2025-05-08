"use client";
import Heading from "@/components/heading/Heading";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { AuthContext } from "../context/Authcontext";
import { userLogin } from "@/utils/service/userlogin";
const Login = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [formFilled, setFormFilled] = useState(false);

  // Redirect if already logged in
  // useEffect(() => {
  //   if (isLoggedIn && localStorage.getItem("form_filled") === "true") {
  //     router.push("/");
  //   } else if (isLoggedIn && localStorage.getItem("form_filled") === "false") {
  //     router.push("/onboarding-form");
  //   }
  // }, [isLoggedIn, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await userLogin(formData);
      const decodedToken = jwtDecode(response.token);
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("expires_at", decodedToken.exp);
      localStorage.setItem("form_filled", decodedToken.form_filled);
      setIsLoggedIn(true);
      setMessage("Login successful!");
      setError("");
      // extra
      router.push("/onboarding-form");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed.");
      setMessage("");
    }
  };

  return (
    <div className="page-login sec-padding">
      <Container fluid="xl">
        <Heading title="My Account" />
        <Row className="row-cols-1 row-cols-md-2 g-3 g-md-4">
          <Col>
            <div className="bg-gray p-3 p-lg-4">
              <h4 className="color-light">Login</h4>
              <p>Already have an account? Log in to continue.</p>
              <Form className="mt-4" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formLoginEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="jane@framer.com"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLoginPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="********"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </Form.Group>
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                  <Button className="btn-main" type="submit">
                    Login
                  </Button>
                  <Link href="/reset-password">Forgot Password?</Link>
                </div>
                {message && (
                  <Alert
                    variant="success"
                    className="mt-3 small py-2 rounded-0"
                  >
                    {message}
                  </Alert>
                )}
                {error && (
                  <Alert variant="danger" className="mt-3 small py-2 rounded-0">
                    {error}
                  </Alert>
                )}
              </Form>
            </div>
          </Col>
          <Col>
            <div className="bg-gray p-3 p-lg-4 h-100">
              <h4 className="color-light">New Customer?</h4>
              <p>
                Create an account to easily track your order status and view
                your purchase history. We'll set up your account quickly and
                only ask for the information needed to make your shopping
                experience faster and smoother.
              </p>
              <Link href="/register" className="d-inline-block">
                <Button className="btn-main">Register</Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
