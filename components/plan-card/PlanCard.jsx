"use client";
import "./plan-card.css";
import { Badge, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { faCheck, faHourglass1 } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loadStripe } from "@stripe/stripe-js";
import { AuthContext } from "@/app/context/Authcontext";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { paymentlink } from "@/utils/service/userlogin";
import Cookies from "js-cookie";
import { Copy } from "lucide-react";
import { toast } from "react-toastify";
const PlanCard = ({
  planid,
  title,
  price,
  description,
  features,
  customClass,
  saveAnnually,
}) => {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [email, setemail] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let token = Cookies.get("authToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      setemail(decodedToken?.email);
    }
  }, []);

  const handlecheckout = async () => {
    if (!isMounted) return;

    if (isLoggedIn === "true" || isLoggedIn === true) {
      const hasActivePlan = Cookies.get("has_active_plan");
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      );

      let body = {
        priceId: planid,
        customerEmail: email,
      };

      try {
        const response = await paymentlink(body);
        const sessionId = response.url;
      
        const result = stripe.redirectToCheckout({ sessionId: sessionId });

        // Change can_access_protected_pages cookie to true
        // const expiresAt = localStorage.getItem("expires_at");
        // if (expiresAt) {
        //   Cookies.set("can_access_protected_pages", "true", {
        //     expires: new Date(expiresAt),
        //     path: "/",
        //     secure: true,
        //     sameSite: "Strict",
        //   });
        // }
        // router.refresh();
      } catch (err) {
        console.log(err);
      }
    } else {
      router.push("/login");
    }
  };
   const copyToClipboard = () => {
    navigator.clipboard.writeText("SCALE");
    toast.success("Code promo copié dans le presse-papiers !");

  };

  return (
    <div
      className={`plan p-3 px-md-2 px-lg-3 py-lg-4 h-100 d-flex flex-column position-relative ${
        customClass ? customClass : ""
      }`}
    >
      {customClass === "your-plan" && (
        <Badge
          bg="light"
          className="color-dark py-2 position-absolute"
          style={{ left: "auto", right: "1rem" }}
        >
          
Actif
        </Badge>
      )}
      <p className="small color-light">{title}</p>
      <h6 className="fs-6 fw-light color-text mb-3 color-light d-flex flex-wrap align-items-center gap-2">
        <span className="me-2 d-inline-flex align-items-center">
          <strong className="fs-2 fs-lg-1 me-2 color-white fw-bold fs-italic">
            {price}€
          </strong>{" "}
          / Mois{" "}
        </span>
        {saveAnnually && (
          <Badge bg="light" className="color-dark py-2">
           
Enregistrer  €{saveAnnually}
          </Badge>
        )}
      </h6>
      <Button
        className="btn-rounded w-100 mb-4 text-capitalize"
        onClick={handlecheckout}
      >
        Commencez votre prospection
      </Button>
      <ul className="ls-none d-flex flex-column gap-4 small mb-5">
        {features.map((feature, index) => {
          return (
            <li key={index} className="position-relative">
              <span className="bg-gray rounded-circle d-flex flex-wrap align-items-center justify-content-center color-theme-25 position-absolute start-0">
                <FontAwesomeIcon icon={faCheck} />
              </span>
              {feature.name}
            </li>
          );
        })}
        {price===199 && (  <div className="bg-purple-700 text-white p-2 rounded-xl text-center shadow-lg max-w-md mx-auto">
      <h2 className="heading-promo font-semibold mb-2">
        Utilisez le code promo ci-dessous :
      </h2>
      <div className="custom-promo text-purple-700 font-bold text-2xl px-6 py-3 rounded-lg inline-block shadow-md">
        SCALE
         <button
        onClick={copyToClipboard}
        className="promocopy bg-purple-100 hover:bg-purple-200 transition"
      >
        <Copy className="w-3 h-3 text-purple-700 text-white" />
      </button>
      </div>
      
      <p className="mt-3 text-sm">
        Appliquez ce code pour obtenir <span className="font-bold">50€ de réduction</span> sur votre abonnement.
      </p>
    </div>)}
      </ul>
    </div>
  );
};

export default PlanCard;
