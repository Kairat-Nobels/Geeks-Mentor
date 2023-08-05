import { useEffect, useRef, useState } from 'react';
import closeX from '../../assets/images/Home/x.svg'
import styles from './ModalBusy.module.css'
import { useDispatch } from 'react-redux';
import { changeMentor } from '../../redux/slices/mentorsSlice';
import mentorApi from '../../api/mentorApi';

function ModalBusy({ setModal, info })
{
    const [time, setTime] = useState({
        dayStart: info.workTimes.dayStart,
        dayEnd: info.workTimes.dayEnd,
        weekendS: info.workTimes.weekendS,
        weekendE: info.workTimes.weekendE
    })
    const [newTel, setNewTel] = useState(info.tel.replace("https://t.me/", "@"))
    const dispatch = useDispatch()
    const closeModal = (e) =>
    {
        if (!document.querySelector('#descModal').contains(e.target)) {
            document.body.style.overflow = '';
            setModal(false)
        }
    }
    const handleClose = () =>
    {
        document.body.style.overflow = '';
        setModal(false)
    }
    const handleSave = (e) =>
    {
        e.preventDefault();
        if (JSON.stringify(info.workTimes) !== JSON.stringify(time)) {
            const requestData = {
                data: { workTimes: time },
                api: `${mentorApi}/${info.id}`
            };
            dispatch(changeMentor(requestData))
        }
        if (info.tel !== newTel.replace("@", "https://t.me/")) {
            const requestData = {
                data: { tel: newTel.replace("@", "https://t.me/") },
                api: `${mentorApi}/${info.id}`
            };
            dispatch(changeMentor(requestData))
        }
        handleClose()
    }
    useEffect(() =>
    {
        document.body.style.overflow = 'hidden';
    }, [])
    return (
        <div onClick={closeModal} className={`${styles.window} window`}>
            <form onSubmit={handleSave} id='descModal' className={styles.content}>
                <h2>Редактировать навыки и умения</h2>
                <div className={styles.flex}>
                    <div className={styles.timeBlock}>
                        <h3>По будням</h3>
                        <div className={styles.days}>
                            <div className={styles.resetTime}>
                                <p>от</p>
                                <div className={styles.inputWrapper}><input type='time' required value={time.dayStart} onChange={e => setTime((s) =>
                                {
                                    return {
                                        dayStart: e.target.value,
                                        dayEnd: s.dayEnd,
                                        weekendS: s.weekendS,
                                        weekendE: s.weekendE
                                    }
                                })} /></div>
                            </div>
                            <div className={styles.resetTime}>
                                <p>до</p>
                                <div className={styles.inputWrapper}><input type='time' required value={time.dayEnd} onChange={e => setTime((s) =>
                                {
                                    return {
                                        dayStart: s.dayStart,
                                        dayEnd: e.target.value,
                                        weekendS: s.weekendS,
                                        weekendE: s.weekendE
                                    }
                                })} /></div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.line}></div>
                    <div className={styles.timeBlock}>
                        <h3>По выходным</h3>
                        <div className={styles.days}>
                            <div className={styles.resetTime}>
                                <p>от</p>
                                <div className={styles.inputWrapper}><input type='time' required value={time.weekendS} onChange={e => setTime((s) =>
                                {
                                    return {
                                        dayStart: s.dayStart,
                                        dayEnd: s.dayEnd,
                                        weekendS: e.target.value,
                                        weekendE: s.weekendE
                                    }
                                })} /></div>
                            </div>
                            <div className={styles.resetTime}>
                                <p>до</p>
                                <div className={styles.inputWrapper}><input type='time' required value={time.weekendE} onChange={e => setTime((s) =>
                                {
                                    return {
                                        dayStart: s.dayStart,
                                        dayEnd: s.dayEnd,
                                        weekendS: s.weekendS,
                                        weekendE: e.target.value
                                    }
                                })} /></div>
                            </div>
                        </div>
                    </div>
                </div>
                <h2>Редактировать контакты</h2>
                <div className={styles.contacts}>
                    <h3>Telegram</h3>
                    <input minLength={3} required value={newTel} onChange={e => setNewTel(e.target.value)} type="text" />
                </div>
                <div onClick={handleClose} className={styles.btn}><img src={closeX} alt="" /></div>
                <div className={styles.downActions}>
                    <button type="button" onClick={handleClose} className={styles.cancel}>Отмена</button>
                    <button className={styles.save}>Сохранить</button>
                </div>
            </form>
        </div>
    )
}

export default ModalBusy