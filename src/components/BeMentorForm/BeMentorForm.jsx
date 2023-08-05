import styles from './beMentorForm.module.css'
import mail from '../../assets/images/Home/mailBlack.svg'
import quesImg from '../../assets/images/Home/clock.png'
import { useEffect, useState } from 'react'
import MessagePop from '../MessagePop/MessagePop'
import { useDispatch, useSelector } from 'react-redux'
import userApi from '../../api/userApi'
import { changeUser } from '../../redux/slices/usersSlice'
import ModalMentorRools from '../ModalMentorRools/ModalMentorRools'
function BeMentorForm()
{
    const defaultData = JSON.parse(window.localStorage.getItem('data'))
    const [modal, setModal] = useState(false)
    const [readDoc, setReadDoc] = useState(false)
    const [textPop, setTextPop] = useState('')
    const [iread, setIread] = useState(false)
    const [data, setData] = useState({
        name: defaultData.name,
        group: '',
        month: defaultData.month === "Выпускник" ? defaultData.month : defaultData.month.slice(0, 1),
        course: defaultData.course,
        about: ''
    })
    const courses = ['Мобильная разработка', 'Frontend', 'UX/UI Дизайн', 'Backend', 'Project Manager']
    const [monthes, setMonthes] = useState([1, 2, 3, 4, 5, 6, 7])
    const { loading, info, error } = useSelector(state => state.usersReducer)

    const dispatch = useDispatch()
    const FilterMonth = (el) =>
    {
        if (el === 'Frontend' || el === 'Backend') setMonthes([1, 2, 3, 4, 5])
        else if (el === 'UX/UI Дизайн' || el === 'Project Manager') setMonthes([1, 2, 3])
        else setMonthes([1, 2, 3, 4, 5, 6, 7])
    }

    const handleSubmit = (e) =>
    {
        e.preventDefault()
        setData((s) =>
        {
            return {
                name: s.name,
                month: s.month,
                course: s.course,
                about: s.about.trim()
            }
        })
        if (defaultData.role === 'Ментор') {
            setTextPop('Вы уже являетесь ментором')
            setModal(true)
        }
        else if (info.about) {
            setTextPop('Вы уже отправляли заявку')
            setModal(true)
        }
        else if (data.about.trim().length > 14) {
            const requestData = {
                data: { about: data.about },
                api: `${userApi}/${info.id}`
            };
            dispatch(changeUser(requestData))
            setTextPop('Мы получили вашу заявку и отправим техническое задание на почту')
            setModal(true)
            setData({
                name: defaultData.name,
                month: defaultData.month === "Выпускник" ? defaultData.month : defaultData.month.slice(0, 1),
                course: defaultData.course,
                about: '',
            })
        }
        else alert('В поле о себе надо минимум 15 символов')
    }

    const changeHeight = (e) =>
    {
        const initialHeight = 81;
        e.target.style.height = `${initialHeight}px`
        const newHeight = e.target.scrollHeight;
        e.target.style.height = `${newHeight}px`;
    }
    useEffect(() =>
    {
        FilterMonth(defaultData.course)
    }, [])
    return (
        <div className={styles.SearchForm}>
            <h2>Заполните анкету чтобы стать ментором</h2>
            <form onSubmit={handleSubmit} action="" className={styles.form} >
                <div>
                    <label>Меня зовут*</label>
                    <input required style={data.name.length > 0 ? { width: 'auto' } : { width: '135px' }} value={data.name} type="text" placeholder="Введите имя" onChange={(e) => setData((s) =>
                    {
                        return {
                            ...s, name: e.target.value
                        }
                    })} />
                </div>
                <div>
                    <label>Направление*</label>
                    <select onChange={(e) =>
                    {
                        setData((s) =>
                        {
                            return {
                                ...s, course: e.target.value
                            }
                        })
                        FilterMonth(e.target.value)
                    }
                    } value={data.course} required>
                        <option disabled value=''>Выберите направление</option>
                        {courses.map(el => <option key={el} value={el}>{el}</option>)}
                    </select>
                </div>
                <div>
                    <label>Месяц обучения*</label>
                    <select disabled={data.course.length > 0 ? false : true} onChange={(e) => setData((s) =>
                    {
                        return {
                            ...s, month: e.target.value
                        }
                    })} value={data.month} required>
                        <option disabled value=''>Выберите месяц обучения</option>
                        {monthes.map(el => <option key={el} value={el}>{el}</option>)}
                        <option value="Выпускник">Выпускник</option>
                    </select>
                </div>
                <div className={styles.textarea}>
                    <label>О себе*</label>
                    <textarea onInput={changeHeight} maxLength={300} required value={data.about} placeholder="Расскажите о себе" onChange={(e) => setData((s) =>
                    {
                        return {
                            ...s, about: e.target.value
                        }
                    })} />
                </div>
                {
                    data.about.trim().length <= 14 && data.about.trim().length > 0 && <p style={{ textAlign: 'center' }}>Минимум 15 символов</p>
                }
                <div className={styles.limit}><p>{data.about.length} /</p><p> 300</p></div>
                {
                    defaultData.role === 'Студент' && <div className={styles.chek}>
                        <input required type="checkbox" checked={iread} onChange={e => setIread(e.target.checked)} />
                        <p>Я ознакомлен с <span onClick={() => setReadDoc(true)}>Правилами менторства</span></p>

                    </div>
                }
                <button >Отправить заявку</button>
            </form>
            {
                modal && <MessagePop loading={loading} error={error} setModal={setModal} image={quesImg} text={textPop} />
            }
            {
                readDoc && <ModalMentorRools setModal={setReadDoc} />
            }
        </div>

    )
}

export default BeMentorForm