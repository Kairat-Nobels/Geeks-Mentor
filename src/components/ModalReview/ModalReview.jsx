import { useEffect, useState } from 'react';
import closeX from '../../assets/images/Home/x.svg'
import styles from './ModalReview.module.css'

function ModalReview({ userReview, setModal, handleS })
{
    const [newReview, setNewReview] = useState('')
    const [notValid, setNotValid] = useState(false)
    const [initialHeight, setInitialHeight] = useState(110)
    useEffect(() =>
    {
        document.body.style.overflow = 'hidden';
        window.innerWidth <= 460 ? setInitialHeight(180) : setInitialHeight(110)
        if (userReview) setNewReview(userReview.review)
    }, [])
    const changeHeight = (e) =>
    {
        e.target.style.height = `${initialHeight}px`
        const newHeight = e.target.scrollHeight;
        e.target.style.height = `${newHeight}px`;
    }

    const handleSave = (e) =>
    {
        e.preventDefault();

        if (newReview.trim() !== '' && newReview.trim().length >= 30) {
            handleS(newReview.trim());
            handleClose()
        }
        else {
            setNotValid(true)
            setNewReview(newReview.trim());
        }
    }
    const closeModal = (e) =>
    {
        if (!document.querySelector('#descModal').contains(e.target)) {
            document.body.style.overflow = '';
            setModal(0)
        }
    }
    const handleClose = () =>
    {
        document.body.style.overflow = '';
        setModal(0)
    }
    return (
        <div onClick={closeModal} className={`${styles.window} window`}>
            <form onSubmit={handleSave} action="" id='descModal' className={styles.content}>
                <h2>Оставить отзыв (минимум 30 символов)</h2>
                <h3>Отзыв не должен содержать</h3>
                <ul>
                    <li>Нецензурные выражения</li>
                    <li>Необоснованные обвинения</li>
                    <li>Оскорбление в адрес ментора</li>
                </ul>
                <div className={styles.textarea}>
                    <textarea onBlur={(e) => setNotValid(e.target.value.trim().length >= 30 ? false : true)} placeholder='Оставьте отзыв' required onInput={changeHeight} minLength={30} maxLength={300} onChange={e =>
                    {
                        setNewReview(e.target.value)
                        e.target.value.trim().length >= 30 && setNotValid(false)
                    }} value={newReview} cols="56" rows="5"></textarea>
                    <div className={styles.limit}><p>{newReview.length} /</p><p> 300</p></div>
                </div>
                {notValid && <p style={{ color: "red" }}>Минимум 30 символов</p>}
                <div onClick={handleClose} className={styles.btn}><img src={closeX} alt="" /></div>
                <div className={styles.downActions}>
                    <button type='button' onClick={handleClose} className={styles.cancel}>Отмена</button>
                    <button disabled={newReview.length >= 30 ? false : true} className={styles.save}>Отправить</button>
                </div>
            </form>
        </div>
    )
}

export default ModalReview