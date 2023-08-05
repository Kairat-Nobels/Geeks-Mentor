import styles from './header.module.css';
import logo from '../../assets/images/Registr/LogoBlack.svg'

function Header()
{
    return (
        <div className={`${styles.header} container`}>
            <div className={styles.logo}><img src={logo} alt="logo" /></div>
        </div>
    )
}

export default Header