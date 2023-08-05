import React, { useEffect, useState } from 'react'
import PersonalCabinet from '../../components/PersonalCabinet/PersonalCabinet'
import Spinner from '../../components/Spinner/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import api from '../../api/userApi'
import { getOne } from '../../redux/slices/usersSlice'
import menotrApi from '../../api/mentorApi'
import { getOneMentor } from '../../redux/slices/mentorsSlice'
function PersonalPage()
{
    const data = JSON.parse(localStorage.getItem('data'))
    const [modal, setModal] = useState(false)
    const dispatch = useDispatch()
    if (data.role === "Студент") {
        const { loading, error, users } = useSelector(state => state.usersReducer)
        useEffect(() =>
        {
            for (const user of users) {
                if (user.email === data.email) {
                    const newApi = `${api}/${user.id}`
                    dispatch(getOne(newApi))
                }
            }
        }, [users])
        return (
            <div>
                {loading ? <Spinner />
                    : error ? <h2>Error</h2>
                        : <PersonalCabinet setModal={setModal} modal={modal} />
                }
            </div>
        )
    }
    else {
        const { loading, error, mentors } = useSelector(state => state.mentorsReducer)
        useEffect(() =>
        {
            for (const mentor of mentors) {
                if (mentor.email === data.email) {
                    const newApi = `${menotrApi}/${mentor.id}`
                    dispatch(getOneMentor(newApi))
                }
            }
        }, [mentors])
        return (
            <div>
                {loading ? <Spinner />
                    : error ? <h2>Error</h2>
                        : <PersonalCabinet setModal={setModal} modal={modal} />
                }
            </div>
        )
    }
}

export default PersonalPage