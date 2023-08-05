import { Link, NavLink, useNavigate } from "react-router-dom"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import styles from './registrPage.module.css'
import eyeImage from '../../assets/images/Registr/eyePassword.svg'
import eyeCloseImage from '../../assets/images/Registr/eyeClose.svg'
import { useEffect, useRef, useState } from "react"
import CheckPassword from "../../components/CheckPassword/CheckPassword"
import { useDispatch, useSelector } from "react-redux"
import { createUser, getUsers } from "../../redux/slices/usersSlice"
import Spinner from "../../components/Spinner/Spinner"
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage"
import SuccessMessage from "../../components/SuccessMessage/SuccessMessage"
import userImg from '../../assets/images/Registr/userReg.svg'
import emailImg from '../../assets/images/Registr/mailReg.svg'
import passwordImg from '../../assets/images/Registr/lock.svg'
import userApi from "../../api/userApi"
import { cameWebsite } from "../../redux/slices/entranceSlice"
import emailjs from '@emailjs/browser';
import { getMentors } from "../../redux/slices/mentorsSlice"
import menotrApi from "../../api/mentorApi"

function RegistrPage()
{
    const [loading, setLoading] = useState(false)
    const currentUrl = window.location.href;
    const newRoute = "/emailConfirm";
    const newUrl = currentUrl.replace(/\/[^/]*$/, newRoute);
    const form = useRef()
    const [message, setMessage] = useState(`Для подтверждения почты перейдите по сслыке: ${newUrl}`)
    const [find, setFind] = useState(false)
    const [valid, setValid] = useState(true)
    const [validP, setValidP] = useState(false)
    const [chekP, setChekP] = useState(false)
    const [result, setResult] = useState(false)
    const [eye, setEye] = useState(false)
    const [eye2, setEye2] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("");
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        month: '',
        course: '',
        role: 'Студент'
    })
    const courses = ['Мобильная разработка', 'Frontend', 'UX/UI Дизайн', 'Backend', 'Project Manager']
    const [monthes, setMonthes] = useState([1, 2, 3, 4, 5, 6, 7])
    const FilterMonth = (el) =>
    {
        if (el === 'Frontend' || el === 'Backend') setMonthes([1, 2, 3, 4, 5])
        else if (el === 'UX/UI Дизайн' || el === 'Project Manager') setMonthes([1, 2, 3])
        else setMonthes([1, 2, 3, 4, 5, 6, 7])
    }
    const { error, success, users } = useSelector(state => state.usersReducer)
    const { mentors } = useSelector(state => state.mentorsReducer)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [get, setget] = useState({
        condition1: false,
        condition2: false,
        condition3: false,
    })
    const chekEmail = (e) =>
    {
        const emailReg = /^[a-zA-Z0-9_.-]+[A-Za-z0-9]+@[a-z]+\.(com|ru)$/;
        if (emailReg.test(e.target.value) && (e.target.value.length > 0)) setValid(true)
        else setValid(false)
    }
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
    const findEmail = (e) =>
    {
        for (let user of users) {
            if (user.email === e.target.value) {
                return setFind(true)
            }
            else setFind(false)
        }
        for (let mentor of mentors) {
            if (mentor.email === e.target.value) {
                return setFind(true)
            }
            else setFind(false)
        }
    }
    const chekRepeat = (value) =>
    {
        if (value === data.password) setValidP(true)
        else setValidP(false)
    }
    const handleSubmit = (e) =>
    {
        e.preventDefault()
        if (validP && valid && get.condition1 && get.condition2 && get.condition3) {
            window.scrollTo(0, 0)
            setResult(true)
            sendEmail()
        }
    }
    const sendEmail = () =>
    {
        setLoading(true)
        emailjs.sendForm('service_sxdbthp', 'template_nyres2d', form.current, 'eJMtWvV4rpQ2Bwmgs')
            .then((result) =>
            {
                setLoading(false)
                console.log(result.text);
            }, (error) =>
            {
                setLoading(false)
                console.log(error.text);
            });
    };
    useEffect(() =>
    {
        if (JSON.parse(localStorage.getItem('autoriz')) === true && JSON.parse(localStorage.getItem('data'))) {
            result === false && navigate('/geeks')
        }
        window.scrollTo(0, 0)
        dispatch(getUsers(userApi))
        dispatch(getMentors(`${menotrApi}?sortBy=like&order=desc`))
    }, [])
    return (
        <div>
            <Header />
            <div className={`${styles.login} container`}>
                {
                    result ?
                        loading ?
                            <Spinner />
                            :
                            <div>
                                {error ? <ErrorMessage message={error} /> : <div>
                                    <SuccessMessage message={success} data={data} />
                                    <p className={styles.gotoEmail}>Мы отправили сообщение для подтверждения!</p>
                                    <p className={styles.gotoEmail}>Проверьте вашу почту</p>
                                </div>}
                            </div> :
                        <>
                            <form ref={form} onSubmit={handleSubmit} action="">
                                <h1>Зарегистрируйтесь</h1>
                                <textarea onChange={e => setMessage(e.target.value)} value={message} name="message" style={{ display: 'none' }} />
                                <div>
                                    <label htmlFor="">Ф.И.О *</label>
                                    <div className={styles.iconInput}><img src={userImg} alt="" /></div>
                                    <input onBlur={(e) =>
                                    {
                                        setData((s) =>
                                        {
                                            return {
                                                ...s, name: e.target.value.trim()
                                            }
                                        })
                                    }} name="user_name" placeholder="Кайрат Нуртас" required type="text" value={data.name}
                                        onChange={(e) =>
                                        {
                                            setData((s) =>
                                            {
                                                return {
                                                    ...s, name: e.target.value
                                                }
                                            })
                                        }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="">Адрес электронной почты *</label>
                                    <div className={styles.iconInput}><img src={emailImg} alt="" /></div>
                                    <input name="user_email" placeholder="example@gmail.com" onBlur={findEmail} value={data.email} onChange={(e) =>
                                    {
                                        setData((s) =>
                                        {
                                            return {
                                                ...s, email: e.target.value
                                            }
                                        })
                                        chekEmail(e)
                                    }} required type="email" />
                                    {
                                        !valid && data.email.length > 0 && <p className={styles.notCorrect}>Некоректный адресс почты</p>
                                    }
                                    {
                                        find && <div className={styles.find}>
                                            <h4>Этот адрес почты уже зарегестрирован</h4>
                                            <Link to={'/login'}>Войти</Link>
                                        </div>
                                    }
                                </div>
                                <div className={styles.password}>
                                    <label htmlFor="">Пароль *</label>
                                    <div className={styles.iconInput}><img src={passwordImg} alt="" /></div>
                                    <input onBlur={() =>
                                    {
                                        chekRepeat(confirmPassword)
                                        setChekP(false)
                                    }} onFocus={() => { setChekP(true) }} value={data.password} onChange={(e) =>
                                    {
                                        setData((s) =>
                                        {
                                            return {
                                                ...s, password: e.target.value
                                            }
                                        })
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
                                    <label htmlFor="">Повторите пароль *</label>
                                    <div className={styles.iconInput}><img src={passwordImg} alt="" /></div>
                                    <input style={confirmPassword ? ((validP) ? { border: "4px solid green" } : { border: "4px solid red" }) : { border: "3px solid rgba(0, 0, 0, 0.4)" }} value={confirmPassword} onChange={(e) =>
                                    {
                                        setConfirmPassword(e.target.value)
                                        chekRepeat(e.target.value)
                                    }} required type={!eye2 ? "password" : "text"} />
                                    <div onClick={() => setEye2(!eye2)} className={styles.eye}>
                                        <img src={eye2 ? eyeImage : eyeCloseImage} alt="img" />
                                    </div>
                                </div>
                                <div className={styles.flexDiv}>
                                    <div>
                                        <label>Направление *</label>
                                        <select required className={styles.select} value={data.course} onChange={(e) =>
                                        {
                                            setData((s) =>
                                            {
                                                return {
                                                    ...s, course: e.target.value
                                                }
                                            })
                                            FilterMonth(e.target.value)
                                        }}>
                                            <option value="" disabled>Выберите направление</option>
                                            {
                                                courses.map(course => <option key={course} value={course}>{course}</option>)
                                            }
                                        </select>
                                    </div>
                                    <div>
                                        <label>Месяц обучения *</label>
                                        <select disabled={data.course.length > 0 ? false : true} required className={styles.select} value={data.month} onChange={(e) =>
                                        {
                                            setData((s) =>
                                            {
                                                return {
                                                    ...s, month: e.target.value
                                                }
                                            })
                                        }}>
                                            <option value="" disabled>Выберите месяц</option>
                                            {monthes.map(el => <option key={el} value={el}>{el}-месяц</option>)}
                                            <option value="Выпускник">Выпускник</option>
                                        </select>
                                    </div>
                                </div>

                                <button disabled={find} type="submit">Зарегистрироваться</button>
                            </form>
                            <div className={styles.changePage}>Уже есть аккаунт?<NavLink to={'/login'} className={styles.link}>Войдите</NavLink></div>
                        </>
                }
            </div>
            <Footer />
        </div>
    )
}

export default RegistrPage