"use client";
import React, { useState } from "react";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { userOnboardingForm } from "@/utils/service/userlogin";
import Cookies from "js-cookie";

const OnboardingForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    campaign_name: "",
    ideal_customer: "",
    sector: "",
    company_size: "1",
    objective: "",
    offer: "",
    website: "",
    channel: "",
    message_count: "1",
    message_delay: "1",
    tone: "",
    existing_messages: "",
    competitors: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userOnboardingForm(formData);
      if (response.status) {
        setMessage(response?.message);
        setError("");
        setFormData({
          campaign_name: "",
          ideal_customer: "",
          sector: "",
          company_size: "1",
          objective: "",
          offer: "",
          website: "",
          channel: "",
          message_count: "1",
          message_delay: "1",
          tone: "",
          existing_messages: "",
          competitors: "",
        });

        // Change onboarding_form_filled cookie to true
        const expiresAt = localStorage.getItem("expires_at");
        if (expiresAt) {
          Cookies.set("onboarding_form_filled", "true", {
            expires: new Date(expiresAt),
            path: "/",
            secure: true,
            sameSite: "Strict",
          });
        }

        if (onSuccess) onSuccess(); // trigger navigation or other behavior
      } else {
        setMessage(response?.message);
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || "Unable to submit your details."
      );
      setMessage("");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="row-cols-1 row-cols-md-2 g-0 g-md-4">
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Campaign Name</Form.Label>
            <Form.Control
              type="text"
              required
              value={formData.campaign_name}
              onChange={(e) =>
                setFormData({ ...formData, campaign_name: e.target.value })
              }
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Who's your ideal customer?</Form.Label>
            <Form.Control
              type="text"
              required
              value={formData.ideal_customer}
              onChange={(e) =>
                setFormData({ ...formData, ideal_customer: e.target.value })
              }
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="row-cols-1 row-cols-md-2 g-0 g-md-4">
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>What sector does he work in?</Form.Label>
            <Form.Control
              type="text"
              required
              value={formData.sector}
              onChange={(e) =>
                setFormData({ ...formData, sector: e.target.value })
              }
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formOnboardingCompanySize">
            <Form.Label>What size company are you targeting?</Form.Label>
            <Form.Select
              aria-label="Select company size"
              required
              value={formData.company_size}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  company_size: e.target.value,
                })
              }
              className="form-control"
            >
              <option value="1">1 employee</option>
              <option value="2-10">2-10 employees</option>
              <option value="11-25">11-25 employees</option>
              <option value="26-50">26-50 employees</option>
              <option value="50+">50+ employees</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="row-cols-1 row-cols-md-2 g-0 g-md-4">
        <Col>
          <Form.Group className="mb-3" controlId="formOnboardingObjective">
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
        <Col>
          <Form.Group className="mb-3" controlId="formOnboardingYourOffer">
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
      </Row>
      <Row className="row-cols-1 row-cols-md-2 g-0 g-md-4">
        <Col>
          <Form.Group className="mb-3" controlId="formOnboardingYourWebsite">
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
        <Col>
          <Form.Group className="mb-3" controlId="formOnboardingChannel">
            <Form.Label>Which channel do you want to prospect on?</Form.Label>
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
      </Row>
      <Row className="row-cols-1 row-cols-md-2 g-0 g-md-4">
        <Col>
          <Form.Group className="mb-3" controlId="formOnboardingMessageCount">
            <Form.Label>How many follow-up messages you want?</Form.Label>
            <Form.Select
              aria-label="Select follow-up message count"
              required
              value={formData.message_count}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  message_count: e.target.value,
                })
              }
              className="form-control"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formOnboardingFollowUpDelay">
            <Form.Label>How much delay between follow-up messages?</Form.Label>
            <Form.Select
              aria-label="Select follow-up message delay"
              required
              value={formData.message_delay}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  message_delay: e.target.value,
                })
              }
              className="form-control"
            >
              <option value="1">1 day</option>
              <option value="3">3 days</option>
              <option value="7">7 days</option>
              <option value="14">14 days</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="row-cols-1 row-cols-md-2 g-0 g-md-4">
        <Col>
          <Form.Group className="mb-3" controlId="formOnboardingTone">
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
        <Col>
          <Form.Group className="mb-3" controlId="formOnboardingCompetitors">
            <Form.Label>
              Any competitors or approaches you'd like to avoid?
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="(optional)"
              value={formData.competitors}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  competitors: e.target.value,
                })
              }
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="row-cols-1 g-0 g-md-4">
        <Col>
          <Form.Group className="mb-3" controlId="formOnboardingMessages">
            <Form.Label>Do you already have messages you've used?</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="(optional)"
              value={formData.existing_messages}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  existing_messages: e.target.value,
                })
              }
            />
          </Form.Group>
        </Col>
      </Row>
      <Button className="btn-main" type="submit">
        Save
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
  );
};

export default OnboardingForm;
