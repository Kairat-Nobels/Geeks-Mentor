import styles from './personalNav.module.css'
import profile from '../../assets/images/PersonalNav/navProfile.svg'
import security from '../../assets/images/PersonalNav/navSecurity.svg'
import logOut from '../../assets/images/PersonalNav/navLogOut.svg'
import { NavLink, useLocation } from 'react-router-dom'

const PersonalNav = ({ getOut }) => {

    const location = useLocation()
    const isCabinetRoute = location.pathname === '/geeks/cabinet'
    const isCabinetSecRoute = location.pathname === '/geeks/cabinet/security'

    return (
        <nav className={styles.wrapper}>
            <ul className={styles.wrapperList}>
                <li>
                    <NavLink className={isCabinetRoute ? styles.active : styles.idle} to={'/geeks/cabinet'} >
                        <img src={profile} alt='profile' />
                        <p>Профиль</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink className={isCabinetSecRoute ? styles.active : styles.idle} to={'/geeks/cabinet/security'}>
                        <img src={security} alt='security' />
                        <p>Безопасность</p>
                    </NavLink>
                </li>
                <li onClick={getOut} >
                    <NavLink className={styles.logOut} >
                        <img src={logOut} alt='log-out' />
                        <p>Выйти</p>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default PersonalNav;