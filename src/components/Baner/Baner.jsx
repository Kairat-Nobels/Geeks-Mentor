import React from 'react'
import styles from './Baner.module.css'
import galka from '../../assets/images/Home/bannerList.png'
import { NavLink } from 'react-router-dom'
import search from '../../assets/images/actionsIcons/docIcon.svg'
import baner from '../../assets/images/Home/baner.jpg'

function Baner()
{
    return (
        <div className={styles.Baner}>
            <div className={styles.left}>
                <h2>Хороший ментор - путь к успеху</h2>
                <ul>
                    <li>
                        <div className={styles.list}>
                            <img src={galka} alt="img" />
                            <h3>Получи качественные советы</h3>
                        </div>
                        <p>Опытные ментора подскажут что и как делать</p>
                    </li>
                    <li>
                        <div className={styles.list}>
                            <img src={galka} alt="img" />
                            <h3>Можно получить помощь 24/7</h3>
                        </div>
                        <p>На сайте вы найдёте много менторов из любого направления</p>
                    </li>
                    <li>
                        <div className={styles.list}>
                            <img src={galka} alt="img" />
                            <h3>Сэкономь время</h3>
                        </div>
                        <p>С ментором процесс идёт быстрее и интересней</p>
                    </li>
                    <li>
                        <div className={styles.list}>
                            <img src={galka} alt="img" />
                            <h3>Ментор - твой друг</h3>
                        </div>
                        <p>Ментор станет не только наставником, но и другом</p>
                    </li>
                </ul>
                <NavLink className={styles.searchMentor} to="/geeks/mentors">
                    <div><img src={search} alt="img" /><h3>Список менторов</h3></div>
                </NavLink>
            </div>
            <div className={styles.right}>
                <div className={styles.banerImage}><img src={baner} alt="img" /></div>
            </div>
        </div >
    )
}

export default Baner