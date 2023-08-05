import { useEffect, useRef, useState } from 'react';
import closeX from '../../assets/images/Home/x.svg'
import styles from './ModalSkils.module.css'
import mentorApi from '../../api/mentorApi';
import { useDispatch } from 'react-redux';
import { changeMentor } from '../../redux/slices/mentorsSlice';

function ModalSkils({ info, setModal, skils })
{
    const [newSkils, setNewSkils] = useState(skils)
    const [showForm, setShowForm] = useState(false)
    const [newSkil, setNewSkil] = useState('')
    const dispatch = useDispatch()
    const deleteSkil = (el) =>
    {
        if (newSkils.length > 1) {
            const filteredSkils = newSkils.filter(a => a !== el)
            setNewSkils(filteredSkils)
        }
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
    const addNewSkill = (e) =>
    {
        e.preventDefault()
        if (newSkil.trim().length > 1 && newSkils.length <= 14) {
            if (!newSkils.includes(newSkil)) {
                setNewSkils([...newSkils, newSkil])
                setNewSkil('')
                setShowForm(false)
            }
        }
    }
    const handleSave = () =>
    {
        if (skils !== newSkils) {
            const requestData = {
                data: { skils: newSkils },
                api: `${mentorApi}/${info.id}`
            };
            dispatch(changeMentor(requestData))
        }
        else handleClose()
    }
    useEffect(() =>
    {
        document.body.style.overflow = 'hidden';
    }, [])
    return (
        <div onClick={closeModal} className={`${styles.window} window`}>
            <section id='descModal' className={styles.content}>
                <h2>Редактировать навыки и умения</h2>
                <div className={styles.skils}>
                    <div className={styles.skilsFlex}>
                        {
                            newSkils.map((el, i) => <div className={styles.skil} key={i}><p>{el}</p><div onClick={() => deleteSkil(el)}><img src={closeX} alt="img" /></div></div>)
                        }
                    </div>
                    {
                        showForm ?
                            <form className={styles.newSkilForm} onSubmit={addNewSkill} action="">

                                <input value={newSkil} onChange={e => setNewSkil(e.target.value)} required minLength={2} type="text" placeholder='Skill' />
                                <button>Добавить</button>

                            </form>
                            :
                            <div onClick={() => setShowForm(true)} className={styles.AddSkilBtn}>Добавить навык...</div>
                    }
                </div>
                <p className={styles.limit}>{newSkils.length} скилов / Максимум 15 навыков</p>
                <div onClick={handleClose} className={styles.btn}><img src={closeX} alt="" /></div>
                <div className={styles.downActions}>
                    <button onClick={handleClose} className={styles.cancel}>Отмена</button>
                    <button onClick={() => handleSave()} className={styles.save}>Сохранить</button>
                </div>
            </section>
        </div>
    )
}

export default ModalSkils