import { useEffect, useState } from 'react';
import ModalWrapper from './ModalWrapper'
import styles from './modalFullName.module.css'
import closeX from '../../assets/images/Home/x.svg';
import { useDispatch } from 'react-redux';
import userApi from '../../api/userApi';
import { changeUser } from '../../redux/slices/usersSlice';
import { changeMentor, createMentor } from '../../redux/slices/mentorsSlice';
import menotrApi from '../../api/mentorApi';

const ModalFullName = ({ info, image, setImage, setModalName }) =>
{
    const [newName, setNewName] = useState(info.name)
    const [newImage, setNewImage] = useState()
    const dispatch = useDispatch()
    useEffect(() =>
    {
        document.body.style.overflow = 'hidden'
    }, [])

    const handleModalClose = (e) =>
    {
        if (document.getElementById('portal').contains(e.target)) {
            document.body.style.overflow = '';
            setModalName(false)
        }
    }

    const handleXClose = () =>
    {
        document.body.style.overflow = '';
        setModalName(false)
    }

    const handleBubbling = (e) =>
    {
        e.stopPropagation()
    }

    const handleImageUpload = async (e) =>
    {
        const file = e.target.files[0]
        console.log(file.size);
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function ()
        {
            setNewImage(reader.result)
        }
    }

    const handleDragOver = (e) =>
    {
        e.preventDefault()
    }
    const handleSave = () =>
    {
        if (newImage) {
            setImage(newImage)
            const requestData = {
                data: { ava: newImage },
                api: `${info.role === 'Студент' ? userApi : menotrApi}/${info.id}`
            };
            info.role === 'Студент' ? dispatch(changeUser(requestData)) : dispatch(changeMentor(requestData));
        }
        const requestData = {
            data: { name: newName.trim() },
            api: `${info.role === 'Студент' ? userApi : menotrApi}/${info.id}`
        };
        if (info.name !== newName.trim()) {
            info.role === 'Студент' ? dispatch(changeUser(requestData)) : dispatch(changeMentor(requestData));
        }
        else handleXClose()
    }
    const handleDrop = (e) =>
    {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function ()
        {
            setNewImage(reader.result)
        }
    }
    const changeName = (e) =>
    {
        e.preventDefault()
        setNewName(newName.trim())
        if (newName.trim().length >= 3) handleSave()
        else alert("Имя должно содержать не менее 3 букв")
    }

    return (
        <ModalWrapper>
            <section id='portal' className={styles.wrapper} onClick={handleModalClose}>
                <div className={`${styles.window} window`} onClick={handleBubbling}>
                    <div className={styles.window_title}>
                        <p className={styles.window_title_text}>Редактировать имя пользователя</p>
                        <img onClick={handleXClose} src={closeX} alt="close-x" />
                    </div>
                    <form onSubmit={changeName} className={styles.window_input}>
                        <p className={styles.window_input_text}>Введите ФИО</p>
                        <input required minLength={3} onChange={e => setNewName(e.target.value)} value={newName} type="text" />
                    </form>
                    <div className={styles.window_imageTitle}>
                        <p className={styles.window_imageTitle_text}>Редактировать фото</p>
                        <form className={styles.window_imageTitle_imageForm} onDragOver={handleDragOver} onDrop={handleDrop}>

                            {
                                newImage ?
                                    <figure><img style={{ width: '100%' }} src={newImage} alt="" /></figure>
                                    :
                                    <>
                                        <p>Перетащите изображение</p>
                                        <p>или</p>
                                        <label htmlFor="imgFile">{'Загрузить'}</label>
                                        <input onChange={handleImageUpload} id="imgFile" type="file" accept="image/*" />
                                    </>
                            }
                        </form>
                    </div>
                    <div className={styles.window_btn}>
                        <button onClick={handleXClose} className={styles.window_btn_cancelBtn}>Отмена</button>
                        <button onClick={changeName} className={styles.window_btn_saveBtn}>Сохранить изменения</button>
                    </div>
                </div>
            </section>
        </ModalWrapper>
    )
};

export default ModalFullName;