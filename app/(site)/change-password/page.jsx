"use client";
import Heading from "@/components/heading/Heading";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { newpassword } from "@/utils/service/userlogin";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const emailFromURL = searchParams.get("email") || "";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (emailFromURL) {
      setEmail(emailFromURL);
    }
  }, [emailFromURL]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Adresse e-mail invalide.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setError("");
    const data = {
        email:email,
        password:password,
        password_confirmation:confirmPassword
    }

    try {
      const response = await newpassword(data);
     
      if(response?.success){
         toast.success("Changer le mot de passe avec succès")
         setPassword('');
         setConfirmPassword('');
      }
      else{
        toast.error(response.message)
      }

    } catch (err) {
      setError("Erreur du serveur. Veuillez réessayer plus tard.");
    }
  };

  return (
    <div className="page-reset-password sec-padding">
      <Container fluid="xl">
        <Heading title="Réinitialiser le mot de passe" />
        <Row className="justify-content-center">
          <Col sm={10} md={8} lg={6}>
            <div className="bg-gray p-3 p-lg-4">
              <p>Définissez un nouveau mot de passe pour votre compte.</p>
              <Form className="mt-4" onSubmit={handleSubmit}>
                {/* Editable Email Field */}
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Adresse e-mail</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formNewPassword">
                  <Form.Label>Nouveau mot de passe</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formConfirmPassword">
                  <Form.Label>Confirmer le mot de passe</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                {error && (
                  <div className="text-danger mb-3" style={{ fontSize: "0.9rem" }}>
                    {error}
                  </div>
                )}

                {success && (
                  <div className="text-success mb-3" style={{ fontSize: "0.9rem" }}>
                    {success}
                  </div>
                )}

                <Button className="btn-main" type="submit">
                  Réinitialiser le mot de passe
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ResetPassword;
