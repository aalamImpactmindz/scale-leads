"use client";
import "./messages.css";
import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "@/utils/axiosInstance";
import Heading from "@/components/heading/Heading";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useRouter } from "next/navigation";
import Alert from "react-bootstrap/Alert";
import Cookies from "js-cookie";

const Messages = () => {
  const hasSetInitialTone = useRef(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [allMessages, setAllMessages] = useState({});
  const [formData, setFormData] = useState({ linkedin: "", email: "" });
  const[followupdata,setfollowupdata] = useState({linkedin1:"",linkedin2:"",linkedin3:"",email1:"",email2:"",email3:""})
  const [selectedTone, setSelectedTone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const[allfollowup,setFollowupmsg] = useState({});

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axiosInstance.get("/api/message-formats");
        const messages = response.data.messages || {};
        const followup = response.data.follow_ups
 ||{};
    
        setAllMessages(messages);
         setFollowupmsg(followup);
        const firstTone = Object.keys(messages)[0];
        if (!hasSetInitialTone.current && firstTone) {
          setSelectedTone(firstTone);
          setFormData({
            linkedin: messages[firstTone]?.linkedin || "",
            email: messages[firstTone]?.email || "",
          });
          setfollowupdata({
            linkedin1:followup[firstTone]?.linkedin.option1 || "",
            linkedin2:followup[firstTone]?.linkedin.option2 || "",
            linkedin3:followup[firstTone]?.linkedin.option3 || "",
            email1:followup[firstTone]?.email?.option1 || "",
            email2:followup[firstTone]?.email?.option2 || "",
            email3:followup[firstTone]?.email?.option3 || "",
          })
          hasSetInitialTone.current = true;
        }
      } catch (err) {
        console.log("Error fetching messages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleToneSelect = (tone) => {
    setSelectedTone(tone);
    setFormData({
      linkedin: allMessages[tone]?.linkedin || "",
      email: allMessages[tone]?.email || "",
    });
    setfollowupdata({
      linkedin1:allfollowup[tone]?.linkedin.option1 || "",
      linkedin2:allfollowup[tone]?.linkedin.option2 || "",
      linkedin3:allfollowup[tone]?.linkedin.option3 || "",
      email1:allfollowup[tone]?.email.option1 || "",
      email2:allfollowup[tone]?.email.option2 || "",
      email3:allfollowup[tone]?.email.option3 || ""
    })
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTone) {
      setError("Veuillez sélectionner une tonalité.");
      return;
    }
      let followuplinkedin= {
        option1:followupdata?.linkedin1,
        option2:followupdata?.linkedin2,
        option3:followupdata?.linkedin3
      }
      let followupemails={
        option1:followupdata?.email1,
        option2:followupdata?.email2,
        option3:followupdata?.email3
      }
    try {
      const { data } = await axiosInstance.post("/api/user-messages", {
        message_content: formData.linkedin,
        email_content: formData.email,
        follow_up_linkedin:followuplinkedin,
        follow_up_email:followupemails
      });

      if (data.status) {
        setMessage(data.message);
        setError("");

        // Change messages_filled cookie to true
        const expiresAt = localStorage.getItem("expires_at");
        if (expiresAt) {
          Cookies.set("messages_filled", "true", {
            expires: new Date(expiresAt),
            path: "/",
            secure: true,
            sameSite: "Strict",
          });
        }

        // Redirect logic
        const hasActivePlan = Cookies.get("has_active_plan");
        if (hasActivePlan === false || hasActivePlan === "false") {
          router.push("/abonnement");
        } else {
          router.push("/");
        }
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || "Unable to submit your message."
      );
      setMessage("");
    }
  };

  return (
    <section className="all-messages sec-padding">
      <Container fluid="xl">
        <Heading title="Messages" />
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Chargement...</span>
            </div>
          </div>
        ) : (
          Object.keys(allMessages).length > 0 && (
            <Form
              className="text-start p-3 p-md-4 bg-gray m-auto"
              id="messages-form"
              onSubmit={handleSubmit}
            >
              {Object.keys(allMessages).map((tone, index) => (
                <Form.Check
                  type="radio"
                  name="toneSelect"
                  id={`tone-${tone}`}
                  key={tone}
                  label={`Tone: ${tone}`}
                  checked={selectedTone === tone}
                  onChange={() => handleToneSelect(tone)}
                  className="mb-3"
                />
              ))}

              {selectedTone && (
                <>
                  <Form.Group className="mb-3" controlId="linkedinMessage">
                    <Form.Label className="text-xl">Message LinkedIn</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={formData.linkedin}
                      onChange={(e) =>
                        setFormData({ ...formData, linkedin: e.target.value })
                      }
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="linkedinMessage">
                    <Form.Label>Message de suivi LinkedIn-1</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={followupdata?.linkedin1}
                      onChange={(e) =>
                        setfollowupdata({ ...followupdata, linkedin1: e.target.value })
                      }
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="linkedinMessage">
                    <Form.Label>Message de suivi LinkedIn-2</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={followupdata?.linkedin2}
                      onChange={(e) =>
                        setfollowupdata({ ...followupdata, linkedin2: e.target.value })
                      }
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="linkedinMessage">
                    <Form.Label>Message de suivi LinkedIn-3</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={followupdata?.linkedin3}
                      onChange={(e) =>
                        setfollowupdata({ ...followupdata, linkedin3: e.target.value })
                      }
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="emailMessage">
                    <Form.Label>Message électronique</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="emailMessage">
                    <Form.Label>Message de suivi par e-mail-1</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={followupdata?.email1}
                      onChange={(e) =>
                        setfollowupdata({ ...followupdata, email1: e.target.value })
                      }
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="emailMessage">
                    <Form.Label>Message de suivi par e-mail-2</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={followupdata?.email2}
                      onChange={(e) =>
                        setfollowupdata({ ...followupdata, email2: e.target.value })
                      }
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="emailMessage">
                    <Form.Label>Message de suivi par e-mail-3</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={followupdata?.email3}
                      onChange={(e) =>
                        setfollowupdata({ ...followupdata, email3: e.target.value })
                      }
                      required
                    />
                  </Form.Group>
                </>
              )}

              <Button className="btn-main" type="submit">
                Soumettre
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
          )
        )}
      </Container>
    </section>
  );
};

export default Messages;
