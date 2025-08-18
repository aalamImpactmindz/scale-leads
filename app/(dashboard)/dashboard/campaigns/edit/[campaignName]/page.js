"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { updateUserOnboardingForm } from "@/utils/service/userlogin";
import Cookies from "js-cookie";

const EditCampaign = () => {
  const router = useRouter();

  const [formData, setFormData] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("campaign_to_edit");
    if (stored) {
      const campaign = JSON.parse(stored);
      setFormData({
        id: campaign.id,
        campaign_name: campaign.campaign_name,
        ideal_customer: campaign.ideal_customer,
        sector: campaign.sector,
        company_size: campaign.company_size,
        objective: campaign.objective,
        offer: campaign.offer,
        website: campaign.website,
        channel: campaign.channel,
        message_count: campaign.message_count,
        message_delay: campaign.message_delay,
        tone: campaign.tone || "",
        existing_messages: campaign.existing_messages || "",
        competitors: campaign.competitors || "",
        campaign_status: campaign.campaign_status || "",
      });
    } else {
      setError(
        "No campaign data found. Please go back and select a campaign to edit."
      );
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUserOnboardingForm(formData.id, formData);
      if (response.status) {
        setMessage("Campagne mise à jour avec succès.");
        setError("");
        setFormData({
          id: formData.id,
          campaign_name: formData.campaign_name,
          ideal_customer: formData.ideal_customer,
          sector: formData.sector,
          company_size: formData.company_size,
          objective: formData.objective,
          offer: formData.offer,
          website: formData.website,
          channel: formData.channel,
          message_count: formData.message_count,
          message_delay: formData.message_delay,
          tone: formData.tone || "",
          existing_messages: formData.existing_messages || "",
          competitors: formData.competitors || "",
          campaign_status: formData.campaign_status,
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
      } else {
        setMessage(response?.message);
      }
    } catch (err) {
      setError(err.message || "An error occurred while updating.");
      setMessage("");
    }
  };

  if (!formData) return <p className="text-danger">{error || "Loading..."}</p>;

  return (
    <div className="edit-campaign mb-4">
      <h2 className="mb-4 fw-bold">Modifier la campagne: {formData.campaign_name}</h2>
      <Form onSubmit={handleSubmit} className="d-bg-gradient p-4 rounded-2">
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
            <Form.Group className="mb-3" controlId="formOnboardingUpdateStatus">
              <Form.Label>Statut</Form.Label>
              <Form.Select
                aria-label="Select status"
                required
                value={formData.campaign_status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    campaign_status: e.target.value,
                  })
                }
                className="form-control"
              >
                <option value="active">Actif</option>
                <option value="deactive">Déactif</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="row-cols-1 row-cols-md-2 g-0 g-md-4">
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
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Dans quel secteur travaille-t-il ?</Form.Label>
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
        </Row>
        <Row className="row-cols-1 row-cols-md-2 g-0 g-md-4">
          <Col>
            <Form.Group
              className="mb-3"
              controlId="formOnboardingUpdateCompanySize"
            >
              <Form.Label>Quelle taille d’entreprise ciblez-vous ?</Form.Label>
              <Form.Select
                aria-label="Sélectionnez la taille de l'entreprise"
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
                <option value="2-10">2-10 employés</option>
                <option value="11-25">11-25 employés</option>
                <option value="26-50">26-50 employés</option>
                <option value="50+">50+ employés</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group
              className="mb-3"
              controlId="formOnboardingUpdateObjective"
            >
              <Form.Label>Quel est votre objectif principal ?</Form.Label>
              <Form.Control
                type="text"
                placeholder="Objectif de Yout"
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
            <Form.Group
              className="mb-3"
              controlId="formOnboardingUpdateYourOffer"
            >
              <Form.Label>Quelle est votre offre (votre promesse) ?</Form.Label>
              <Form.Control
                type="text"
                placeholder="Votre offre"
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
              controlId="formOnboardingUpdateYourWebsite"
            >
              <Form.Label>Avez-vous un site Web ?</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrer sur le site Web"
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
            <Form.Group
              className="mb-3"
              controlId="formOnboardingUpdateChannel"
            >
              <Form.Label>Sur quelle chaîne souhaitez-vous prospecter ?</Form.Label>
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
          <Col>
            <Form.Group
              className="mb-3"
              controlId="formOnboardingUpdateMessageCount"
            >
              <Form.Label>Combien de messages de suivi souhaitez-vous ?</Form.Label>
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
        </Row>
        <Row className="row-cols-1 row-cols-md-2 g-0 g-md-4">
          <Col>
            <Form.Group
              className="mb-3"
              controlId="formOnboardingUpdateFollowUpDelay"
            >
              <Form.Label>
                Quel est le délai entre les messages de suivi ?
              </Form.Label>
              <Form.Select
                aria-label="Sélectionnez le délai de suivi du message"
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
          <Col>
            <Form.Group className="mb-3" controlId="formOnboardingUpdateTone">
              <Form.Label>
               Quel ton souhaitez-vous que vos messages prennent ?
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="(facultatif)"
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
            <Form.Group
              className="mb-3"
              controlId="formOnboardingUpdateMessages"
            >
              <Form.Label>Avez-vous déjà utilisé des messages ?</Form.Label>
              <Form.Control
                type="text"
                placeholder="(facultatif)"
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
          <Col>
            <Form.Group
              className="mb-3"
              controlId="formOnboardingUpdateCompetitors"
            >
              <Form.Label>
                Des concurrents ou des approches que vous aimeriez éviter ?
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="(facultatif)"
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
        <Button className="btn-main" type="submit">
          Enregistrer
        </Button>
        <Button
          className="btn-main ms-3"
          type="button"
          onClick={() => router.back()}
        >
         Annuler
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
  );
};

export default EditCampaign;
