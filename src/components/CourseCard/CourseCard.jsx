import { useDispatch } from 'react-redux'
import { selectFilter, selectLang } from '../../redux/slices/filterSlice'
import styles from './courseCard.module.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function CourseCard({ el })
{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [mobile, setMobile] = useState(false)
    const goTo = () =>
    {
        dispatch(selectFilter(el.value))
        dispatch(selectLang(''))
        navigate('/geeks/mentors')
    }
    window.addEventListener("resize", () =>
    {
        if (window.innerWidth <= 460) setMobile(true)
        else setMobile(false)
    })
    useEffect(() =>
    {
        const checkWidth = () =>
        {
            if (window.innerWidth <= 460) setMobile(true)
            else setMobile(false)
        }
        checkWidth()
    }, [])
    return (
        <button onClick={goTo} className={styles.courseCard}>
            <div className={styles.cardInner}>
                <div style={el.name === 'UX/UI Дизайн' ? { flex: "none", width: "32px" } : { width: "40px" }} className={styles.figmaLogo}><img src={el.img} alt="FigmaLogo" /></div>
                <div className={styles.actions}>
                    <h4>{el.name}</h4>
                </div>

            </div>
        </button>
    )
}