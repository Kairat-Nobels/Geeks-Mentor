import styles from './personalCabinetStudent.module.css'
import { useEffect, useState } from 'react'
import editPencil from '../../../assets/images/Home/cabinetPencil.svg'
import ModalFullName from '../../ModalFullName/ModalFullName';
import ChangeProfileModal from '../../ChangeProfileModal/ChangeProfileModal';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { outWebsite } from '../../../redux/slices/entranceSlice'
import { selectFilter } from '../../../redux/slices/filterSlice'

const PersonalCabinetStudent = ({ fullName, info, image, setImage }) =>
{
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [profesion, setProfesion] = useState('')
    const [month, setMonth] = useState('')
    const [email, setEmail] = useState('')
    const [modalStudent, setModalStudent] = useState(false)
    const [modalStudentInfo, setModalStudentInfo] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    useEffect(() =>
    {
        if (info) {
            setProfesion(info.course)
            setMonth(info.month)
            setEmail(info.email)
        }
    }, [info])
    useEffect(() =>
    {
        window.scrollTo(0, 0)
        document.body.style.overflow = ''
        if (fullName.includes(' ')) {
            const [Name, lName] = fullName.split(" ");
            setFirstName(Name)
            setLastName(lName)
        }
        else {
            setFirstName(fullName)
            setLastName(fullName)
        }
    })

    const getOut = (e) =>
    {
        e.preventDefault()
        dispatch(outWebsite())
        navigate('/')
        dispatch(selectFilter(''))
    }

    return (
        <main className={styles.studentWrapper}>
            <section className={styles.studentProfile}>
                <div className={styles.studentProfile_header}>
                    <div className={styles.ava}>
                        <img src={image} alt='avatar' />
                    </div>
                    <div className={styles.title}>
                        <p className={styles.title_name}>{fullName}</p>
                        <div className={styles.title_course}>
                            <p>{profesion}, {month === "Выпускник" ? month : month.length > 1 ? month : `${month} - месяц`}</p>
                        </div>
                    </div>
                    <div className={styles.edit}>
                        <p onClick={() => setModalStudent(!modalStudent)} className={styles.editImg}>Изменить фото</p>
                        <img onClick={() => setModalStudent(!modalStudent)} src={editPencil} alt='edit-pencil' />
                    </div>
                </div>
            </section>
            <section className={styles.studentInfo}>
                <div className={styles.studentInfo_body}>
                    <div className={styles.content}>
                        <div className={styles.content_details}>
                            <div className={styles.content_details_col}>
                                <p className={styles.nameTitle}>Имя</p>
                                <p className={styles.hiddenNameTitle}>ФИО</p>
                                <p className={styles.cred}>{firstName} <span className={styles.hidden}>{lastName}</span> </p>
                            </div>
                            <div className={styles.hiddenEmailCol}>
                                <p>Почта</p>
                                <p className={styles.cred}>{email}</p>
                            </div>
                            <div className={styles.hiddenLastName}>
                                <p>Фамилия</p>
                                <p className={styles.cred}>{lastName}</p>
                            </div>
                        </div>
                        <div className={styles.content_details}>
                            <div className={styles.content_details_col}>
                                <p>Направление</p>
                                <p className={styles.cred}>{profesion}</p>
                            </div>
                            <div className={styles.content_details_col}>
                                <p>Месяц обучения</p>
                                <p className={styles.cred}>{month === "Выпускник" ? month : month.length > 1 ? month : `${month} - месяц`}</p>
                            </div>
                        </div>
                        <div className={`${styles.content_details} ${styles.last}`}>
                            <div className={styles.content_details_col}>
                                <p>Почта</p>
                                <p className={styles.cred}>{email}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.editInfo}>
                        <img onClick={() => setModalStudentInfo(!modalStudentInfo)} src={editPencil} alt='edit-pencil' />
                    </div>
                </div>
            </section>
            {modalStudent && <ModalFullName
                info={info}
                image={image}
                setImage={setImage}
                setModalName={setModalStudent}
            />}
            {
                modalStudentInfo && <ChangeProfileModal
                    profession={profesion}
                    info={info}
                    setModalStudentInfo={setModalStudentInfo}
                    month={month}
                    setMonth={setMonth}
                />
            }
            <button onClick={() => setModalStudentInfo(!modalStudentInfo)} className={styles.hiddenChange}>Редактировать данные</button>
            <button onClick={getOut} className={styles.hiddenLogOut}>Выйти из аккаунта</button>
        </main>
    )
};

export default PersonalCabinetStudent;
