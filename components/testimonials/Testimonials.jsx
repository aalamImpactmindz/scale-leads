"use client";
import "./testimonials.css";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import TestimonialCard from "../testimonial-card/TestimonialCard";
import { Pagination } from "swiper/modules";

const Testimonials = () => {
  return (
    <div className="testimonials-slider">
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        loop={true}
        slidesPerView={3}
        // slidesPerGroup={3}
        centeredSlides={true}
        spaceBetween={24}
        breakpoints={{
          0: {
            slidesPerView: 1,
            // slidesPerGroup: 1,
            spaceBetween: 15,
          },
          576: {
            slidesPerView: 2,
            // slidesPerGroup: 2,
            spaceBetween: 18,
          },
          992: {
            slidesPerView: 3,
            // slidesPerGroup: 3,
          },
        }}
      >
        <SwiperSlide>
          <TestimonialCard />
        </SwiperSlide>
        <SwiperSlide>
          <TestimonialCard />
        </SwiperSlide>
        <SwiperSlide>
          <TestimonialCard />
        </SwiperSlide>
        <SwiperSlide>
          <TestimonialCard />
        </SwiperSlide>
        <SwiperSlide>
          <TestimonialCard />
        </SwiperSlide>
        <SwiperSlide>
          <TestimonialCard />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Testimonials;
