"use client";
import "./testimonials.css";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import TestimonialCard from "../testimonial-card/TestimonialCard";

const Testimonials = () => {
  const testimonialData = [
    {
      name: "Julie M.",
      role: "Consultante LinkedIn B2B",
      review:
        "Je passais mes soirées à relancer des leads à la main. Depuis ScaleLeads, je reçois des réponses tous les jours sans rien faire. J'ai signé 2 contrats en 3 semaines.",
    },
    {
      name: "Anthony B.",
      role: "Freelance en SEO",
      review:
        "J'ai testé 100 outils d'automatisation. Tous trop complexes. Là, je remplis un formulaire, je connecte mes comptes, et ça tourne. C'est tout ce que je voulais.",
    },
    {
      name: "Fatou D.",
      role: "Coach business pour indépendants",
      review:
        "Avant ScaleLeads, je n'avais aucun système pour prospecter. Maintenant tout est structuré : messages automatiques, relances, suivi… Je gagne du temps et j'ai déjà signé un nouveau client.",
    },
    {
      name: "Lucas T.",
      role: "Co-fondateur d'une agence web",
      review:
        "On cherchait une vraie solution multicanale. Pas des outils à connecter entre eux. ScaleLeads nous a fait gagner un temps monstre. 3 clients closés en 1 mois.",
    },
    {
      name: "Inès R.",
      role: "Copywriter indépendante",
      review:
        "J'ai horreur de prospecter. Là, je fais rien. Et pourtant j'ai des leads qui répondent chaque semaine. J'ai pris l'abonnement annuel direct.",
    },
  ];

  return (
    <div className="testimonials-slider">
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        loop={true}
        centeredSlides={true}
        spaceBetween={24}
        slidesPerView={3}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          576: {
            slidesPerView: 2,
            spaceBetween: 18,
          },
          992: {
            slidesPerView: 3,
          },
        }}
      >
        {testimonialData.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <TestimonialCard {...testimonial} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
