import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import styles from "./ModalLanguage.module.css"
import close from "../../assets/images/Home/x.svg";
import mentorApi from '../../api/mentorApi';
import { changeMentor } from '../../redux/slices/mentorsSlice';

function ModalLanguage({ setModal, info })
{
    const dispatch = useDispatch();
    const [languagesNew, setNewLanguages] = useState({
        russian: false,
        kyrgyz: false
    });
    const [error, setError] = useState('');

    const handleLanguageChange = (event) =>
    {
        const { name, checked } = event.target;
        setNewLanguages(prevLanguages => ({
            ...prevLanguages,
            [name]: checked
        }));
        setError('');
    };

    const handleSubmit = (event) =>
    {
        event.preventDefault();

        if (!languagesNew.russian && !languagesNew.kyrgyz) {
            setError('Выберите хотя бы один язык');
            return;
        }
        const lan = []
        languagesNew.kyrgyz && lan.push('Кыргызский')
        languagesNew.russian && lan.push('Русский')
        if (lan !== info.language) {
            const requestData = {
                data: { language: lan },
                api: `${mentorApi}/${info.id}`
            };
            dispatch(changeMentor(requestData))
        }
        handleClose()
    };

    useEffect(() =>
    {
        document.body.style.overflow = 'hidden';
        info.language.includes('Кыргызский') && setNewLanguages(prevLanguages => ({
            ...prevLanguages,
            ["kyrgyz"]: true
        }));
        info.language.includes('Русский') && setNewLanguages(prevLanguages => ({
            ...prevLanguages,
            ["russian"]: true
        }));
    }, []);
    const closeModal = (e) =>
    {
        if (!document.querySelector('#modal').contains(e.target)) {
            document.body.style.overflow = '';
            setModal(false);
        }
    };

    const handleClose = () =>
    {
        document.body.style.overflow = '';
        setModal(false);
    };

    return (
        <div onClick={closeModal} className={`${styles.window} window`}>
            <form onSubmit={handleSubmit} id='modal' className={styles.content}>
                <h2>Редактировать языки менторства</h2>
                <p>Обязательно выбрать хотябы одно поле*</p>
                <div className={styles.languages}>
                    <label>
                        <input checked={languagesNew.russian}
                            onChange={handleLanguageChange} type="checkbox" name="russian" id="" />
                        Русский
                    </label>
                    <label>
                        <input checked={languagesNew.kyrgyz}
                            onChange={handleLanguageChange} type="checkbox" name="kyrgyz" id="" />
                        Кыргызский
                    </label>
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <div onClick={handleClose} className={styles.btn}><img src={close} alt="" /></div>
                <div className={styles.buttonsEnd}>
                    <button type='button' onClick={handleClose} className={styles.cancel}>Отмена</button>
                    <button className={styles.save}>Сохранить</button>
                </div>
            </form>
        </div>
    );
}

export default ModalLanguage;
