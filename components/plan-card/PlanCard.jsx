import { Button } from "react-bootstrap";
import "./plan-card.css";
import React from "react";

const PlanCard = ({ title, price, description, features, customClass }) => {
  return (
    <div
      className={`plan bg-gray rounded-md-5 p-3 px-md-2 p-lg-4 h-100 d-flex flex-column ${
        customClass ? customClass : ""
      }`}
    >
      <p className="small">{title}</p>
      <h6 className="fs-1 color-white border-bottom pb-3 mb-3 color-light">
        {price}€/m
      </h6>
      <p>{description}</p>
      <ul className="ls-none d-flex flex-column gap-3 small mb-5">
        {features.map((feature, index) => {
          return (
            <li key={index} className="position-relative ps-4">
              {feature}
            </li>
          );
        })}
      </ul>
      <Button className="btn-main btn-main-outlined w-100 mt-auto">
        Démarrer
      </Button>
    </div>
  );
};

export default PlanCard;
