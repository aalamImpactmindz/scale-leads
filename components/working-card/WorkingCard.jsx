import "./working-card.css";
import React from "react";
import Image from "next/image";

const WorkingCard = ({ icon, title, description }) => {
  return (
    <div className="working-card p-3 p-lg-4 bg-gray rounded-5 h-100">
      {icon && (
        <span className="bg-theme rounded-circle p-2 d-inline-flex justify-content-center align-items-center mb-4">
          <Image
            src={icon}
            alt={title || "Icon"}
            width={30}
            height={30}
            className="object-fit-contain"
          />
        </span>
      )}
      <h4 className="fs-2 color-light">{title}</h4>
      <p className="small mt-3 mb-4">{description}</p>
    </div>
  );
};

export default WorkingCard;
