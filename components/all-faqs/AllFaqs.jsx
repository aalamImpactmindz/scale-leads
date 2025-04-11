"use client";
import React from "react";
import { Accordion } from "react-bootstrap";

const AllFaqs = () => {
  return (
    <Accordion>
      <Accordion.Item
        eventKey="0"
        className="bg-transparent border-0 rounded-0"
      >
        <Accordion.Header>How does the AI generate designs?</Accordion.Header>
        <Accordion.Body className="color-text p-0 pb-3 small">
          Our AI analyzes your design brief and uses advanced algorithms to
          generate multiple design concepts tailored to your specifications. It
          takes into account your preferences, style, and project requirements
          to deliver unique and high-quality designs.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item
        eventKey="1"
        className="bg-transparent border-0 rounded-0"
      >
        <Accordion.Header>
          Can I customize the AI-generated designs?
        </Accordion.Header>
        <Accordion.Body className="color-text p-0 pb-3 small">
          Yes, our platform includes powerful customization tools that allow you
          to refine and perfect your chosen designs. You can make adjustments,
          add elements, and tweak details to ensure the final design matches
          your vision.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item
        eventKey="2"
        className="bg-transparent border-0 rounded-0"
      >
        <Accordion.Header>What support options are available?</Accordion.Header>
        <Accordion.Body className="color-text p-0 pb-3 small">
          We offer comprehensive support for all our plans. Starter users have
          access to email support, Pro users benefit from priority email
          support, and Enterprise users receive 24/7 priority support along with
          a dedicated account manager.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item
        eventKey="3"
        className="bg-transparent border-0 rounded-0"
      >
        <Accordion.Header>Is there a free trial available?</Accordion.Header>
        <Accordion.Body className="color-text p-0 pb-3 small">
          Yes, we offer a 14-day free trial for all new users. You can explore
          all the features of our AI-powered design assistant and see how it can
          enhance your creative process before committing to a subscription.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item
        eventKey="4"
        className="bg-transparent border-0 rounded-0"
      >
        <Accordion.Header>How secure is my data?</Accordion.Header>
        <Accordion.Body className="color-text p-0 pb-3 small">
          We prioritize the security of your data. All your designs and project
          details are stored in secure cloud storage with advanced encryption.
          Enterprise users have access to enhanced security options for added
          peace of mind.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item
        eventKey="5"
        className="bg-transparent border-0 rounded-0"
      >
        <Accordion.Header>What integrations are available?</Accordion.Header>
        <Accordion.Body className="color-text p-0 pb-3 small">
          Our platform seamlessly integrates with popular design and project
          management tools such as Adobe Creative Suite, Figma, and Trello. This
          allows you to streamline your workflow and easily incorporate our
          AI-powered design assistant into your existing processes.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default AllFaqs;
