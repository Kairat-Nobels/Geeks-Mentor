import React, { useEffect, useRef, useState } from 'react'
import Header from '../../components/Header/Header'
import { NavLink, useNavigate } from 'react-router-dom'
import styles from './forgotPassword.module.css'
import { useDispatch, useSelector } from "react-redux"
import arrowLeft from '../../assets/images/Registr/arrow-left.svg'
import emailImg from '../../assets/images/Registr/mailReg.svg'
import emailjs from '@emailjs/browser';
import userApi from "../../api/userApi"
import { getUsers } from "../../redux/slices/usersSlice"
import { getMentors } from "../../redux/slices/mentorsSlice"
import menotrApi from '../../api/mentorApi'

function ForgotPassword()
{
    const [email, setEmail] = useState('')
    const [valid, setValid] = useState(true)
    const [find, setFind] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const form = useRef()
    const [randomNumber, setRandomNumber] = useState('');
    const [message, setMessage] = useState('')

    const { users } = useSelector(state => state.usersReducer)
    const { mentors } = useSelector(state => state.mentorsReducer)
    useEffect(() =>
    {
        document.body.style.overflow = ''
        localStorage.removeItem('code')
        if (users.length === 0) dispatch(getUsers(userApi))
        if (mentors.length === 0) dispatch(getMentors(`${menotrApi}?sortBy=like&order=desc`))
        window.scrollTo(0, 0)
        generateRandomNumber()
    }, [])
    const generateRandomNumber = () =>
    {
        const min = 100000;
        const max = 999999;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        setRandomNumber(randomNumber.toString());
        setMessage(`Код подтверждения: ${randomNumber}`)
    };
    const chekEmail = (e) =>
    {
        const emailReg = /^[a-zA-Z0-9_.-]+[A-Za-z0-9]+@[a-z]+\.(com|ru)$/;
        if (emailReg.test(e.target.value)) setValid(true)
        else setValid(false)
    }
    const sendEmail = () =>
    {
        emailjs.sendForm('service_r8hb44i', 'template_bc1eht9', form.current, 'NDPk5E6VzZlBhjWrf')
            .then((result) =>
            {
                console.log(result.text);
            }, (error) =>
            {
                console.log(error.text);
            });
    };
    const handleSubmit = (e) =>
    {
        e.preventDefault()
        for (let user of users) {
            if ((user.email === email) && valid) {
                localStorage.setItem('code', JSON.stringify(randomNumber))
                localStorage.setItem('email', JSON.stringify({ email: user.email, id: user.id, role: "Студент" }))
                sendEmail()
                navigate('/confirm')
                break;
            }
            else {
                setFind(false)
            }
        }
        for (let mentor of mentors) {
            if ((mentor.email === email) && valid) {
                localStorage.setItem('code', JSON.stringify(randomNumber))
                localStorage.setItem('email', JSON.stringify({ email: mentor.email, id: mentor.id, role: "Ментор" }))
                sendEmail()
                navigate('/confirm')
                break;
            }
            else setFind(false)
        }
    }
    return (
        <div className={styles.Page}>
            <Header />
            <div className={`${styles.forgot} container`}>
                <div className={styles.head}>
                    <NavLink to={'/login'}><div><img src={arrowLeft} alt="img" /></div></NavLink>
                    <h1>Восстановление пароля</h1>
                </div>
                <form ref={form} onSubmit={handleSubmit} action="">
                    <textarea onChange={e => setMessage(e.target.value)} value={message} name="message" style={{ display: 'none' }} />
                    <div>
                        <label htmlFor="user_email">Адресс электронной почты</label>
                        <div className={styles.iconInput}><img src={emailImg} alt="" /></div>
                        <input name="user_email" placeholder="example@gmail.com" required value={email}
                            onChange={(e) =>
                            {
                                setEmail(e.target.value)
                                chekEmail(e)
                            }} type="email" />
                        {
                            !valid && email.length > 0 && <p className={styles.notCorrect}>Некоректный адресс почты</p>
                        }
                    </div>
                    {
                        !find && <div className={styles.find}>
                            <h4>Этот адрес эл.почты не зарегистрирован</h4>
                            <NavLink to={'/'}>Зарегистрируйтесь</NavLink>
                        </div>
                    }
                    <button type="submit">Подтвердить</button>
                </form>

            </div>
        </div >
    )
}

export default ForgotPassword