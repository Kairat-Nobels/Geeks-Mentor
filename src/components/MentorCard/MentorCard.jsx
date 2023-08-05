import React, { useEffect, useState } from 'react';
import styles from './mentorCard.module.css'
import mentorCardImage from '../../assets/images/MentorCard/Homek.png'
import star from '../../assets/images/Home/starr.svg'
import tel from '../../assets/images/Home/telegLog.png'
import thumbs_up from '../../assets/images/Home/cabinetYellowThumbsUp.svg'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from '../../redux/slices/filterSlice';
import { changeUser } from '../../redux/slices/usersSlice';
import userApi from '../../api/userApi';
import Spinner from '../Spinner/Spinner';
import favoriteIcon from '../../assets/images/actionsIcons/favorit.svg'

function MentorCard({ data, best })
{
    const [favorite, setFavorite] = useState(false)
    const [infoStudent, setInfoStudent] = useState()
    const [click, setCLick] = useState(false)
    const { info, loading } = useSelector(state => state.usersReducer)
    const dispatch = useDispatch()
    useEffect(() =>
    {
        if (info) {
            setInfoStudent(info)
            if (info.favorites) info.favorites.find(fm => fm.id === data.id) ? setFavorite(true) : setFavorite(false)
        }
        setCLick(false)
    }, [info])
    const addFavorite = (mentor) =>
    {
        setCLick(true)
        let favorites = []
        if (info.favorites) {
            favorite ? favorites = info.favorites.filter(f => f.id !== mentor.id) : favorites = [...info.favorites, mentor]
        }
        else favorites.push(mentor)
        const requestData = {
            data: { favorites: favorites },
            api: `${userApi}/${info.id}`
        };
        dispatch(changeUser(requestData))
    }
    // if (loading && click) return <Spinner />
    return (
        <div className={styles.mentorCard}>
            <div className={styles.mentorImage}>
                {
                    best && <div><img src={star} alt="img" /></div>
                }
                <img src={data.ava ? data.ava : mentorCardImage} alt={'image'} />
            </div>
            <div className={styles.mentorCardContent}>
                <h4>{data ? data.name : "Mentor"}</h4>
                {
                    data ?
                        <span>{data.course}, {data.month === "Выпускник" ? data.month : `${data.month} - месяц`}</span>
                        : <span>5 - месяц</span>
                }

                <div className={styles.reiting}>
                    <p> отзывов {data && `(${data.reviews ? data.reviews.length : 0})`} </p>
                    <div className={styles.thumbs}>
                        <p>{data && data.like}</p>
                        <img src={thumbs_up} alt={'image'} />
                    </div>
                    <div className={styles.thumbs}>
                        <p>{data && data.dislike}</p>
                        <img style={{ transform: "rotate(180deg" }} src={thumbs_up} alt={'image'} />
                    </div>
                    {
                        infoStudent && infoStudent.role === 'Студент' &&
                        <div className={styles.favoriteBtn} onClick={() => addFavorite(data)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill={favorite ? "#FFE600" : "none"} xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    }
                </div>

                <div className={styles.actions}>
                    <NavLink onClick={() => dispatch(selectFilter(data.course))} className={styles.button} to={`/geeks/mentors/${data.id}`}>Посмотреть профиль</NavLink>
                    <a target="_blank" href={data.tel ? data.tel : "https://t.me/kairat_nobels"}><div><img src={tel} alt="img" /></div></a>
                </div>
            </div>
        </div >
    );
}

export default MentorCard;