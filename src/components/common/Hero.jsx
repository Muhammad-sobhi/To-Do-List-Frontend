import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CnxVacancy from "../../assets/imgs/cnx.png";
import InVacancy from "../../assets/imgs/touch.png";

const Hero = () => {
  return (
    <section className="hero">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          breakpoints={{
            1024: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
          }}
        >
          <SwiperSlide>
            <div
              className="content"
              style={{ backgroundImage: `url(${InVacancy})` }}
            ></div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="content"
              style={{ backgroundImage: `url(${CnxVacancy})` }}
            ></div>
          </SwiperSlide>
        </Swiper>
      </section>
  )
}

export default Hero