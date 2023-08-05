import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { NavLink, useNavigate } from 'react-router-dom'
import styles from './loginPage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../redux/slices/usersSlice'
import { cameWebsite } from '../../redux/slices/entranceSlice'
import eyeImage from '../../assets/images/Registr/eyePassword.svg'
import eyeCloseImage from '../../assets/images/Registr/eyeClose.svg'
import userApi from '../../api/userApi'
import emailImg from '../../assets/images/Registr/mailReg.svg'
import passwordImg from '../../assets/images/Registr/lock.svg'
import { getMentors } from "../../redux/slices/mentorsSlice"
import menotrApi from '../../api/mentorApi'

function LoginPage()
{
    const [notFind, setNotFind] = useState(false)
    const [eye, setEye] = useState(false)

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { users } = useSelector(state => state.usersReducer)
    const { mentors } = useSelector(state => state.mentorsReducer)
    const handleSubmit = (e) =>
    {
        e.preventDefault()
        for (let user of users) {
            if (user.email === data.email && user.password === data.password) {
                dispatch(cameWebsite(user))
                navigate('/geeks')
            }
            else {
                setNotFind(true)
            }
        }
        for (let mentor of mentors) {
            if (mentor.email === data.email && mentor.password === data.password) {
                dispatch(cameWebsite(mentor))
                navigate('/geeks')
            }
            else {
                setNotFind(true)
            }
        }
    }
    useEffect(() =>
    {
        dispatch(getUsers(userApi))
        dispatch(getMentors(`${menotrApi}?sortBy=like&order=desc`))
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className={styles.Page}>
            <Header />
            <div className={`${styles.login} container`}>
                <h1>Войдите</h1>
                <form onSubmit={handleSubmit} action="">
                    <div>
                        <label htmlFor="">Адрес электронной почты</label>
                        <div className={styles.iconInput}><img src={emailImg} alt="" /></div>
                        <input name='email' type="email" placeholder="example@gmail.com" onChange={(e) => setData((s) => ({ email: e.target.value, password: s.password }))} value={data.email} required />
                    </div>
                    <div className={styles.password}>
                        <label htmlFor="">Пароль</label>
                        <div className={styles.iconInput}><img src={passwordImg} alt="" /></div>
                        <input onChange={(e) => setData((s) => ({ email: s.email, password: e.target.value }))} value={data.password} required type={!eye ? "password" : "text"} />
                        <div onClick={() => setEye(!eye)} className={styles.eye}>
                            <img src={eye ? eyeImage : eyeCloseImage} alt="img" />
                        </div>
                    </div>
                    <p className={styles.forgot}><NavLink to={'/forgot'} className={styles.link}>Забыли пароль?</NavLink></p>
                    {
                        notFind && <p className={styles.notCorrect}>Неправильный адрес эл.почты или пароль</p>
                    }
                    <button type="submit">Войти</button>
                </form>
                <div className={styles.changePage}>Нет аккаунта?<NavLink to={'/'}>Зарегистрируйтесь</NavLink></div>
            </div>
            <Footer />
        </div >
    )
}

export default LoginPage