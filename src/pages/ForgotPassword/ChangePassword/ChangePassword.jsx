import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from 'react-router-dom'
import Header from '../../../components/Header/Header'
import CheckPassword from "../../../components/CheckPassword/CheckPassword"
import arrowLeft from '../../../assets/images/Registr/arrow-left.svg'
import eyeImage from '../../../assets/images/Registr/eyePassword.svg'
import passwordImg from '../../../assets/images/Registr/lock.svg'
import eyeCloseImage from '../../../assets/images/Registr/eyeClose.svg'
import styles from './ChangePassword.module.css'
import SubmitBtn from '../../../UI/SubmitBtn/SubmitBtn'
import PasswordPop from '../../../components/PasswordPop/PasswordPop'
import { getUsers } from '../../../redux/slices/usersSlice'
import userApi from '../../../api/userApi'
import { changeMentor, getMentors } from '../../../redux/slices/mentorsSlice'
import menotrApi from '../../../api/mentorApi'
function ChangePassword()
{
    const data = JSON.parse(localStorage.getItem('email'))
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validP, setValidP] = useState(false)
    const [eye, setEye] = useState(false)
    const [chekP, setChekP] = useState(false)
    const [result, setResult] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [get, setget] = useState({
        condition1: false,
        condition2: false,
        condition3: false,
    })
    const { users } = useSelector(state => state.usersReducer)
    const { mentors } = useSelector(state => state.mentorsReducer)

    const dispatch = useDispatch()
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

    const chekRepeat = (e) =>
    {
        if (e.target.value === password) setValidP(true)
        else setValidP(false)
    }
    const handleSubmit = (e) =>
    {
        e.preventDefault()
        if (validP && get.condition1 && get.condition2 && get.condition3) {
            const api = `${data.role === 'Студент' ? userApi : menotrApi}/${data.id}`
            handlePut(api)
        }
        else {
            alert('Ваш пароль недостаточно надёжен, придумайте надёжный пароль')
        }
    }

    const handlePut = (id) =>
    {
        setLoading(true)
        setResult(true)
        fetch(id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json' // Установка заголовка Content-Type
            },
            body: JSON.stringify({ password: password })
        })
            .then(response => response.json())
            .then(data =>
            {
                console.log(data);
                setLoading(false)
            })
            .catch(error =>
            {
                setLoading(false)
                setError(`Ошибка: ${error}`) // Обработка возможных ошибок
            });
    }
    useEffect(() =>
    {
        localStorage.removeItem('code')
        if (users.length === 0) dispatch(getUsers(userApi))
        if (mentors.length === 0) dispatch(getMentors(`${menotrApi}?sortBy=like&order=desc`))
    }, [])
    return (
        <div className={styles.Page}>
            <Header />
            <div className={`${styles.confirm} container`}>
                <div className={styles.head}>
                    <NavLink to={'/confirm'}><div><img src={arrowLeft} alt="img" /></div></NavLink>
                    <h1>Придумайте новый пароль</h1>
                </div>
                <p>Придумайте надёжный пароль и не сообщайте его никому</p>
                <form onSubmit={handleSubmit} action="">
                    <div className={styles.password}>
                        <label htmlFor="">Новый пароль</label>
                        <div className={styles.iconInput}><img src={passwordImg} alt="" /></div>
                        <input onBlur={() => setChekP(false)} onFocus={() => { setChekP(true) }} value={password} onChange={(e) =>
                        {
                            setPassword(e.target.value);
                            chekPassword(e)
                        }} required type={!eye ? "password" : "text"} />
                        <div onClick={() => setEye(!eye)} className={styles.eye}>
                            <img src={eye ? eyeImage : eyeCloseImage} alt="img" />
                        </div>
                        {
                            chekP && <div className={styles.passwordChek}>
                                <CheckPassword type={get.condition1} text={'Использовать только английские буквы'} />
                                <CheckPassword type={get.condition2} text={'Не менее 6ти символов'} />
                                <CheckPassword type={get.condition3} text={'Содержать хотя бы одну цифру'} />
                            </div>
                        }
                    </div>
                    <div className={styles.repeat}>
                        <label htmlFor="">Повторите новый пароль</label>
                        <div className={styles.iconInput}><img src={passwordImg} alt="" /></div>
                        <input style={confirmPassword ? ((validP) ? { border: "4px solid green" } : { border: "4px solid red" }) : { border: "2px solid #D9D9D9" }} value={confirmPassword} onChange={(e) =>
                        {
                            setConfirmPassword(e.target.value)
                            chekRepeat(e)
                        }} required type={!eye ? "password" : "text"} />
                        <div onClick={() => setEye(!eye)} className={styles.eye}>
                            <img src={eye ? eyeImage : eyeCloseImage} alt="img" />
                        </div>
                    </div>
                    <SubmitBtn disable={validP ? false : true} value={'Подтвердить'} />
                </form>
            </div>
            {
                result && <PasswordPop loading={loading} setModal={setResult} />
            }
        </div>
    )
}

export default ChangePassword