import React, { useEffect, useState } from 'react'
import searchImg from '../../assets/images/Registr/searchBtn.svg'
import styles from './SearchBurger.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { searchMentor, selectFilter, selectLang } from '../../redux/slices/filterSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import { getMentors, searchMentors } from '../../redux/slices/mentorsSlice'
import menotrApi from '../../api/mentorApi'

function SearchBurger({ setBurger })
{
    const [course, setCourse] = useState('')
    const [name, setName] = useState('')
    const [language, setLanguage] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { selected, search, courses, languages, langMentor } = useSelector(state => state.filterReducer)

    const handleSubmit = (e) =>
    {
        e.preventDefault()
        if (name.trim() !== '') {
            dispatch(searchMentor(name))
            setBurger(false)
            document.body.style.overflow = ''
            navigate('/geeks/search')
        }
    }
    const handleSelect = (e) =>
    {
        dispatch(selectFilter(e.target.value))
        setBurger(false)
        document.body.style.overflow = ''
        if (location.pathname !== '/geeks/search') navigate('/geeks/mentors')
    }
    const changeLang = (e) =>
    {
        dispatch(selectLang(e.target.value))
        if (location.pathname !== '/geeks/search') navigate('/geeks/mentors')
        setBurger(false)
        document.body.style.overflow = ''
    }
    useEffect(() =>
    {
        setCourse(selected)
        if (selected !== "") {
            const api = `${menotrApi}?course=${selected}&sortBy=like&order=desc`
            dispatch(getMentors(api))
        }
        else dispatch(getMentors(`${menotrApi}?sortBy=like&order=desc`))
    }, [selected])
    useEffect(() =>
    {
        setLanguage(langMentor)
        if (langMentor !== "") {
            const api = `${menotrApi}?language=${langMentor}&sortBy=like&order=desc`
            dispatch(getMentors(api))
        }
        else dispatch(getMentors(`${menotrApi}?sortBy=like&order=desc`))
    }, [langMentor])
    useEffect(() =>
    {
        setName(search)
        if (search !== "") {
            const api = `${menotrApi}?name=${search}&sortBy=like&order=desc`
            dispatch(searchMentors(api))
        }
        else dispatch(searchMentor(''))
    }, [search])
    return (
        <div className={styles.search}>
            <form onSubmit={handleSubmit} action="">
                <div className={styles.input}>
                    <button type='submit'><img src={searchImg} alt="" /></button>
                    <input required value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Найти ментора' />
                </div>
                <select className={styles.select} value={course} onChange={handleSelect}>
                    <option value="">Направление</option>
                    {
                        courses.map(el => <option key={el} value={el}>{el}</option>)
                    }
                </select>
                <select className={styles.select} value={language} onChange={changeLang}>
                    <option disabled value="">Языки</option>
                    <option value="">Все</option>
                    {
                        languages.map(el => <option key={el} value={el}>{el}</option>)
                    }
                </select>
            </form>
        </div>
    )
}

export default SearchBurger