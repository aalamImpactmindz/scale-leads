"use client";
import "./messages.css";
import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "@/utils/axiosInstance";
import Heading from "@/components/heading/Heading";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../context/Authcontext";
import { useRouter } from "next/navigation";

const Messages = () => {
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthContext);
  const [allMessages, setAllMessages] = useState([]);
  const [formData, setFormData] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(null); // Which radio is selected
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Redirect if logged out
  useEffect(() => {
    if (!isLoggedIn && isLoggedIn !== null) {
      router.push("/login");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchMessages = async () => {
      try {
        const response = await axiosInstance.get("/api/message-formats");
        const formats = response.data.formats || [];
        console.log(response.data);

        setAllMessages(formats);

        const initialFormData = {};
        formats.forEach((msg, index) => {
          initialFormData[`message${index}`] = msg.content || "";
        });
        setFormData(initialFormData);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();
  }, [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedIndex === null) {
      setError("Please select one message to submit.");
      return;
    }

    const selectedMessage = {
      content: formData[`message${selectedIndex}`],
    };

    try {
      const { data } = await axiosInstance.post(
        "api/user-messages",
        selectedMessage
      );
      if (data.status) {
        setMessage(data.message);
        setError("");
        router.push("/abonnement");
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
        {allMessages.length > 0 && (
          <Form
            className="text-start p-3 p-md-4 bg-gray m-auto"
            id="messages-form"
            onSubmit={handleSubmit}
          >
            {allMessages.map((msg, index) => (
              <Form.Group
                className="mb-4"
                controlId={`message${index}`}
                key={index}
              >
                <div className="d-flex align-items-start gap-2">
                  <Form.Check
                    type="radio"
                    name="messageSelect"
                    checked={selectedIndex === index}
                    onChange={() => setSelectedIndex(index)}
                  />
                  <div className="flex-grow-1">
                    <Form.Label>Message {index + 1}</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      placeholder="Enter a message"
                      value={formData[`message${index}`] || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [`message${index}`]: e.target.value,
                        })
                      }
                      required={selectedIndex === index}
                    />
                  </div>
                </div>
              </Form.Group>
            ))}

            {error && <p className="text-danger">{error}</p>}
            {message && <p className="text-success">{message}</p>}

            <Button className="btn-main" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Container>
    </section>
  );
};

export default Messages;
