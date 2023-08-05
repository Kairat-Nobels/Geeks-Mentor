import React, { useRef, useState } from "react";
import ReviewCard from '../ReviewCard/ReviewCard'
import { Swiper, SwiperSlide } from "swiper/react";
import right from '../../assets/images/Home/arrow-right.svg'

import "swiper/css";
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "./swiperStyle.css";

import { EffectCoverflow, Pagination, Navigation } from 'swiper';
function ReviewsSlider({ reviews })
{
    return (
        <div className='rewiesCards'>
            <h2>Отзывы</h2>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={!false}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                }}
                pagination={{ el: '.swiper-pagination', clickable: true }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    clickable: true,
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="mySwiper"
            >
                {
                    reviews.map(r => <SwiperSlide key={r.id}><ReviewCard review={r.review} /></SwiperSlide>)
                }
                {/* <SwiperSlide ><ReviewCard review={'Ментор очень хороший, всегда помогает. Самый лучший ментор на свете. Люблю его обожаю, в президенты его'} /></SwiperSlide>
                <SwiperSlide ><ReviewCard review={'Ментор очень хороший, всегда помогает. Самый лучший ментор на свете. Люблю его обожаю, в президенты его'} /></SwiperSlide>
                <SwiperSlide ><ReviewCard review={'Ментор очень хороший, всегда помогает. Самый лучший ментор на свете. Люблю его обожаю, в президенты его'} /></SwiperSlide>
                <SwiperSlide ><ReviewCard review={'Ментор очень хороший, всегда помогает. Самый лучший ментор на свете. Люблю его обожаю, в президенты его'} /></SwiperSlide>
                <SwiperSlide ><ReviewCard review={'Ментор очень хороший, всегда помогает. Самый лучший ментор на свете. Люблю его обожаю, в президенты его'} /></SwiperSlide>
                <SwiperSlide ><ReviewCard review={'Ментор очень хороший, всегда помогает. Самый лучший ментор на свете. Люблю его обожаю, в президенты его'} /></SwiperSlide> */}
                <div className="slider-controler">
                    <div className="swiper-button-prev slider-arrow">
                        <img style={{ transform: "rotate(180deg)" }} src={right} alt="" />
                    </div>
                    <div className="swiper-button-next slider-arrow">
                        <img src={right} alt="" />
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </Swiper>
        </div>
    )
}

export default ReviewsSlider