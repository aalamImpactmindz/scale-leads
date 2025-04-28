import "./heading.css";
import React from "react";

const Heading = ({
  title,
  highlightedWords = [],
  description,
  customClass,
}) => {
  const getHighlightedText = (text, highlights) => {
    const escapedWords = highlights.map((word) =>
      word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    );
    const regex = new RegExp(`(${escapedWords.join("|")})`, "gi");

    const parts = text.split(regex);

    return parts.map((part, i) =>
      highlights.some((word) => word.toLowerCase() === part.toLowerCase()) ? (
        <span key={i} className="color-theme">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className={`heading mb-5 ${customClass ? customClass : ""}`}>
      <h2 className="display-6 fw-semibold color-light">
        {getHighlightedText(title, highlightedWords)}
      </h2>
      {description && <p>{description}</p>}
    </div>
  );
};

export default Heading;
