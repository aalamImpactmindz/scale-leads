import "./working-card.css";
import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WorkingCard = ({ icon, title, description }) => {
  return (
    <div className="working-card p-3 p-lg-4 bg-gray h-100">
      {icon && (
        <span className="bg-theme-25 rounded-circle p-2 d-inline-flex justify-content-center align-items-center mb-4">
          {/* <Image
            src={icon}
            alt={title || "Icon"}
            width={30}
            height={30}
            className="object-fit-contain"
          /> */}
          <FontAwesomeIcon icon={icon} className="color-light" />
        </span>
      )}
      <h4 className="fs-2 color-light">{title}</h4>
      <p className="small mt-3 mb-4">{description}</p>
    </div>
  );
};

export default WorkingCard;
