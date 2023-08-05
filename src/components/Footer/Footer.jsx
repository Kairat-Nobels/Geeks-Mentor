import styles from './footer.module.css'
import logoFooter from '../../../public/logoFooter.svg'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import googlePlay from '../../assets/images/Footer/googlePlay.png';
import appStore from '../../assets/images/Footer/appStore.png';
function Footer()
{
    const { loading } = useSelector(state => state.mentorsReducer)
    const navigate = useNavigate()
    return (
        <div className={styles.footer}>
            <div className={styles.footerInner}>
                <div className={styles.logoFrame}>
                    <div className={styles.logo}><img src={logoFooter} alt="logo" /></div>
                </div>
                <div className={styles.col}>
                    <div className={styles.topRow}>
                        <div className={styles.course}>
                            <h3 className={styles.title}>Направления</h3>
                            <h3>UX/UI</h3>
                            <h3>Frontend</h3>
                            <h3>Backend</h3>
                            <h3>Project manager</h3>
                            <h3 className={styles.last}>Мобильная разработка</h3>
                        </div>
                        <div className={styles.navigation}>
                            <h3 className={styles.title}>Навигация по сайту</h3>
                            <a onClick={() => navigate('/geeks/about')}>О нас</a>
                            <a onClick={() => navigate('/geeks/mentors')}>Найти ментора</a>
                            <a onClick={() => navigate('/geeks')} href='geeks#FAQ'>FAQ - часто задаваемые вопросы</a>
                            <a onClick={() => navigate('/geeks')} href='geeks#mentorGuide' className={styles.last}>Стать ментором</a>
                        </div>
                        <div className={`${styles.cabinet} ${styles.lastInTopRow}`}>
                            <h3 className={styles.title}>Личный кабинет</h3>
                            <a onClick={() => navigate('/geeks/cabinet')}>Профиль</a>
                            <a onClick={() => navigate('/geeks/cabinet/security')} className={styles.last}>Безопасность</a>
                        </div>
                    </div>
                    {
                        !loading &&
                        <div className={styles.bottomRow}>
                            <div className={styles.address}>
                                <h3 className={styles.title}>Адрес</h3>
                                <a href="https://go.2gis.com/e6xm7" target="_blank">г. Бишкек, ул. Ибраимова, 103, Бизнес-центр Victory, правое крыло, 4-этаж</a>
                                <a href="https://go.2gis.com/elk0f" target="_blank">9 мкр, ул. Суеркулова 10Б, ЖК “Тумар”, цокольный этаж</a>
                                <a href="https://go.2gis.com/xgyrs" target="_blank">г. Ош, ул. Мырзалы Аматова 1Б, БЦ Томирис, цокольный этаж (здание Визион)</a>
                                <a href="https://go.2gis.com/v3ilu" target="_blank" className={styles.last}>г. Кара - Балта, ул. Кожомбердиева 112, напротив Сах. завода, выше здания Олимпик</a>
                                <div>
                                    <a href="https://play.google.com/store/games?hl=ru&gl=US" target='_blank'>
                                        <img src={googlePlay} alt="img" />
                                        <p>Google Play</p>
                                    </a>
                                    <a href="https://www.apple.com/ru/app-store/" target='_blank'>
                                        <img src={appStore} alt="img" />
                                        <p>App Store</p>
                                    </a>
                                </div>
                            </div>
                            <div className={styles.contacts}>
                                <h3 className={styles.title}>Контакты</h3>
                                <a href="tel:+996557052018" target="_blank">+996 (557) 05 20 18</a>
                                <a href="tel:+996507052018" target="_blank">+996 (507) 05 20 18</a>
                                <a href="tel:+996777052018" target="_blank" className={styles.last}>+996 (777) 05 20 18</a>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Footer
