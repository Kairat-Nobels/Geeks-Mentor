import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import './swipperSlider.css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-cards';
import MentorCard from '../MentorCard/MentorCard';
import right from '../../assets/images/Home/arrow-right.svg'
import { useLocation } from 'react-router';
function SwipperSlider({ best, data })
{
    const location = useLocation()
    const [wid, setWid] = useState(4)
    window.addEventListener("resize", () =>
    {
        if (window.innerWidth <= 460) setWid(1)
        else setWid(Math.round((+window.innerWidth) / 350))
    })
    useEffect(() =>
    {
        const checkWidth = () =>
        {
            if (window.innerWidth <= 460) setWid(1)
            else setWid(Math.round((+window.innerWidth) / 350))
        }
        checkWidth()
    }, [])
    return (
        <div className='slider'>
            <Swiper
                className="swiper_container"
                effect={'cards'}
                centeredSlidesBounds={true}
                centeredSlides={false}
                centerInsufficientSlides={true}
                loop={true}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                }}
                pagination={{ el: '.swipper-pagination', clickable: true, type: "progressbar" }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    clickable: true,
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                spaceBetween={20}
                gap={20}
                slidesPerView={wid}
                scrollbar={{ draggable: true }}
            >
                {
                    data.map(el => <SwiperSlide style={(wid === 3) ? { margin: ' 0 10px' } : { margin: "0" }} key={el.id} ><MentorCard data={el} best={best} /></SwiperSlide>)
                }
                <div className="navigate"><div className="swipper-pagination"></div></div>
            </Swiper>
            {
                best && location.pathname === '/geeks' &&
                <>
                    <div className="swiper-button-prev ">
                        <div className='imageArrow'><img src={right} alt="img" /></div>
                    </div>
                    <div className="swiper-button-next">
                        <div className='imageArrow'><img src={right} alt="img" /></div>
                    </div>
                </>
            }
        </div>
    );
}

export default SwipperSlider