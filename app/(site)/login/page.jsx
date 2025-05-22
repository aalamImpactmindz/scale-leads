"use client";
import Heading from "@/components/heading/Heading";
import Cookies from "js-cookie";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { userLogin } from "@/utils/service/userlogin";
import { AuthContext } from "@/app/context/Authcontext";
import axiosInstance from "@/utils/axiosInstance";

const Login = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await userLogin(formData);
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
        path: "/",
        secure: true,
        sameSite: "Strict",
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
      // Cookies.set("can_access_protected_pages", "false", {
      //   expires: expiresAtDate,
      //   path: "/",
      //   secure: true,
      //   sameSite: "Strict",
      // });

      localStorage.setItem("expires_at", new Date(decodedToken.exp * 1000));

      setIsLoggedIn(true);
      setMessage("Login successful!");
      setError("");

      // Fetch user's plan
      const fetchUsersPlan = async () => {
        try {
          const response = await axiosInstance.get("/api/user/plan");
          const plan = response.data.plan;

          // Store plan in localStorage
          localStorage.setItem("plan", JSON.stringify(plan));

          // Store user's plan status in cookies
          Cookies.set("has_active_plan", "true", {
            expires: expiresAtDate,
            path: "/",
            secure: true,
            sameSite: "Strict",
          });
        } catch (err) {
          console.log("Error fetching user's plan:", err);
          Cookies.set("has_active_plan", "false", {
            expires: expiresAtDate,
            path: "/",
            secure: true,
            sameSite: "Strict",
          });
        }
      };
      await fetchUsersPlan();

      // Get cookies
      const formFilled = Cookies.get("onboarding_form_filled");
      const messagesFilled = Cookies.get("messages_filled");
      const hasActivePlan = Cookies.get("has_active_plan");

      // Redirect logic
      setIsRedirecting(true);
      if (formFilled === "false" || formFilled === false) {
        router.push("/onboarding");
      } else if (
        (formFilled === "true" || formFilled === true) &&
        (messagesFilled === "false" || messagesFilled === false)
      ) {
        router.push("/messages");
      } else if (
        (messagesFilled === "true" || messagesFilled === true) &&
        (hasActivePlan === "true" || hasActivePlan === true)
      ) {
        router.push("/");
      } else if (
        (messagesFilled === "true" || messagesFilled === true) &&
        (hasActivePlan === "false" || hasActivePlan === false)
      ) {
        router.push("/abonnement");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed.");
      setMessage("");
    }
  };

  if (isRedirecting) {
    return <div className="sec-padding text-center">Redirecting...</div>;
  }

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
