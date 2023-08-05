import styles from './personalSecurity.module.css'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import editPencil from '../../assets/images/Home/cabinetPencil.svg'
import { useNavigate } from 'react-router'
import ChangeEmailModal from '../ChangeEmailModal/ChangeEmailModal'
import ChangePassword from '../ChangePassword/ChangePassword'

const PersonalSecurity = () =>
{
    const data = JSON.parse(localStorage.getItem('data'))
    const [modal, setModal] = useState(false)
    const [modal2, setModal2] = useState(false)
    const { info } = useSelector(state => state.usersReducer)
    const { infoM } = useSelector(state => state.mentorsReducer)
    const navigate = useNavigate()
    const [secureInfo, setSecureInfo] = useState({
        email: '',
        password: ''
    })

    useEffect(() =>
    {

        if (info) setSecureInfo((s) =>
        {
            return {
                email: data.email,
                password: info.password
            }
        })
        else navigate('/geeks/cabinet')
    }, [])
    return (
        <div className={styles.security}>
            <div className={styles.wrapper}>
                <p className={styles.wrapper_title}>Безопасность</p>
                <div className={styles.wrapper_details}>
                    <p>Эл.почта</p>
                    <input className={styles.emailIcon} type='email' value={secureInfo.email} disabled />
                    <p onClick={() => setModal(true)} className={styles.hiddenChangeEmail}>Сменить почту</p>
                </div>
                <div className={styles.wrapper_details}>
                    <p>Пароль</p>
                    <input className={styles.passwordIcon} type='password' value={secureInfo.password} disabled />
                    <p onClick={() => setModal2(true)} className={styles.hiddenChangeEmail}>Сменить пароль</p>
                </div>
            </div>
            <div className={styles.security_pencil}>
                <img src={editPencil} alt='edit-pencil' onClick={() => setModal(true)} />
                <img src={editPencil} alt='edit-pencil' onClick={() => setModal2(true)} />
            </div>
            {modal && <ChangeEmailModal setChangeEmail={setModal} />}
            {
                modal2 && <ChangePassword setChangePassword={setModal2} />
            }
        </div>
    )
}

export default PersonalSecurity