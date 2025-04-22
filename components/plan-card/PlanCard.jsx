import "./plan-card.css";
import { Button } from "react-bootstrap";
import React from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PlanCard = ({ title, price, description, features, customClass }) => {
  return (
    <div
      className={`plan p-3 px-md-2 p-lg-4 h-100 d-flex flex-column ${
        customClass ? customClass : ""
      }`}
    >
      <p className="small color-light">{title}</p>
      <h6 className="fs-6 fw-light color-text mb-3 color-light d-flex flex-wrap align-items-center">
        <span className="fs-1 me-2 color-white fw-bold">{price}€</span> / Month
      </h6>
      <Button className="btn-rounded w-100 mb-4 text-capitalize">
        Start your project
      </Button>
      <ul className="ls-none d-flex flex-column gap-4 small mb-5">
        {features.map((feature, index) => {
          return (
            <li key={index} className="position-relative ps-5">
              <span className="bg-gray rounded-circle d-flex flex-wrap align-items-center justify-content-center color-theme-25 position-absolute start-0">
                <FontAwesomeIcon icon={faCheck} />
              </span>
              {feature}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PlanCard;
