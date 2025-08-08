"use client";
import "./continuous-slider.css";
import React from "react";
import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import logo1 from "@/public/assets/images/logo-1.png";
import logo2 from "@/public/assets/images/logo-2.png";
import logo3 from "@/public/assets/images/logo-3.png";
import logo4 from "@/public/assets/images/logo-4.png";
import logo5 from "@/public/assets/images/logo-5.png";
import logo6 from "@/public/assets/images/logo-6.png";
import Image from "next/image";

const ContinuousSlider = () => {
  return (
    <div className="continuous-slider sec-padding-small">
      <Container fluid="xl" className="position-relative">
        <Swiper
          modules={[Autoplay]}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={4000}
          slidesPerView={4.6}
          spaceBetween={30}
          grabCursor={false}
          simulateTouch={false}
          breakpoints={{
            0: {
              slidesPerView: 2.2,
            },
            768: {
              slidesPerView: 2.8,
            },
            992: {
              slidesPerView: 3.6,
            },
            1200: {
              slidesPerView: 4.6,
            },
          }}
        >
          <SwiperSlide>
            <Image
              src={logo1}
              alt="Brand Logo"
              width={190}
              height={50}
              priority={true}
              className="object-fit-contain"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={logo2}
              alt="Brand Logo"
              width={190}
              height={50}
              priority={true}
              className="object-fit-contain"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={logo3}
              alt="Brand Logo"
              width={190}
              height={50}
              priority={true}
              className="object-fit-contain"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={logo4}
              alt="Brand Logo"
              width={190}
              height={50}
              priority={true}
              className="object-fit-contain"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={logo5}
              alt="Brand Logo"
              width={190}
              height={50}
              priority={true}
              className="object-fit-contain"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={logo6}
              alt="Brand Logo"
              width={190}
              height={50}
              priority={true}
              className="object-fit-contain"
            />
          </SwiperSlide>
        </Swiper>
      </Container>
    </div>
  );
};

export default ContinuousSlider;
