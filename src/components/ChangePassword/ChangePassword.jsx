import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import styles from './ChangePassword.module.css'
import CloseX from '../../assets/images/Home/x.svg'
import eyeImage from '../../assets/images/Registr/eyePassword.svg'
import eyeCloseImage from '../../assets/images/Registr/eyeClose.svg'
import passwordImg from '../../assets/images/Registr/lock.svg'
import CheckPassword from "../CheckPassword/CheckPassword"
import { changeUser } from "../../redux/slices/usersSlice"
import userApi from "../../api/userApi"
import { useNavigate } from 'react-router'
import Spinner from "../Spinner/Spinner"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import SuccessMessage from "../SuccessMessage/SuccessMessage"
import menotrApi from '../../api/mentorApi'
import { changeMentor } from '../../redux/slices/mentorsSlice'
export default function ChangePassword({ setChangePassword })
{
    const [eye, setEye] = useState(false)
    const [eye2, setEye2] = useState(false)
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState("");
    const [chekP, setChekP] = useState(false)
    const [validP, setValidP] = useState(false)
    const [result, setResult] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [get, setget] = useState({
        condition1: false,
        condition2: false,
        condition3: false,
    })
    const { info } = useSelector(state => state.usersReducer)
    const { loading, error } = info.role === 'Студент' ? useSelector(state => state.usersReducer) : useSelector(state => state.mentorsReducer)
    const chekPassword = (e) =>
    {
        const reg1 = /^[a-zA-Z0-9]+$/
        if (reg1.test(e.target.value)) {
            setget((c) =>
            {
                return {
                    condition1: true,
                    condition2: c.condition2,
                    condition3: c.condition3,
                }
            })
        }
        else { setget((c) => ({ condition1: false, condition2: c.condition2, condition3: c.condition3 })) }

        const reg2 = /^.{6,}$/
        if (reg2.test(e.target.value)) {
            setget((c) => ({ condition1: c.condition1, condition2: true, condition3: c.condition3 }))
        }
        else { setget((c) => ({ condition1: c.condition1, condition2: false, condition3: c.condition3 })) }
        const reg3 = /\d+/
        if (reg3.test(e.target.value)) {
            setget((c) => ({ condition1: c.condition1, condition2: c.condition2, condition3: true }))
        }
        else { setget((c) => ({ condition1: c.condition1, condition2: c.condition2, condition3: false })) }

        if (e.target.value.length < 1) setConfirmPassword('')
    }
    const chekRepeat = (value) =>
    {
        if (value === newPassword) setValidP(true)
        else setValidP(false)
    }
    useEffect(() =>
    {
        document.body.style.overflow = 'hidden';
    }, [])

    const closeModal = (e) =>
    {
        if (!document.querySelector('section').contains(e.target)) {
            document.body.style.overflow = '';
            setChangePassword(false)
        }
        if (result) navigate('/geeks/cabinet')
    }

    const handleClose = () =>
    {
        document.body.style.overflow = '';
        setChangePassword(false)
        if (result) navigate('/geeks/cabinet')
    }
    const handleSubmit = (e) =>
    {
        e.preventDefault();
        if (password === info.password) {
            if (validP && get.condition1 && get.condition2 && get.condition3) {
                setResult(true);
                const requestData = {
                    data: { password: newPassword },
                    api: `${info.role === 'Студент' ? userApi : menotrApi}/${info.id}`
                };
                info.role === 'Студент' ? dispatch(changeUser(requestData))
                    : dispatch(changeMentor(requestData));
            }
            else if (newPassword !== confirmPassword) alert('Пароли не совпадают')
            else {
                alert('Ваш пароль недостаточно надёжен, придумайте надёжный пароль')
            }
        }
        else alert('Вы ввели неправильный пароль')
    }

    return (
        <div onClick={closeModal} className={`${styles.window} window`}>
            <section className={styles.container}>
                <div className={styles.header}>
                    <p>Смена пароля</p>
                    <div className={styles.x}><img onClick={handleClose} src={CloseX} alt="Close x" /></div>
                </div>
                {
                    result ?
                        (loading ?
                            <Spinner />
                            :
                            <div>
                                {error ? <ErrorMessage message={error} /> : <div>
                                    <SuccessMessage message={"Смена пароля прошла успешно"} />
                                </div>}
                            </div>) :
                        <>
                            <p>Для изменения данных пароля мы должны убедиться что вы являетесь владельцем этого аккаунта</p>
                            <form action="" onSubmit={handleSubmit}>
                                <div className={styles.password}>
                                    <label htmlFor="">Старый пароль</label>
                                    <div className={styles.iconInput}><img src={passwordImg} alt="" /></div>
                                    <input required value={password} onChange={e => setPassword(e.target.value)} type={!eye ? "password" : "text"} />
                                    <div onClick={() => setEye(!eye)} className={styles.eye}>
                                        <img src={eye ? eyeImage : eyeCloseImage} alt="img" />
                                    </div>
                                </div>
                                <div className={styles.password}>
                                    <label htmlFor="">Новый пароль</label>
                                    <div className={styles.iconInput}><img src={passwordImg} alt="" /></div>
                                    <input onBlur={() => setChekP(false)} onFocus={() => { setChekP(true) }} value={newPassword} onChange={e =>
                                    {
                                        setNewPassword(e.target.value)
                                        chekPassword(e)
                                        if (confirmPassword.length > 0) chekRepeat(confirmPassword)
                                    }} required type={!eye2 ? "password" : "text"} />
                                    <div onClick={() => setEye2(!eye2)} className={styles.eye}>
                                        <img src={eye2 ? eyeImage : eyeCloseImage} alt="img" />
                                    </div>
                                    {
                                        chekP && <div className={styles.passwordChek}>
                                            <CheckPassword type={get.condition1} text={'Использовать только английские буквы'} />
                                            <CheckPassword type={get.condition2} text={'Не менее 6ти символов'} />
                                            <CheckPassword type={get.condition3} text={'Содержать хотя бы одну цифру'} />
                                        </div>
                                    }
                                </div>
                                <div className={styles.password}>
                                    <label htmlFor="">Повторите новый пароль</label>
                                    <div className={styles.iconInput}><img src={passwordImg} alt="" /></div>
                                    <input style={confirmPassword ? ((validP) ? { border: "4px solid green" } : { border: "4px solid red" }) : { border: "2px solid #D9D9D9" }} value={confirmPassword} onChange={(e) =>
                                    {
                                        setConfirmPassword(e.target.value)
                                        chekRepeat(e.target.value)
                                    }} required type={!eye2 ? "password" : "text"} />
                                    <div onClick={() => setEye2(!eye2)} className={styles.eye}>
                                        <img src={eye2 ? eyeImage : eyeCloseImage} alt="img" />
                                    </div>
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
