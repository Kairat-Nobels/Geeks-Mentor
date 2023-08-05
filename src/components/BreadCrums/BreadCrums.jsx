import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import styles from './BreadCrums.module.css'
import { selectFilter } from '../../redux/slices/filterSlice'

function BreadCrums({ onProfile })
{
    const { selected } = useSelector(state => state.filterReducer)
    const [prof, setProf] = useState(selected)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const goToProf = () =>
    {
        dispatch(selectFilter(prof))
        navigate('/geeks/mentors')
    }
    useEffect(() =>
    {
        if (onProfile) {
            setProf(onProfile.course)
        }
    }, [onProfile])
    useEffect(() =>
    {
        setProf(selected)
    }, [selected])
    return (
        <div className={styles.bread}>
            <NavLink to={'/geeks'}>Главная</NavLink> / <p onClick={goToProf}>{onProfile ? onProfile.course : prof}</p>
            {onProfile && <p>/ {onProfile.name}</p>}
        </div>
    )
}

export default BreadCrums