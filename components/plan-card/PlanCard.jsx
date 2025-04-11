import { Button } from "react-bootstrap";
import "./plan-card.css";
import React from "react";

const PlanCard = ({ title, price, description, features, customClass }) => {
  return (
    <div
      className={`plan bg-gray rounded-4 p-3 h-100 d-flex flex-column color-light ${
        customClass ? customClass : ""
      }`}
    >
      <p className="small">{title}</p>
      <h6 className="fs-1 color-white border-bottom pb-3 mb-3">{price}€/m</h6>
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
