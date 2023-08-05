import styles from './homePage.module.css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CourseCard from '../../components/CourseCard/CourseCard'
import DropDown from '../../components/DropDown/DropDown'
import BeMentorForm from '../../components/BeMentorForm/BeMentorForm'
import Baner from '../../components/Baner/Baner'
import help from '../../assets/images/Home/help-circle.svg'
import helpPng from '../../assets/images/Home/help-circle.png'
import arrowRight from '../../assets/images/Home/arrow-right.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import SwipperSlider from '../../components/SwipperSlider/SwipperSlider'
import MessagePop from '../../components/MessagePop/MessagePop'
import { selectFilter, selectLang } from '../../redux/slices/filterSlice'
import { getMentors } from '../../redux/slices/mentorsSlice'
import menotrApi from '../../api/mentorApi'
import docIcon from '../../assets/images/actionsIcons/docIcon.svg'
import questionApi from '../../api/questionApi'
import ModalMentorRools from '../../components/ModalMentorRools/ModalMentorRools'
import firstIcon from '../../assets/images/Home/homeIcon1.png'
import secontIcon from '../../assets/images/Home/homeIcon2.png'
import lastIcon from '../../assets/images/Home/homeIcon3.png'

import { postQuestions, getQuestions } from '../../redux/slices/questionsSlice'

function HomePage()
{
    const { loading, error } = useSelector(state => state.questionsReducer)
    const data = JSON.parse(localStorage.getItem('data'))
    const courses = [
        { id: 1, name: 'UX/UI Дизайн', img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEidP1jxRL6b5HPwOJ-ixo8g39SyncPLSzHGvB5NK0cmrBvPKh5luZ46jJ9BSALpbvkZa3MIZR4MmI1RonW_SfTSwxatVGsa-ktPuE7LkJzgHkWcLvX2dJSra7CN2N2QYQYfkj9FvfOTXBE8G8b-GU_kyWDabEHKWbzKY0xm1RFgCIbdyGUJBVN64nTmFnw/s1600/logos_figma.png', value: 'UX/UI Дизайн' },
        { id: 2, name: 'Frontend - разработка', img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj4QYbk7YzzVhEQlwwsfUZt9NS9gQYHsZTQp1Vcx2GKpo14k4kFMPbuyfsa3TFx9iyAFcHls8MY4C-SDImMNG77erKgKeSTeJlk3XCu6zejzQY1QTcA7bBPi-Luha4RoeSkiwlyrzyJIwcIpzQpWVlgzJZh3F7VR11Z5Z3p5fxcgt2BtcQ4K5klWM5qPMs/s1600/logos_javascript.png', value: 'Frontend' },
        { id: 3, name: 'Android - разработка ', img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEicHkUZZFTsb-YAZFb2KzCnVg-Z4j0FGoJa6_Q3xvv7XEgEtFibsd2nzbY17ah334vfwhWY2-20nPyuuygYx58R_OwJf7uyjieWmzMXcPsi1YIUQY-oxUrC-qrxsbS5VBMqglK7mMUwgjmUXijPyIR4VgFeOZ4K_IvWr2kecMRCbf8YAMjuhtdI3BJekVA/s1600/logos_kotlin.png', value: 'Android' },
        { id: 4, name: 'Backend - разработка', img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgEtZsTjwobFn_b381l8DI3bFqf_c11dWWvNv1kPQCfcN6ZpmYwH6vcFQD0AvyCzK39RzK0upgxcmhwE-ViPxtMf_7qC4VOxwEgSXT5EIL21gkDM1PUFn5Ve5jRgOm4k4Hu8l5HnMZvJEDAZmB-YPcxYfXTGyqOyB-tAmPfI2dFAhTwZK5_IrNGRE8ayQA/s1600/logos_python.png', value: 'Backend' },
        { id: 5, name: 'IOS - разработка', img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgzeTvVJe07VUNdjx0XZqO6XbTAErHWOXXWUNCrbRcp12hDFXWcxlb1z5r-9oMCdJZ5-z7tTOCQCTU1IpzYo-9fqGYsMCajWhFuLyYbaPJMbaMZv7mopngzzQas9kraNr5fbUeI1UuMw-N1S0HecxMR9WzTcoKxjTx8WQs-DiqjnRChaVXm26ebpmGewVs/s1600/grommet-icons_swift%20(2).png', value: 'IOS' }
    ]
    const [ques, setQues] = useState('')
    const [modal, setModal] = useState(false)
    const [quesPop, setQuesPop] = useState(false)
    const { bestMentors, mentors } = useSelector(state => state.mentorsReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = (e) =>
    {
        e.preventDefault()
        if (ques.trim() !== '') {
            const responseData = {
                label: ques.trim(),
                top: false,
                info: `${data.name}, ${data.course} - ${data.month}`,
                email: data.email,
            }
            dispatch(postQuestions(responseData))
            setQuesPop(true)
            setQues('')
        }
        else setQues(ques.trim())
    }
    const goTo = () =>
    {
        dispatch(selectFilter('Технические Менторы'))
        dispatch(selectLang(''))
        navigate('/geeks/mentors')
    }
    useEffect(() =>
    {
        window.scrollTo(0, 0)
        dispatch(getMentors(`${menotrApi}?sortBy=like&order=desc`))
        dispatch(getQuestions(`${questionApi}?filter&top=true`))
    }, [])
    return (
        <div className={styles.page} >
            <div className={styles.baner}>
                <Baner />
            </div>
            <h2 id='courses'>Наши направления</h2>
            <div className={styles.courses}>
                {
                    courses.map(el => <CourseCard key={el.id} el={el} />)
                }
            </div>
            <button onClick={goTo} className={styles.texMentors}><img src='https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhp3QYlmuelgAkmKj2YsBoB9s_R9UuNj3oWIyUdK_gH0nA_Ogv9dWX0kHdoRHP3zcD9dOOm6Xvnz0YVsJzRCM5PIhqf3Oyei0h9er5fK3YS5mw1RU33QBB64WXppjynCaE0HQicvTkH4VkuX3GP5d3_l-5K1Rl0b_Jphr9Ms1ol-StPkHV2aqYE7GUq6NU/s1600/settings.png' alt="img" /><p>Тех.менторы</p></button>
            <div className={styles.headSlider}>
                <h2 className={styles.bestMentorsH2}>Лучшие менторы</h2>
                <div className={styles.AllMentors}><NavLink onClick={() => dispatch(selectFilter(''))} to='/geeks/mentors'><p>Посмотреть всех</p><img src={arrowRight} alt="img" /></NavLink></div>
            </div>
            <div className={styles.mentors}>
                <SwipperSlider data={bestMentors} best={true} />
            </div>
            <div className={styles.BeMentor}>
                <div className={styles.info}>
                    <h2 id='mentorGuide'>Как стать ментором?</h2>
                    <ol>
                        <li><span>1</span><p>Необходимо учиться минимум на 2-ом месяце обучения любого направления</p></li>
                        <li><span>2</span><p>У вас должны быть высокие баллы, и хорошо написанные Stand Up’ы</p></li>
                        <li><span>3</span><p>Вы должны заполнить отправить заявку на вступление в менторы. Это можно сделать, заполнив анкету справа. После этого с вами свяжутся и при необходимости вам нужно будет выполнить ТЗ</p></li>
                    </ol>
                    <div onClick={() => setModal(true)}>
                        <img src={docIcon} alt="img" />
                        <p>Справочник для менторов</p>
                    </div>
                </div>
                <div className={styles.image}><img src={firstIcon} alt="img" /></div>

            </div>
            <div className={styles.BeMentor}>
                <BeMentorForm />
                <div className={styles.image}><img src={secontIcon} alt="img" /></div>

            </div>
            <h2 id='FAQ' className={styles.h2Faq}>FAQ - Часто задаваемые вопросы</h2>
            <div className={styles.endOfpage}>
                <div className={styles.Faq}>
                    <DropDown />
                    <div className={styles.question}>
                        <h3>Задать вопрос</h3>
                        <form onSubmit={handleSubmit} action="">
                            <label>Введите вопрос (Максимум  {ques.trim().length}/100символов)</label>
                            <div className={styles.input}>
                                <img src={help} alt="img" />
                                <input maxLength={100} required value={ques} onChange={(e) => setQues(e.target.value)} placeholder="Вопрос" type="text" />
                            </div>
                            <button>Задать вопрос</button>
                        </form>
                    </div>
                </div>
                <div className={styles.lastImage}><img src={lastIcon} alt="img" /></div>
            </div>
            {
                quesPop && <MessagePop loading={loading} error={error} setModal={setQuesPop} image={helpPng} text={'Мы получили ваш вопрос и постараемся ответить на него в ближайшее время'} />
            }
            {
                modal && <ModalMentorRools setModal={setModal} />
            }
        </div >
    )
}

export default HomePage