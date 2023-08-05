import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import styles from './SMSPop.module.css'
import close from '../../assets/images/burgerClose.svg';

function SmsPop({ setModal })
{
    useEffect(() =>
    {
        document.body.style.overflow = 'hidden';
    }, [])
    const closeModal = (e) =>
    {
        if (!document.querySelector('section').contains(e.target)) {
            document.body.style.overflow = '';
            setModal(false)
        }
    }
    const handleClose = () =>
    {
        document.body.style.overflow = '';
        setModal(false)
    }
    return (
        <div className={styles.window} onClick={closeModal}>
            <section className={styles.content}>
                <h3>Не пришло смс?</h3>
                <p>Попробуйте убедиться в правильности написания адреса эл.почты или проверьте соединение с интернетом</p>
                <div className={styles.links}>
                    <NavLink onClick={handleClose} className={styles.link}>Подождать</NavLink>
                    <NavLink to='/forgot' className={styles.link}>Повторить</NavLink>
                </div>
                <div className={styles.close} onClick={handleClose}><img src={close} alt="img" /></div>
            </section>
        </div>
    );
}

export default SmsPop;