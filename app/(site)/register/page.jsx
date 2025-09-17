"use client";
import Heading from "@/components/heading/Heading";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { userRegister } from "@/utils/service/userlogin";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "@/app/context/Authcontext";
import Cookies from "js-cookie";

const Register = () => {
  const router = useRouter();
  const { setIsLoggedIn } = useContext(AuthContext);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await userRegister(formData);
      if (response.status) {
        setMessage(response?.message);
        setError("");
        setFormData({
          name: "",
          email: "",
          password: "",
        });
        setConfirmPassword("");
        const decodedToken = jwtDecode(response.token);
        const expiresAtDate = new Date(decodedToken.exp * 1000);
        Cookies.set("authToken", response.token, {
          expires: expiresAtDate,
          path: "/", // available across site
          secure: true, // optional
          sameSite: "Strict", // optional
        });
        Cookies.set("expires_at", decodedToken.exp, {
          expires: expiresAtDate,
          path: "/", // available across site
          secure: true, // optional
          sameSite: "Strict", // optional
        });
        Cookies.set("onboarding_form_filled", decodedToken.form_filled, {
          expires: expiresAtDate,
          path: "/",
          secure: true,
          sameSite: "Strict",
        });
        Cookies.set("messages_filled", decodedToken.messages_filled, {
          expires: expiresAtDate,
          path: "/",
          secure: true,
          sameSite: "Strict",
        });
        Cookies.set("has_active_plan", "false", {
          expires: expiresAtDate,
          path: "/",
          secure: true,
          sameSite: "Strict",
        });
   

        localStorage.setItem("expires_at", new Date(decodedToken.exp * 1000));

        setIsLoggedIn(true);
        router.push("/onboarding");

        // extra
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
        <Row className="row-cols-1 row-cols-md-2 g-0 g-md-4">
          <Col>
            <div className="bg-gray p-3 p-lg-4">
              <h4 className="color-light">S'inscrire</h4>
              <p>Commencez votre voyage avec nous—c'est rapide et facile.</p>
              <Form className="mt-4" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formRegisterFullName">
                  <Form.Label>Nom complet</Form.Label>
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
                <Form.Group className="mb-3" controlId="formRegisterEmail">
                  <Form.Label>Adresse e-mail</Form.Label>
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
                <Form.Group className="mb-3" controlId="formRegisterPassword">
                  <Form.Label>Mot de passe</Form.Label>
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
                <Form.Group
                  className="mb-3"
                  controlId="formRegisterConfirmPassword"
                >
                  <Form.Label>Confirmer le mot de passe</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="********"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
                <Button className="btn-main" type="submit">
                  S'inscrire
                </Button>
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
              <h4 className="color-light">Vous avez déjà un compte ?</h4>
              <p>
                Connectez-vous pour accéder à votre compte, vérifier vos commandes et continuer là où tu t'es arrêté.
              </p>
              <Link href="/login" className="d-inline-block">
                <Button className="btn-main">Se connecter</Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
