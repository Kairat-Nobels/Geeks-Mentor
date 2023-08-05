import { useEffect, useRef, useState } from 'react';
import closeX from '../../assets/images/Home/x.svg'
import styles from './ModalDescription.module.css'
import arrowImage from '../../assets/images/Home/VectorBlack.svg'
import { useDispatch } from 'react-redux';
import { changeMentor, createMentor } from '../../redux/slices/mentorsSlice';
import mentorApi from '../../api/mentorApi';
function ModalDescription({ info, setModal, descContent, setDescContent, profesion })
{
    const defProf = ['Мобильный разработчик', 'Frontend', 'UX/UI Дизайн', 'Backend', 'Project Manager']
    const courses = defProf.filter(el => el !== profesion)
    const [newProf, setNewProf] = useState(profesion)
    const [newDesc, setNewDesc] = useState(descContent)
    const [initialHeight, setInitialHeight] = useState(110)
    const dispatch = useDispatch()
    useEffect(() =>
    {
        document.body.style.overflow = 'hidden';
        window.innerWidth <= 460 ? setInitialHeight(180) : setInitialHeight(110)
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
        if (info.course !== newProf) {
            const requestData = {
                data: { course: newProf },
                api: `${mentorApi}/${info.id}`
            };
            dispatch(changeMentor(requestData))
        }
        if (newDesc.trim() !== descContent) {
            const requestData = {
                data: { about: newDesc.trim() },
                api: `${mentorApi}/${info.id}`
            };
            dispatch(changeMentor(requestData))
        }
        else handleClose()
    }
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
    return (
        <div onClick={closeModal} className={`${styles.window} window`}>
            <form onSubmit={handleSave} action="" id='descModal' className={styles.content}>
                <h2>Редактировать специальность</h2>
                <div className={styles.selectDiv}>
                    <select
                        id="selectInputModal"
                        name="selectInputModal"
                        className={styles.select}
                        onChange={e => setNewProf(e.target.value)}
                        value={newProf}
                    >
                        <option value={newProf}>{newProf}</option>
                        {
                            courses.map((c, i) => <option key={i} value={c}>{c}</option>)
                        }
                    </select>
                </div>
                <h2>Редактировать описание</h2>
                <div className={styles.instruction}>
                    <p>Используйте это поле, чтобы рассказать о своих навыках и опыте</p>
                    <ul>
                        <li>Напишите о себе, минимум 30 символов</li>
                        <li>Не используйте много слов</li>
                        <li>Убедитесь в отсутсвии ошибок</li>
                    </ul>
                </div>
                <div className={styles.textarea}>
                    <textarea required onInput={changeHeight} minLength={30} maxLength={300} onChange={e => setNewDesc(e.target.value)} value={newDesc} cols="56" rows="5"></textarea>
                    <div className={styles.limit}><p>{newDesc.length} /</p><p> 300</p></div>
                </div>
                <div onClick={handleClose} className={styles.btn}><img src={closeX} alt="" /></div>
                <div className={styles.downActions}>
                    <button type='button' onClick={handleClose} className={styles.cancel}>Отмена</button>
                    <button disabled={newDesc.length >= 30 ? false : true} className={styles.save}>Сохранить</button>
                </div>
            </form>
        </div>
    )
}

export default ModalDescription