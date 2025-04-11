import "./abonnement.css";
import Faqs from "@/components/faqs/Faqs";
import Plans from "@/components/plans/Plans";
import React from "react";

const Abonnement = () => {
  return (
    <div className="page-abonnement">
      <Plans />
      <Faqs />
    </div>
  );
};

export default Abonnement;
