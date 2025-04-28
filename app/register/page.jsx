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
import { AuthContext } from "../context/Authcontext";
import { useContext } from "react";
import { userRegister } from "@/utils/service/userlogin";

const Register = () => {
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthContext);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    ideal_customer: "",
    sector: "",
    company_size: "",
    objective: "",
    offer: "",
    website: "",
    channel: "",
    tone: "",
    existing_messages: "",
    competitors: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // const response = await axios.post(
      //   "https://impactmindz.in/client/scaleleads/api/register",
      //   formData
      // );
      const response = await userRegister(formData);
      if (response.status) {
        setMessage(response?.message);
        setError("");
        setFormData({
          name: "",
          email: "",
          password: "",
          ideal_customer: "",
          sector: "",
          company_size: "",
          objective: "",
          offer: "",
          website: "",
          channel: "",
          tone: "",
          existing_messages: "",
          competitors: "",
        });
        setConfirmPassword("");
      } else {
        setMessage(response?.message);
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed.");
      setMessage("");
    }
  };

  return (
    <div className="page-register sec-padding">
      <Container fluid="xl">
        <Heading title="My Account" />
        {/* <Row className="row-cols-1 row-cols-md-2 g-0 g-md-4">
          <Col> */}
        <div className="bg-gray p-3 p-lg-4">
          <h4 className="color-light">Register</h4>
          <p>Start your journey with us—it's quick and simple.</p>
          <Form className="mt-4" onSubmit={handleSubmit}>
            <Row className="row-cols-1 row-cols-md-2 g-0 g-md-4">
              <Col>
                <Form.Group className="mb-3" controlId="formRegisterFullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Jane Smith"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formRegisterEmail">
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
              </Col>
            </Row>
            <Row className="row-cols-1 row-cols-md-2 g-0 g-md-4">
              <Col>
                <Form.Group className="mb-3" controlId="formRegisterPassword">
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
              </Col>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="formRegisterConfirmPassword"
                >
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="********"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="row-cols-1 row-cols-md-2 g-0 g-md-4">
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="formRegisterIdealCustomer"
                >
                  <Form.Label>Who's your ideal customer?</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Customer"
                    required
                    value={formData.ideal_customer}
                    onChange={(e) =>
                      setFormData({ ...formData, ideal_customer: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formRegisterSector">
                  <Form.Label>What sector does he work in?</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Sector Name"
                    required
                    value={formData.sector}
                    onChange={(e) =>
                      setFormData({ ...formData, sector: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="row-cols-1 row-cols-md-2 g-0 g-md-4">
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="formRegisterCompanySize"
                >
                  <Form.Label>What size company are you targeting?</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Size"
                    required
                    value={formData.company_size}
                    onChange={(e) =>
                      setFormData({ ...formData, company_size: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formRegisterObjective">
                  <Form.Label>What is your main objective?</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your Objective"
                    required
                    value={formData.objective}
                    onChange={(e) =>
                      setFormData({ ...formData, objective: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="row-cols-1 row-cols-md-2 g-0 g-md-4">
              <Col>
                <Form.Group className="mb-3" controlId="formRegisterYourOffer">
                  <Form.Label>What's your offer (your promise)?</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your Offer"
                    required
                    value={formData.offer}
                    onChange={(e) =>
                      setFormData({ ...formData, offer: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="formRegisterYourWebsite"
                >
                  <Form.Label>Do you have a website?</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Website"
                    required
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="row-cols-1 row-cols-md-2 g-0 g-md-4">
              <Col>
                <Form.Group className="mb-3" controlId="formRegisterChannel">
                  <Form.Label>
                    Which channel do you want to prospect on?
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Channel"
                    required
                    value={formData.channel}
                    onChange={(e) =>
                      setFormData({ ...formData, channel: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formRegisterTone">
                  <Form.Label>
                    What tone do you want your messages to take?
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="(optional)"
                    value={formData.tone}
                    onChange={(e) =>
                      setFormData({ ...formData, tone: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="row-cols-1 row-cols-md-2 g-0 g-md-4">
              <Col>
                <Form.Group className="mb-3" controlId="formRegisterMessages">
                  <Form.Label>
                    Do you already have messages you've used?
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="(optional)"
                    value={formData.existing_messages}
                    onChange={(e) =>
                      setFormData({ ...formData, existing_messages: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="formRegisterCompetitors"
                >
                  <Form.Label>
                    Any competitors or approaches you'd like to avoid?
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="(optional)"
                    value={formData.competitors}
                    onChange={(e) =>
                      setFormData({ ...formData, competitors: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button className="btn-main" type="submit">
              Register
            </Button>
            {message && (
              <Alert variant="success" className="mt-3 small py-2 rounded-0">
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
        {/* </Col> */}
        {/* <Col>
            <div className="bg-gray p-3 p-lg-4 h-100">
              <h4 className="color-light">Already Have an Account?</h4>
              <p>
                Log in to access your account, check your orders, and continue
                where you left off.
              </p>
              <Link href="/login">
                <Button className="btn-main">Login</Button>
              </Link>
            </div>
          </Col> */}
        {/* </Row> */}
      </Container>
    </div>
  );
};

export default Register;
