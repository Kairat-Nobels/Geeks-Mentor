import React, { useEffect, useRef, useState } from 'react'
import Header from '../../../components/Header/Header'
import { NavLink, useNavigate } from 'react-router-dom'
import styles from './confirmPassword.module.css'
import arrowLeft from '../../../assets/images/Registr/arrow-left.svg'
import emailImg from '../../../assets/images/Registr/mailReg.svg'
import PinInput from 'react-pin-input';
import SmsPop from '../../../components/SMSPop/SMSPop'
function ConfirmPassword()
{
    const [number, setNumber] = useState(60)
    const [cod, setCod] = useState('')
    const [modal, setModal] = useState(false)
    const email = JSON.parse(window.localStorage.getItem('email')).email
    const navigate = useNavigate()
    const pinRef = useRef()
    useEffect(() =>
    {
        window.scrollTo(0, 0)
        const interval = setInterval(() =>
        {
            setNumber((prevNumber) => prevNumber > 0 ? prevNumber - 1 : 0);
        }, 1000);
        if (number === 0) clearInterval(interval);
    }, [])

    const onChange = (value) =>
    {
        setCod(value);
    };
    const resendEmail = () =>
    {
        if (number === 0) navigate('/forgot');
    }
    const handleSubmit = (e) =>
    {
        const codE = JSON.parse(localStorage.getItem('code'))
        e.preventDefault()
        if (cod === codE) navigate('/newPassword');
        else alert('Неправильный код')
    }
    return (
        <div className={styles.Page}>
            <Header />
            <div className={`${styles.confirm} container`}>
                <div className={styles.head}>
                    <NavLink to={'/forgot'}><div><img src={arrowLeft} alt="img" /></div></NavLink>
                    <h1>Проверьте почту</h1>
                </div>
                <div className={styles.messageInfo}>
                    <p>Мы отправили смс с 6-ти значным кодом на адрес </p>
                    <p>{email}</p>
                </div>
                <form onSubmit={handleSubmit} action="">
                    <div className={styles.input}>
                        <PinInput
                            length={6}
                            focus
                            placeholder='0'
                            ref={pinRef}
                            type="numeric"
                            onChange={onChange}
                        />
                    </div>
                    <div className={styles.details}>
                        <p onClick={resendEmail} style={number === 0 ? { borderBottom: '1.7px solid #262523' } : { cursor: 'not-allowed' }}>Отправить код заново {
                            number > 0 && <span>через {number}</span>
                        }</p>
                        <p onClick={() => setModal(true)}>Не пришло смс?</p>
                    </div>
                    <button disabled={cod.length < 6 ? true : false} type="submit">Подтвердить</button>
                </form>

                {
                    modal && <SmsPop setModal={setModal} />
                }
            </div>
        </div >
    )
}

export default ConfirmPassword