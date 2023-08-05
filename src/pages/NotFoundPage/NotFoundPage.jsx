import React from 'react'
import { Link } from 'react-router-dom'
import arrow from '../../assets/images/Home/arrow-right.svg'
import styles from './NotFoundPage.module.css'
function NotFoundPage()
{
    return (
        <div className='container'>
            <div className={styles.allBlock}>
                <h2 className={styles.texth2}>Ошибка 404</h2>
                <p className={styles.p}>Страница не найдена</p>
                <Link to='/'>
                    <button className={styles.button}>
                        <img src={arrow} alt={'img'} />
                        <p>На главную</p>
                    </button>
                </Link>
            </div>
        </div>

    )
}

export default NotFoundPage