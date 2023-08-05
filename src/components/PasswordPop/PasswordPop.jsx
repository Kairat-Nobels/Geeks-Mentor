import { useEffect } from 'react';
import Spinner from '../Spinner/Spinner'
import styles from './PasswordPop.module.css'
import { useNavigate } from "react-router-dom";

function PasswordPop({ loading, setModal })
{
    const navigate = useNavigate()
    useEffect(() =>
    {
        document.body.style.overflow = 'hidden';
    }, [])
    const btnLink = () =>
    {
        document.body.style.overflow = '';
        setModal(false);
        navigate('/login')
    }
    return (
        <div className={`${styles.window} window`}>
            <section className={styles.content}>
                {
                    loading ? <Spinner /> :
                        <>
                            <h3>Пароль изменён</h3>
                            <p>Не сообщайте свой пароль и другую личную информацию другим. Вы будете перенаправлены на страницу входа</p>
                            <h2 onClick={btnLink} className={styles.link}>Войти</h2>
                        </>
                }

            </section>
        </div>
    )
}

export default PasswordPop