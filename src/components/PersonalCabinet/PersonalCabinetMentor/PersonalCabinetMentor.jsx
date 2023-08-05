import styles from './PersonalCabinetMentor.module.css'
import editPencil from '../../../assets/images/Home/cabinetPencil.svg'
import ModalDescription from '../../ModalDescription/ModalDescription'
import ModalBusy from '../../ModalBusy/ModalBusy'
import { useEffect, useState } from 'react'
import ModalSkils from '../../ModalSkils/ModalSkils'
import ModalFullName from '../../ModalFullName/ModalFullName'
import { outWebsite } from "../../../redux/slices/entranceSlice.jsx";
import { selectFilter } from "../../../redux/slices/filterSlice.jsx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import plus_icon from '../../../assets/images/Adaptive/plus_icon.svg';
import tel from '../../../assets/images/Home/telegLog.png'
import ModalLanguage from '../../ModalLanguage/ModalLanguage'

const PersonalCabinetMentor = ({ fullName, info, modalName, setModalName, toggleCabinetView, skills, modal, setModal, image, setImage, setSkills }) =>
{
    const [desc, setDesc] = useState(false)
    const [skilModal, setSkilModal] = useState(false)
    const [langModal, setLangModal] = useState(false)
    const [descContent, setDescContent] = useState('Меня зовут Садыр, мне 21 годик. Всегда хотел потыкать компуктер и всё такое. Уже 5 месяцев тыкаю компуктер и рисую квадратики, иногда большие а иногда маленькие. Редко но иногда рисую элипсы. Люблю помогать другим людям тыкать в компуктер')
    const [profesion, setProfesion] = useState('')
    const [month, setMonth] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() =>
    {
        window.scrollTo(0, 0)
        document.body.style.overflow = ''
        if (info) {
            setProfesion(info.course)
            setMonth(info.month)
            setDescContent(info.about)
        }
    }, [])
    const getOut = (e) =>
    {
        e.preventDefault()
        dispatch(outWebsite())
        navigate('/')
        dispatch(selectFilter(''))
    }
    return (
        <main className={styles.cabinetWrapper}>
            <section className={styles.profileWrapper}>
                <section className={styles.profile}>
                    <div className={styles.profile_info}>
                        <div className={styles.profile_info_img}>
                            <img className={styles.ava} src={image} alt="profile image" />
                        </div>
                        <span onClick={() => setModalName(!modalName)} >Изменить фото</span>
                        <div className={styles.profile_info_name}>
                            <div className={styles.profile_info_name_frame}>
                                <p>{fullName}</p>
                                <p className={styles.profile_info_name_frame_hide}>{profesion}, {month === "Выпускник" ? month : month.length > 1 ? month : `${month} - месяц`}</p>
                            </div>
                            <img onClick={() => setModalName(!modalName)} src={editPencil} alt="pencil" />
                        </div>
                    </div>
                    <div className={styles.profile_btn}>
                        <button onClick={toggleCabinetView}>
                            <p>Посмотреть общий вид</p>
                        </button>
                    </div>
                </section>
            </section>
            <div className={styles.hidden_name}>
                <span>ФИО</span>
                <div className={styles.hidden_name_text}>{fullName}</div>
            </div>
            <section className={styles.summaryWrapper}>
                <section className={styles.leftCol}>
                    <div className={styles.leftCol_hoursAndContacts}>
                        <div className={styles.hoursTitle}>
                            <p>Занятость</p>
                            <div onClick={() => { setModal(!modal) }}>Редактировать</div>
                            <img onClick={() => { setModal(!modal) }} src={editPencil} alt="pencil" />
                        </div>
                        <div className={styles.hoursDetails}>
                            <div className={`${styles.hoursDetails_days} ${styles.flexCol}`}>
                                <span>По будням</span>
                                <p>{info.workTimes.dayStart} - {info.workTimes.dayEnd}</p>
                                <div className={styles.hiddenDays}>
                                    <div className={styles.hiddenDays_block}>
                                        <span>с</span>
                                        <div className={styles.hiddenDays_block_time}>{info.workTimes.dayStart}</div>
                                    </div>
                                    <div className={styles.hiddenDays_block}>
                                        <span>до</span>
                                        <div className={styles.hiddenDays_block_time}>{info.workTimes.dayEnd}</div>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.hoursDetails_days} ${styles.flexCol}`}>
                                <span>По выходным</span>
                                <p>{info.workTimes.weekendS} - {info.workTimes.weekendE}</p>
                                <div className={styles.hiddenDays}>
                                    <div className={styles.hiddenDays_block}>
                                        <span>с</span>
                                        <div className={styles.hiddenDays_block_time}>{info.workTimes.weekendS}</div>
                                    </div>
                                    <div className={styles.hiddenDays_block}>
                                        <span>до</span>
                                        <div className={styles.hiddenDays_block_time}>{info.workTimes.weekendE}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.hoursTitle}>
                            <p>Контакты</p>
                        </div>
                        <div className={`${styles.contactDetails} ${styles.flexCol}`}>
                            <p>Telegram</p>
                            <a target="_blank" href={info.tel}>{info.tel.replace("https://t.me/", "@")}</a>
                        </div>
                        <div className={styles.hiddenTelegramm}>
                            <img src={tel} alt="tel" />
                            <a target="_blank" href={info.tel}>{info.tel.replace("https://t.me/", "@")}</a>
                        </div>
                        <div className={styles.language}>
                            <h3>Языки</h3> {
                                info.language.map(l => <p key={l}>{l}</p>)
                            }
                            <img onClick={() => setLangModal(true)} src={editPencil} alt="pencil" />
                        </div>
                    </div>
                </section>
                <section className={styles.rightCol}>
                    <section className={styles.rightCol_partition}>
                        <div className={styles.rightCol_partition_title}>
                            <span >Обо мне</span>
                            <div onClick={() => { setDesc(!desc) }}>Редактировать</div>
                            <p>{profesion}</p>
                            <img onClick={() => { setDesc(!desc) }} src={editPencil} alt="pencil" />
                        </div>
                        <div className={styles.rightCol_partition_desc}>
                            <p>{descContent}</p>
                        </div>
                    </section>
                    <section className={styles.rightCol_partition}>
                        <div className={styles.rightCol_partition_title}>
                            <span>Навыки и умения</span>
                            <p>Навыки и умения</p>
                            <img onClick={() => { setSkilModal(!skilModal) }} src={editPencil} alt="pencil" />
                        </div>
                        <div className={styles.rightCol_partition_desc_second}>
                            <div className={styles.rightCol_partition_skills}>
                                {
                                    skills.map((skill, i) =>
                                        <p key={i}>{skill}</p>
                                    )
                                }
                            </div>
                        </div>
                        <div className={styles.hiddenAddBtn} onClick={() => { setSkilModal(!skilModal) }}>
                            <img src={plus_icon} alt="plus" />
                            <span>Добавить навык</span>
                        </div>
                    </section>
                </section>
            </section>
            {
                modal && <ModalBusy setModal={setModal} info={info} />
            }
            {
                desc && <ModalDescription info={info} setModal={setDesc} descContent={descContent} setDescContent={setDescContent} profesion={profesion} setProfesion={setProfesion} />
            }
            {
                skilModal && <ModalSkils info={info} setModal={setSkilModal} skils={skills} setSkils={setSkills} />
            }
            {modalName && <ModalFullName
                info={info}
                image={image}
                setImage={setImage}
                setModalName={setModalName}
            />}
            {langModal && <ModalLanguage setModal={setLangModal} info={info} />}
            <button onClick={toggleCabinetView} className={styles.hiddenProfileBtn}>Посмотреть общий вид</button>
            <button onClick={getOut} className={styles.hiddenLogOut}>Выйти из аккаунта</button>
        </main>
    )
};

export default PersonalCabinetMentor;