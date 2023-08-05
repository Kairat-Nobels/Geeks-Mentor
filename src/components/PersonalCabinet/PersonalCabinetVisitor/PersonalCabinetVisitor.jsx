import styles from '../personalCabinet.module.css'
import yellowLike from '../../../assets/images/Home/cabinetYellowThumbsUp.svg'
import whiteLike from '../../../assets/images/Home/cabinetWhiteThumbsUp.svg'
import { useEffect, useState } from 'react'
import tele from '../../../assets/images/Home/telegLog.png'

const PersonalCabinetVisitor = ({ fullName, info, image, skills, toggleCabinetView, like, dislike }) =>
{
    const [profesion, setProfesion] = useState('')
    const [month, setMonth] = useState('')
    const getOut = (e) =>
    {
        e.preventDefault()
        dispatch(outWebsite())
        navigate('/')
        dispatch(selectFilter(''))
    }
    useEffect(() =>
    {
        window.scrollTo(0, 0)
        document.body.style.overflow = ''
        if (info) {
            setProfesion(info.course)
            setMonth(info.month)
        }
    }, [])
    return (
        <main className={styles.cabinetWrapper}>
            <section className={styles.profileWrapper}>
                <section className={styles.profile}>
                    <div className={styles.profile_info}>
                        <div className={styles.profile_info_img}>
                            <img className={styles.ava} src={image} alt="profile image" />
                        </div>
                        <div className={styles.profile_info_name}>
                            <img className={styles.hiddenAva} src={image} alt="profile image" />
                            <div className={styles.profile_info_name_frame}>
                                <div className={styles.profile_info_name_frame_top}>
                                    <p>{fullName}</p>
                                    <div className={styles.profile_info_name_frame_likeDislike}>
                                        <p>{like}</p>
                                        <img src={yellowLike} alt='like' />
                                    </div>
                                    <div className={styles.profile_info_name_frame_likeDislike}>
                                        <p>{dislike}</p>
                                        <img src={yellowLike} style={{ transform: "rotate(180deg)" }} alt='dislike' />
                                    </div>
                                </div>
                                <p>{profesion}, {month === "Выпускник" ? month : `${month} - месяц`}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.profile_btn}>
                        <img src={whiteLike} alt='white-like' />
                        <img src={whiteLike} style={{ transform: "rotate(180deg" }} alt='white-like' />
                        <button onClick={toggleCabinetView}>
                            <p>Редактировать</p>
                        </button>
                    </div>
                    <a target="_blank" href={info.tel} className={styles.hiddenContactDetails}>
                        <p>Перейти в Telegram</p>
                        <img src={tele} alt='telegram' />
                    </a>
                    <div className={styles.hiddenProfileBtn}>
                        <p>Оцените ментора</p>
                        <div className={styles.hiddenFrameBtn}>
                            <div><img src={whiteLike} alt='white-like' /></div>
                            <div><img src={whiteLike} style={{ transform: "rotate(180deg" }} alt='white-like' /></div>
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
                                <p>{info.workTimes.dayStart} - {info.workTimes.dayEnd}</p>
                            </div>
                            <div className={styles.hoursDetails_days}>
                                <p>По выходным</p>
                                <p>{info.workTimes.weekendS} - {info.workTimes.weekendE}</p>
                            </div>
                        </div>
                        <div className={styles.hoursTitle}>
                            <p>Контакты</p>
                        </div>
                        <div className={`${styles.contactDetails} ${styles.flexCol}`}>
                            <p>Telegram</p>
                            <a target="_blank" href={info.tel}>{info.tel.replace("https://t.me/", "@")}</a>
                        </div>
                        <div className={styles.languages}><h3>Языки</h3> {
                            info.language.map(l => <p key={l}>{l}</p>)
                        }</div>
                    </div>
                </section>
                <section className={styles.rightCol}>
                    <section className={styles.rightCol_partition}>
                        <div className={styles.rightCol_partition_title}>
                            <p>{profesion}</p>
                        </div>
                        <div className={styles.rightCol_partition_desc}>
                            <p>{info.about}</p>
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
            <button onClick={toggleCabinetView} className={styles.hiddenProfileBtn}>Редактировать</button>
            <button onClick={getOut} className={styles.hiddenLogOut}>Выйти из аккаунта</button>
        </main>
    )
}

export default PersonalCabinetVisitor;