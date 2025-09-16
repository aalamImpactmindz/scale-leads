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
    channel: "Linkedin",
    message_count: "1",
    message_delay: "1",
    tone: "",
    existing_messages: "",
    competitors: "",
    automatic_campaign: false, // 🔹 added field
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
   let response;
 
    try {
      //when user select Linkedin+Email
      if(formData?.channel==="Linkedin+Email"){
      formData.channel="Linkedin";
      response = await userOnboardingForm(formData);
      if(response.status){
        formData.channel="Email";
        formData.automatic_campaign = true;
        response = await userOnboardingForm(formData);
      }
      }
       if(formData?.channel=="Email"){
      formData.automatic_campaign=true;
      response = await userOnboardingForm(formData);

    }
     //normally
   else{
   
     response = await userOnboardingForm(formData);

   }
      if (response.status) {
        setMessage("Profil créé avec succès.");
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
          automatic_campaign: false, // 🔹 reset toggle
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
        err?.response?.data?.message || "Impossible de soumettre vos coordonnées."
      );
      setMessage("");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
           <Row className="mb-3 ">
     {formData?.channel==="Linkedin" &&(
         <Col className="d-flex justify-content-end">
          <Form.Check
            type="switch"
            id="automatic-campaign-toggle"
            label="Campagne automatique"
            checked={formData.automatic_campaign}
            onChange={(e) =>
              setFormData({
                ...formData,
                automatic_campaign: e.target.checked,
              })
            }
          />
        </Col>
     )}
      </Row>
      <Row className="row-cols-1 row-cols-md-2 g-0 g-md-4">
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Nom de la campagne</Form.Label>
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
            <Form.Label>Qui est votre client idéal ?</Form.Label>
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
            <Form.Label>Dans quel secteur travaille-t-il ?</Form.Label>
       <Form.Select
              aria-label="Select secteur"
              required
              value={formData.sector}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sector: e.target.value,
                })
              }
              className="form-control"
            >
              <option value="Marketing et publicité">Marketing et publicité</option>
              <option value="Technologies et services de l'information">Technologies et services de l'information</option>
              <option value="Immobilier">Immobilier</option>
              <option value="Conseil">Conseil</option>
              <option value="SaaS/Logiciel">SaaS / Logiciel</option>
              <option value="Ressources humaines/Recrutement">Ressources humaines/Recrutement</option>
              <option value="Coaching et formation">Coaching et formation</option>
              <option value="Finances et comptabilité">Finances et comptabilité</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formOnboardingCompanySize">
            <Form.Label>Quelle taille d’entreprise ciblez-vous ?</Form.Label>
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
              <option value="1">1 employé</option>
              <option value="2-10">2-10 employé</option>
              <option value="11-25">11-25 employé</option>
              <option value="26-50">26-50 employé</option>
              <option value="50+">50+ employé</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="row-cols-1 row-cols-md-2 g-0 g-md-4">
        <Col>
          <Form.Group className="mb-3" controlId="formOnboardingObjective">
            <Form.Label>Quel est votre objectif principal ?</Form.Label>
            <Form.Control
              type="text"
             
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
            <Form.Label>
Quelle est votre offre (votre promesse) ?</Form.Label>
            <Form.Control
              type="text"
             
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
            <Form.Label>Avez-vous un site Web ?</Form.Label>
            <Form.Control
              type="text"
            
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
            <Form.Label>
Sur quelle chaîne souhaitez-vous prospecter ?</Form.Label>
            
               <Form.Select
              aria-label="Sélectionnez le nombre de messages de suivi"
              required
              value={formData.channel}
              onChange={(e) =>
                setFormData({
                  ...formData,
                 channel:e.target.value,
                })
              }
              className="form-control"
            >
              <option value="Linkedin">Linkedin</option>
              <option value="Email">Email</option>
              <option value="Linkedin+Email">Linkedin+Email</option>
            
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="row-cols-1 row-cols-md-2 g-0 g-md-4">
        <Col>
          <Form.Group className="mb-3" controlId="formOnboardingMessageCount">
            <Form.Label>
Combien de messages de suivi souhaitez-vous ?</Form.Label>
            <Form.Select
              aria-label="Sélectionnez le nombre de messages de suivi"
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
            <Form.Label>Quel est le délai entre les messages de suivi ?</Form.Label>
            <Form.Select
              aria-label="Sélectionnez le délai de suivi des messages"
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
              <option value="1">1 jour</option>
              <option value="3">3 jours</option>
              <option value="7">7 jours</option>
              <option value="14">14 jours</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="row-cols-1 row-cols-md-2 g-0 g-md-4">
        <Col>
          <Form.Group className="mb-3" controlId="formOnboardingTone">
            <Form.Label>
              Quel ton souhaitez-vous que vos messages prennent ?
            </Form.Label>
            <Form.Control
              type="text"
            
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
              Des concurrents ou des approches que vous aimeriez éviter ?
            </Form.Label>
            <Form.Control
              type="text"
           
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
            <Form.Label>Avez-vous déjà utilisé des messages ?</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
            
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
