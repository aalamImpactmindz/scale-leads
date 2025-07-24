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
  const[followupdata,setfollowupdata] = useState({linkedin:"",email:""})
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
            linkedin:followup[firstTone]?.linkedin || "",
            email:followup[firstTone]?.email || ""
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
      linkedin:allfollowup[tone]?.linkedin || "",
      email:allfollowup[tone]?.email || ""
    })
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTone) {
      setError("Veuillez sélectionner une tonalité.");
      return;
    }

    try {
      const { data } = await axiosInstance.post("/api/user-messages", {
        message_content: formData.linkedin,
        email_content: formData.email,
        follow_up_linkedin:followupdata?.linkedin,
        follow_up_email:followupdata?.email
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
                    <Form.Label>Message de suivi LinkedIn</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={followupdata?.linkedin}
                      onChange={(e) =>
                        setfollowupdata({ ...followupdata, linkedin: e.target.value })
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
                    <Form.Label>Message de suivi par e-mail</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={followupdata?.email}
                      onChange={(e) =>
                        setfollowupdata({ ...followupdata, email: e.target.value })
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
