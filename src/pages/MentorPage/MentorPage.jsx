import styles from './MentorPage.module.css'
import yellowLike from '../../assets/images/Home/cabinetYellowThumbsUp.svg'
import blackDislike from '../../assets/images/MentorCard/blackLike.svg'
import defaultAva from '../../assets/images/defaultAva.svg'
import whiteLike from '../../assets/images/MentorCard/whiteLike.svg'
import { useEffect, useState } from 'react'
import BreadCrums from '../../components/BreadCrums/BreadCrums'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import Spinner from '../../components/Spinner/Spinner'
import mentorApi from '../../api/mentorApi'
import userApi from '../../api/userApi';
import { changeUser } from '../../redux/slices/usersSlice';
import { changeLike } from '../../redux/slices/likesSlice'
import tele from '../../assets/images/Home/telegLog.png'
import ModalReview from '../../components/ModalReview/ModalReview'
import ReviewsSlider from '../../components/ReviewsSlider/ReviewsSlider'
import favoriteIcon from '../../assets/images/actionsIcons/favorit.svg'

function MentorPage()
{
    const data = JSON.parse(localStorage.getItem('data'))
    const [favorite, setFavorite] = useState(false)
    const [skills, setSkills] = useState([])
    const [likedIds, setLikedIds] = useState([])
    const [dislikeIds, setDislikeIds] = useState([])
    const [like, setLike] = useState(false)
    const [likeCount, setLikeCount] = useState('')
    const [DislikeCount, setDislikeCount] = useState('')
    const [user, setUser] = useState('')
    const [dislike, setDislike] = useState(false)
    const [modal, setModal] = useState(0)
    const [reviews, setReviews] = useState([])
    const [userReview, setUserReview] = useState('')
    const [mentor, setMentor] = useState('')
    const { id } = useParams()
    const { mentors } = useSelector(state => state.mentorsReducer)
    const { users, loading, info } = useSelector(state => state.usersReducer)
    const { likesInfo } = useSelector(state => state.likesReducer)
    const dispatch = useDispatch()
    const handleLike = (r) =>
    {
        if (data.role === 'Студент') {
            const requestData = {
                data: {
                    like: like ? likeCount - 1 : likeCount + 1,
                    likedId: !like ? [...likedIds, user.id] : likedIds.filter(id => id !== user.id),
                    dislike: dislike ? DislikeCount - 1 : DislikeCount,
                    dislikedId: dislike ? dislikeIds.filter(id => id !== user.id) : dislikeIds,
                    reviews: dislike ? [...(reviews.filter(fr => fr.id !== user.id)), { id: user.id, review: r }] : userReview ? reviews.filter(fr => fr.id !== user.id) : [...reviews, { id: user.id, review: r }]
                },
                api: `${mentorApi}/${mentor.id}`
            };
            dispatch(changeLike(requestData))
            dislike && setDislike(false)
            setLike(!like)
        }
    }
    const handleDislike = (r) =>
    {
        if (data.role === 'Студент') {
            const requestData = {
                data: {
                    dislike: dislike ? DislikeCount - 1 : DislikeCount + 1,
                    dislikedId: !dislike ? [...dislikeIds, user.id] : dislikeIds.filter(id => id !== user.id),
                    like: like ? likeCount - 1 : likeCount,
                    likedId: like ? likedIds.filter(id => id !== user.id) : likedIds,
                    reviews: like ? [...(reviews.filter(fr => fr.id !== user.id)), { id: user.id, review: r }] : userReview ? reviews.filter(fr => fr.id !== user.id) : [...reviews, { id: user.id, review: r }]
                },
                api: `${mentorApi}/${mentor.id}`
            };
            dispatch(changeLike(requestData))
            like && setLike(false)
            setDislike(!dislike)
        }
    }
    const addFavorite = (mentor) =>
    {
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
    useEffect(() =>
    {
        window.scrollTo(0, 0)
    }, [])
    useEffect(() =>
    {
        if (info) {
            if (info.favorites) info.favorites.find(fm => fm.id === mentor.id) ? setFavorite(true) : setFavorite(false)
        }
    }, [info, mentor])
    useEffect(() =>
    {
        if (likesInfo) {
            setLikeCount(likesInfo.like)
            setDislikeCount(likesInfo.dislike)
            likesInfo.reviews && setReviews(likesInfo.reviews)
            likesInfo.reviews && setUserReview(likesInfo.reviews.find(r => r.id === user.id))
        }
    }, [likesInfo])
    useEffect(() =>
    {
        setUser((data.role === 'Студент' ? users : mentors).find(user => user.email === data.email))
    }, [mentors, users])
    useEffect(() =>
    {
        const ment = mentors.find(men => men.id == parseInt(id))
        ment && setMentor(ment)
        ment && setSkills(ment.skils)
        ment && setLikeCount(ment.like)
        ment && setDislikeCount(ment.dislike)
        if (ment && user) {
            if (ment.likedId) setLikedIds(ment.likedId)
            if (ment.dislikeId) setDislikeIds(ment.dislikeId)
            if (ment.likedId && ment.likedId.includes(user.id)) {
                setLike(true);
            }
            if (ment.dislikedId && ment.dislikedId.includes(user.id)) {
                setDislike(true);
            }
            if (ment.reviews) {
                setReviews(ment.reviews)
                setUserReview(ment.reviews.find(r => r.id === user.id))
            }
        }

    }, [mentors, user])
    if (loading) return <Spinner />
    return (
        <>
            {mentor && <BreadCrums onProfile={mentor} />}
            {
                mentor ?
                    <main style={{ margin: "31px auto 130px" }} className={styles.cabinetWrapper}>
                        <section className={styles.profileWrapper}>
                            <section className={styles.profile}>
                                <div className={styles.profile_info}>
                                    <div className={styles.profile_info_img}>
                                        <img className={styles.ava} src={mentor.ava ? mentor.ava : defaultAva} alt="profile image" />
                                    </div>
                                    <div className={styles.profile_info_name}>
                                        <img className={styles.hiddenAva} src={mentor.ava ? mentor.ava : defaultAva} alt="profile image" />
                                        <div className={styles.profile_info_name_frame}>
                                            <div className={styles.profile_info_name_frame_top}>
                                                <p>{mentor.name}</p>
                                                <div className={styles.profile_info_name_frame_likeDislike}>
                                                    <p>{likeCount}</p>
                                                    <img src={yellowLike} alt='like' />
                                                </div>
                                                <div className={styles.profile_info_name_frame_likeDislike}>
                                                    <p>{DislikeCount}</p>
                                                    <img src={yellowLike} style={{ transform: "rotate(180deg" }} alt='dislike' />
                                                </div>
                                            </div>
                                            <p>{mentor.course}, {mentor.month === "Выпускник" ? mentor.month : `${mentor.month} - месяц`}</p>
                                            <div className={styles.hiddenLikeDislike}>
                                                <div>
                                                    <p>{likeCount}</p>
                                                    <img src={yellowLike} alt='like' />
                                                </div>
                                                <div className={styles.hiddenDislike}>
                                                    <p>{DislikeCount}</p>
                                                    <img src={yellowLike} style={{ transform: "rotate(180deg" }} alt='dislike' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    data.role === "Студент" &&
                                    <div className={styles.profile_btn}>
                                        <div onClick={() => addFavorite(mentor)} className={styles.favoriteBtn}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill={favorite ? "#FFE600" : "none"} xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <p>{favorite ? "Удалить из избранного" : "Добавить в избранное"}</p>
                                        </div>
                                        <div onClick={() =>
                                        {
                                            dislike ? setModal(1) :
                                                userReview ? handleLike(userReview.review) : setModal(1)
                                        }}><img src={like ? yellowLike : whiteLike} alt='white-like' /></div>
                                        <div onClick={() =>
                                        {
                                            like ? setModal(2) :
                                                userReview ? handleDislike(userReview.review) : setModal(2)
                                        }}><img src={dislike ? blackDislike : whiteLike} style={dislike ? { transform: "rotate(0)" } : { transform: 'rotate(180deg)' }} alt='white-like' /></div>
                                    </div>
                                }
                                <a target="_blank" href={mentor.tel} className={styles.hiddenContactDetails}>
                                    <p>Перейти в Telegram</p>
                                    <img src={tele} alt='telegram' />
                                </a>
                                <div className={styles.hiddenProfileBtn}>
                                    <p>Оцените ментора</p>
                                    <div className={styles.hiddenFrameBtn}>
                                        <div onClick={() => addFavorite(mentor)} className={styles.favoriteBtn}>
                                            <svg width="34" height="34" viewBox="0 0 24 24" fill={favorite ? "#FFE600" : "none"} xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div onClick={() =>
                                        {
                                            dislike ? setModal(1) :
                                                userReview ? handleLike(userReview.review) : setModal(1)
                                        }}><img src={like ? yellowLike : whiteLike} alt='white-like' /></div>
                                        <div onClick={() =>
                                        {
                                            like ? setModal(2) :
                                                userReview ? handleDislike(userReview.review) : setModal(2)
                                        }}><img src={dislike ? blackDislike : whiteLike} style={dislike ? { transform: "rotate(0)" } : { transform: 'rotate(180deg)' }} alt='white-like' /></div>
                                    </div>
                                </div>
                            </section>
                        </section>
                        <section className={styles.summaryWrapper}>
                            <section className={styles.leftCol}>
                                <div className={styles.leftCol_hoursAndContacts}>
                                    <div className={styles.hoursTitle}>
                                        <p>Занятость</p>
                                    </div>
                                    <div className={styles.hoursDetails}>
                                        <div className={styles.hoursDetails_days}>
                                            <p>По будням</p>
                                            <p>{mentor?.workTimes.dayStart} - {mentor.workTimes.dayEnd}</p>
                                        </div>
                                        <div className={styles.hoursDetails_days}>
                                            <p>По выходным</p>
                                            <p>{mentor.workTimes.weekendS} - {mentor.workTimes.weekendE}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.hoursTitle} ${styles.hiddenContact}`}>
                                        <p>Контакты</p>
                                    </div>
                                    <div className={styles.contactDetails}>
                                        <p>Telegram</p>
                                        <a target="_blank" href={mentor.tel}>{mentor.tel.replace("https://t.me/", "@")}</a>
                                    </div>
                                    <div className={styles.languages}><h3>Языки</h3> {
                                        mentor.language.map(l => <p key={l}>{l}</p>)
                                    }</div>
                                </div>
                            </section>
                            <section className={styles.rightCol}>
                                <section className={styles.rightCol_partition}>
                                    <div className={styles.rightCol_partition_title}>
                                        <p>{mentor.course}</p>
                                    </div>
                                    <div className={styles.rightCol_partition_desc}>
                                        <p>{mentor.about}</p>
                                    </div>
                                </section>
                                <section className={styles.rightCol_partition}>
                                    <div className={styles.rightCol_partition_title}>
                                        <p>Навыки и умения</p>
                                    </div>
                                    <div className={styles.rightCol_partition_desc}>
                                        <div className={styles.rightCol_partition_skills}>
                                            {
                                                skills.map((skill, i) =>
                                                    <p key={i}>{skill}</p>
                                                )
                                            }
                                        </div>
                                    </div>
                                </section>
                            </section>
                        </section>
                        {
                            modal > 0 && <ModalReview userReview={userReview} setModal={setModal} handleS={modal === 1 ? handleLike : (modal === 2 && handleDislike)} />
                        }
                        {
                            reviews.length > 0 ? <ReviewsSlider reviews={reviews} /> : <p className={styles.emptyReviews}>Отзывов нету</p>
                        }
                    </main>
                    :
                    <Spinner />
            }
        </>
    )
}

export default MentorPage