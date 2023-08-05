import React, { useEffect } from 'react';
import styles from './MessagePop.module.css'
import closeX from '../../assets/images/Home/x.svg'
import Spinner from '../Spinner/Spinner'

function MessagePop({ loading, error, setModal, image, text })
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
        <div onClick={closeModal} className={`${styles.window} window`}>
            <section className={styles.content}>
                {
                    loading ? <Spinner />
                        : error ? <>
                            <h2 style={{ margin: '80px auto' }}>Что то пошло не так</h2>
                            <button onClick={handleClose}>Закрыть</button>
                            <div onClick={handleClose} className={styles.btn}><img src={closeX} alt="img" /></div>
                        </> :
                            <>
                                <img src={image} alt="img" />
                                <h3>{text}</h3>
                                <button onClick={handleClose}>Закрыть</button>
                                <div onClick={handleClose} className={styles.btn}><img src={closeX} alt="img" /></div>
                            </>
                }
            </section>
        </div >
    );
}

export default MessagePop;