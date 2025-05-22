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
        setMessage(response?.message);
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
      <h2 className="mb-4 fw-bold">Edit Campaign: {formData.campaign_name}</h2>
      <Form onSubmit={handleSubmit} className="d-bg-gradient p-4 rounded-2">
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
            <Form.Group className="mb-3" controlId="formOnboardingUpdateStatus">
              <Form.Label>Status</Form.Label>
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
                <option value="active">Active</option>
                <option value="deactive">Deactive</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="row-cols-1 row-cols-md-2 g-0 g-md-4">
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
        </Row>
        <Row className="row-cols-1 row-cols-md-2 g-0 g-md-4">
          <Col>
            <Form.Group
              className="mb-3"
              controlId="formOnboardingUpdateCompanySize"
            >
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
          <Col>
            <Form.Group
              className="mb-3"
              controlId="formOnboardingUpdateObjective"
            >
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
            <Form.Group
              className="mb-3"
              controlId="formOnboardingUpdateYourOffer"
            >
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
              controlId="formOnboardingUpdateYourWebsite"
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
            <Form.Group
              className="mb-3"
              controlId="formOnboardingUpdateChannel"
            >
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
          <Col>
            <Form.Group
              className="mb-3"
              controlId="formOnboardingUpdateMessageCount"
            >
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
        </Row>
        <Row className="row-cols-1 row-cols-md-2 g-0 g-md-4">
          <Col>
            <Form.Group
              className="mb-3"
              controlId="formOnboardingUpdateFollowUpDelay"
            >
              <Form.Label>
                How much delay between follow-up messages?
              </Form.Label>
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
          <Col>
            <Form.Group className="mb-3" controlId="formOnboardingUpdateTone">
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
            <Form.Group
              className="mb-3"
              controlId="formOnboardingUpdateMessages"
            >
              <Form.Label>Do you already have messages you've used?</Form.Label>
              <Form.Control
                type="text"
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
          <Col>
            <Form.Group
              className="mb-3"
              controlId="formOnboardingUpdateCompetitors"
            >
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
        <Button className="btn-main" type="submit">
          Save
        </Button>
        <Button
          className="btn-main ms-3"
          type="button"
          onClick={() => router.back()}
        >
          Cancel
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
