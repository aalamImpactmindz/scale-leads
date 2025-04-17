import "./testimonial-card.css";
import React from "react";
import Image from "next/image";
import imageUser from "@/public/assets/images/user.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";

const TestimonialCard = () => {
  return (
    <div className="testimonial-card border border-gray p-3 p-lg-4 rounded-md-5">
      <div className="testimonial-top d-flex flex-wrap align-items-center justify-content-between mb-4 position-relative">
        <FontAwesomeIcon
          icon={faQuoteRight}
          className="fs-1 color-theme position-absolute end-0 top-0"
        />
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
        <div className="t-t-right pe-5">
          <h6 className="color-light mb-1 text-truncate">Jean M.</h6>
          <p className="small mb-0 text-truncate">Consultant B2B</p>
        </div>
      </div>
      <div className="rating d-flex gap-1 mb-2 small">
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
      </div>
      <h5 className="color-light">Wow! Donec lectus nibh aliquet</h5>
      <p className="small mb-0">
        J'ai eu 6 RDVs en 10 jours sans rien faire. La machine fait tout.
      </p>
    </div>
  );
};

export default TestimonialCard;
