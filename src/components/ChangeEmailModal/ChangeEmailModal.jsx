import { useState, useEffect } from "react"
import styles from './ChangeEmailModal.module.css'
import CloseX from '../../assets/images/Home/x.svg'
import emailImg from '../../assets/images/Home/mailBlack.svg'
import passwordImg from '../../assets/images/Registr/lock.svg'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router'
import userApi from "../../api/userApi"
import { changeUser } from "../../redux/slices/usersSlice"
import Spinner from "../Spinner/Spinner"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import SuccessMessage from "../SuccessMessage/SuccessMessage"
import menotrApi from '../../api/mentorApi'
import { changeMentor } from '../../redux/slices/mentorsSlice'

export default function ChangeEmailModal({ setChangeEmail })
{
    const [mail, setMail] = useState(false)
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [valid, setValid] = useState(true)
    const [result, setResult] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { info } = useSelector(state => state.usersReducer)
    const { loading, error } = info.role === 'Студент' ? useSelector(state => state.usersReducer) : useSelector(state => state.mentorsReducer)
    useEffect(() =>
    {
        document.body.style.overflow = 'hidden';
    }, [])

    const closeModal = (e) =>
    {
        if (!document.querySelector('section').contains(e.target)) {
            document.body.style.overflow = '';
            setChangeEmail(false)
        }
        if (result) navigate('/geeks/cabinet')
    }

    const handleClose = () =>
    {
        document.body.style.overflow = '';
        setChangeEmail(false)
        if (result) navigate('/geeks/cabinet')
    }
    const chekEmail = (e) =>
    {
        const emailReg = /^[a-zA-Z0-9_.-]+[A-Za-z0-9]+@[a-z]+\.(com|ru)$/;
        if (emailReg.test(e.target.value) && (e.target.value.length > 0)) setValid(true)
        else setValid(false)
    }
    const handleSubmit = (e) =>
    {
        e.preventDefault();
        if (password === info.password) {
            if (valid) {
                setResult(true);
                const requestData = {
                    data: { email: email },
                    api: `${info.role === 'Студент' ? userApi : menotrApi}/${info.id}`
                };
                info.role === 'Студент' ? dispatch(changeUser(requestData))
                    : dispatch(changeMentor(requestData));
            }
            else alert('Неправильная адресс электронной почты')
        }
        else alert('Вы ввели неправильный пароль')
    }

    return (
        <div onClick={closeModal} className={`${styles.window} window`}>
            <section className={styles.container}>
                <div className={styles.header}>
                    <p>Смена эл.почты</p>
                    <div className={styles.x}><img onClick={handleClose} src={CloseX} alt="Close x" /></div>
                </div>
                {
                    result ?
                        (loading ?
                            <Spinner />
                            :
                            <div>
                                {error ? <ErrorMessage message={error} /> : <div>
                                    <SuccessMessage message={"Смена Электронной почты прошла успешно"} />
                                </div>}
                            </div>) :
                        <>
                            <p>Для изменения данных эл.почты мы должны убедиться что вы являетесь владельцем этого аккаунта</p>
                            <form onSubmit={handleSubmit} action="">
                                <div className={styles.email}>
                                    <label htmlFor="">Пароль</label>
                                    <div className={styles.iconInput}><img src={passwordImg} alt="" /></div>
                                    <input required value={password} onChange={(e) => setPassword(e.target.value)} type={!mail ? "password" : "text"} />
                                </div>
                                <div className={styles.password}>
                                    <label htmlFor="">Новая эл.почта</label>
                                    <div className={styles.iconInput}><img src={emailImg} alt="" /></div>
                                    <input required value={email} onChange={(e) =>
                                    {
                                        setEmail(e.target.value)
                                        chekEmail(e)
                                    }
                                    } type={!mail && "text"} />
                                    {
                                        !valid && email.length > 0 && <p className={styles.notCorrect}>Некоректный адресс почты</p>
                                    }
                                </div>
                                <div className={styles.btns}>
                                    <button type="button" onClick={handleClose} className={styles.canselBtn}>Отмена</button>
                                    <button className={styles.saveBtn}>Подтвердить</button>
                                </div>
                            </form>
                        </>
                }
            </section>
        </div>
    )
}
