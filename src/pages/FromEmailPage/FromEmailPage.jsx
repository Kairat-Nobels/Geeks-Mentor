import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createUser } from '../../redux/slices/usersSlice'
import { cameWebsite } from '../../redux/slices/entranceSlice'
import Spinner from '../../components/Spinner/Spinner'
import { useNavigate } from 'react-router'
import styles from './FromEmailPage.module.css'
function FromEmailPage()
{
    const data = JSON.parse(localStorage.getItem('forConfirm'))
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.usersReducer)
    const handleCame = () =>
    {
        dispatch(cameWebsite(data))
        navigate('/')
    }
    useEffect(() =>
    {
        if (data) dispatch(createUser(data))
    }, [])

    return (
        <div className={styles.page}>
            {
                loading ? <Spinner />
                    :
                    <div>
                        <h2>Добро пожаловать на сайт Geeks Mentors</h2>
                        <p>Чтобы войти нажмите на кнопку подтверждения</p>
                        <button onClick={handleCame}>Подтвердить</button>
                    </div>
            }
        </div>
    )
}

export default FromEmailPage