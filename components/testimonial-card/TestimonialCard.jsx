import "./testimonial-card.css";
import React from "react";
import Image from "next/image";
import imageUser from "@/public/assets/images/user.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const TestimonialCard = ({ name, role, review }) => {
  return (
    <div className="testimonial-card p-3 p-lg-4">
      <div className="testimonial-top d-flex flex-wrap align-items-center justify-content-between mb-4 position-relative">
        <div className="t-t-left">
          <Image
            src={imageUser}
            alt="User"
            width={50}
            height={50}
            priority={false}
            className="object-fit-cover rounded-circle"
          />
        </div>
        <div className="t-t-right">
          <h6 className="color-light mb-1 text-truncate">{name}</h6>
          <p className="small mb-0 text-truncate">{role}</p>
        </div>
      </div>
      <div className="testimonial-bottom">
        <p className="small mb-0">{review}</p>
        <div className="rating d-flex gap-1 mb-2 mt-5 small">
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
