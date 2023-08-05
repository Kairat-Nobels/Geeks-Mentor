import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import userApi from "../../api/userApi.js";
import styles from "./ChangeProfileModal.module.css"
import { changeUser } from "../../redux/slices/usersSlice.jsx";
import close from "../../assets/images/Home/x.svg";

function ChangeProfileModal({ profession, info, setModalStudentInfo, month, setMonth })
{
    const defProfession = ['Мобильный разработчик', 'Frontend', 'UX-UI Дизайнер', 'Backend', 'Project Manager'];
    const [newProfession, setNewProfession] = useState(profession);
    const courses = defProfession.filter(el => el !== profession);
    const defMonth = ['1 месяц', '2 месяц', '3 месяц', '4 месяц', '5 месяц', '6 месяц', '7 месяц']
    const [monthes, setMonthes] = useState(defMonth.filter(el => el !== month));
    const [newMonth, setNewMonth] = useState(month);
    const dispatch = useDispatch();

    useEffect(() =>
    {
        document.body.style.overflow = 'hidden';
        chooseMonth(profession)
    }, []);
    const chooseMonth = (el) =>
    {
        if (el === 'Frontend' || el === 'Backend') {
            setMonthes(['1 месяц', '2 месяц', '3 месяц', '4 месяц', '5 месяц']);
        } else if (el === 'UX-UI Дизайнер' || el === 'Project Manager') {
            setMonthes(['1 месяц', '2 месяц', '3 месяц']);
        } else {
            setMonthes(['1 месяц', '2 месяц', '3 месяц', '4 месяц', '5 месяц', '6 месяц', '7 месяц']);
        }
    };

    const closeModal = (e) =>
    {
        if (!document.querySelector('#modal').contains(e.target)) {
            document.body.style.overflow = '';
            setModalStudentInfo(false);
        }
    };

    const handleClose = () =>
    {
        document.body.style.overflow = '';
        setModalStudentInfo(false);
    };
    const handleSave = () =>
    {
        if (profession !== newProfession) {
            const requestData = {
                data: { course: newProfession },
                api: `${userApi}/${info.id}`
            };
            dispatch(changeUser(requestData));
        }
        if (`${month} месяц` !== newMonth) {
            const requestData = {
                data: { month: newMonth },
                api: `${userApi}/${info.id}`
            };
            dispatch(changeUser(requestData));
        }
        else handleClose();
        setModalStudentInfo(false);
    };

    return (
        <div onClick={closeModal} className={`${styles.window} window`}>
            <section id='modal' className={styles.content}>
                <div>
                    <h2>Редактировать направление</h2>
                    <select
                        id="selectNewProfession"
                        name="selectNewProfession"
                        className={styles.select}
                        onChange={(e) =>
                        {
                            setNewProfession(e.target.value);
                            chooseMonth(e.target.value);
                        }}
                        value={newProfession}
                    >
                        <option value={newProfession}>{newProfession}</option>
                        {
                            courses.map((c, i) => <option key={i} value={c}>{c}</option>)
                        }
                    </select>
                </div>
                <div>
                    <h2>Редактировать месяц обучения</h2>
                    <select
                        id="selectNewMonth"
                        name="selectNewMonth"
                        className={styles.select}
                        onChange={(e) => setNewMonth(e.target.value)
                        }
                        value={newMonth}
                    >
                        <option value={newMonth}>{newMonth} </option>
                        {monthes.map((m, i) => (
                            <option key={i} value={m}>
                                {m}
                            </option>
                        ))}
                        <option value="Выпускник">Выпускник</option>
                    </select>
                </div>
                <div onClick={handleClose} className={styles.btn}><img src={close} alt="" /></div>
                <div className={styles.buttonsEnd}>
                    <button onClick={handleClose} className={styles.cancel}>Отмена</button>
                    <button onClick={handleSave} className={styles.save}>Сохранить</button>
                </div>
            </section>
        </div>
    );
}

export default ChangeProfileModal;
