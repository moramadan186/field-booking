import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Keyboard, Mousewheel, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

import Club1 from "../../assets/club1.jpeg";
import Club2 from "../../assets/club2.jpeg";
import Club3 from "../../assets/club3.jpeg";
import Club4 from "../../assets/club4.jpeg";

const popularClubs = [Club1, Club2, Club3, Club4];

const ClubCard = ({ clubSrc }) => {
  return (
    <div href="#" className="grid-item">
      <div className="list-img">
        <img src={clubSrc} alt="club1" />
      </div>
      <div className="des">
        <h3>Club 3</h3>
        <hr />
        <div className="text">
          <div className="moretext">
            <p className="time">1hr</p>
            <del>130$</del> 100$
          </div>
        </div>
        <button className="read-more-btn">Book now</button>
      </div>
    </div>
  );
};
const Popular = () => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        freeMode={true}
        grabCursor={true}
        loop={true}
        keyboard={{
          enabled: true,
        }}
        // mousewheel={true}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        modules={[Pagination, FreeMode, Keyboard, Mousewheel, Autoplay]}
        className="mySwiper"
      >
        {popularClubs.map((clubSrc) => (
          <SwiperSlide>
            <ClubCard clubSrc={clubSrc} />
          </SwiperSlide>
        ))}
        {popularClubs.map((clubSrc) => (
          <SwiperSlide>
            <ClubCard clubSrc={clubSrc} />
          </SwiperSlide>
        ))}
        {popularClubs.map((clubSrc) => (
          <SwiperSlide>
            <ClubCard clubSrc={clubSrc} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Popular;
