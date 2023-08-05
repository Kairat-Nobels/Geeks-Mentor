import { useEffect, useState } from 'react'
import styles from './layout.module.css'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, getOne } from '../../redux/slices/usersSlice'
import { outWebsite } from '../../redux/slices/entranceSlice'
import userApi from '../../api/userApi'
import burgerClose from '../../assets/images/burgerClose.svg'
import Footer from '../../components/Footer/Footer'
import SearchMentor from '../../components/SearchMentor/SearchMentor'
import ava from '../../assets/images/defaultAva.svg'
import profile from '../../assets/images/Home/user.svg'
import logOut from '../../assets/images/Home/log-out.svg'
import { getMentors } from '../../redux/slices/mentorsSlice'
import menotrApi from '../../api/mentorApi'
import PersonalNav from '../../components/PersonalNav/PersonalNav'
import { selectFilter } from '../../redux/slices/filterSlice'
import menuAdaptive from '../../assets/images/Adaptive/menu.svg'
import SearchBurger from '../../components/SearchBurger/SearchBurger'
import favoriteIcon from '../../assets/images/actionsIcons/favorit.svg'
function Layout()
{
    const [burger, setBurger] = useState(false)
    const [popUp, setPopUp] = useState(false)
    const [image, setImage] = useState(ava)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { users, info } = useSelector(state => state.usersReducer)
    const { mentors, infoM } = useSelector(state => state.mentorsReducer)
    const data = JSON.parse(window.localStorage.getItem('data'))
    useEffect(() =>
    {
        dispatch(getUsers(userApi))
        localStorage.removeItem('forConfirm')
    }, [])
    useEffect(() =>
    {
        if (info) info.ava ? setImage(info.ava) : setImage(ava)
    }, [info])
    useEffect(() =>
    {
        for (const user of users) {
            if (user.email === data.email) {
                const newApi = `${userApi}/${user.id}`
                dispatch(getOne(newApi))
            }
        }
    }, [users])
    useEffect(() =>
    {
        if (infoM) infoM.ava && setImage(infoM.ava)
    }, [infoM])
    useEffect(() =>
    {
        for (const mentor of mentors) {
            if (mentor.email === data.email) {
                const newApi = `${menotrApi}/${mentor.id}`
                dispatch(getOne(newApi))
            }
        }
    }, [mentors])
    const getOut = (e) =>
    {
        e.preventDefault()
        dispatch(outWebsite())
        navigate('/')
        dispatch(selectFilter(''))
    }
    const closeBurger = (e) =>
    {
        if (burger && !document.querySelector('#burgerContent').contains(e.target)) {
            document.body.style.overflow = '';
            setBurger(false)
        }
    }
    const location = useLocation()
    const isCabinetRoute = location.pathname === '/geeks/cabinet'
    const isCabinetSecRoute = location.pathname === '/geeks/cabinet/security'
    burger ? document.body.style.overflow = 'hidden' : document.body.style.overflow = ''
    return (
        <div className={styles.wrap}>
            <div className={styles.menu}>
                <nav className={`${styles.navbar} container`}>
                    <div onClick={() => setBurger(true)} className={styles.burgerImg}>
                        <img src={menuAdaptive} alt="" />
                    </div>
                    <NavLink className={styles.logo} to={'/geeks'}><div ><img src='../../../LogoG.svg' alt="" /></div></NavLink>
                    <ul>
                        <li><NavLink to='/geeks/mentors' className={({ isActive }) => (isActive ? styles.active : '')}>Менторы</NavLink></li>
                        <li className={styles.aboutUs}><NavLink className={({ isActive }) => (isActive ? styles.active : '')} to={'/geeks/about'}>О нас</NavLink></li>
                        <li><a onClick={() => navigate('/geeks')} href='geeks#FAQ'>FAQ</a></li>
                    </ul>
                    <SearchMentor />
                    <div className={styles.allAva}>
                        {
                            data.role === 'Студент' &&
                            <NavLink className={styles.favorites} to={'/geeks/favorite'}>
                                <img src={favoriteIcon} alt="" />
                                <p>{info && info.favorites ? info.favorites.length : '0'}</p>
                            </NavLink>
                        }
                        <div onClick={() => setPopUp(!popUp)} className={styles.profile}>
                            <div className={styles.ava}><img src={image} alt="" /></div>
                            {
                                <div id='lich' className={styles.popUp} style={{ zIndex: '11' }} >
                                    <div className={styles.room}>
                                        <div className={styles.image}><img src={profile} alt="img" /></div>
                                        <NavLink to={'/geeks/cabinet'}><p>Личный кабинет</p></NavLink>
                                    </div>
                                    <NavLink onClick={getOut}><div className={styles.logOut}>
                                        <img src={logOut} alt="img" />
                                        <p>Выйти</p>
                                    </div></NavLink>
                                </div>
                            }
                        </div>
                    </div>
                </nav>
                {
                    burger &&
                    <div className={styles.wrapperBurger} onClick={closeBurger}>
                        <div id='burgerContent' className={styles.burger}>
                            <div className={styles.burgerBtn} onClick={() => setBurger(false)}><img src={burgerClose} alt="" /></div>
                            <div className={styles.burgerContent}>
                                <ul>
                                    <li><NavLink onClick={() => setBurger(false)} to='/geeks' className={(location.pathname === '/geeks') ? styles.active : ''}>Главная</NavLink></li>
                                    <li><a onClick={() =>
                                    {
                                        setBurger(false)
                                        navigate('/geeks')
                                    }} href='#courses'>Направления</a></li>
                                    <li><NavLink onClick={() => setBurger(false)} to='/geeks/mentors' className={({ isActive }) => (isActive ? styles.active : '')}>Менторы</NavLink></li>
                                    <li><a onClick={() =>
                                    {
                                        setBurger(false)
                                        navigate('/geeks')
                                    }
                                    } href='geeks#FAQ'>FAQ</a></li>
                                </ul>
                                <SearchBurger setBurger={setBurger} />
                            </div>
                        </div>
                    </div>
                }
            </div>

            {isCabinetRoute && <PersonalNav getOut={getOut} />}
            {isCabinetSecRoute && <PersonalNav getOut={getOut} />}

            <div className="outlet">
                <Outlet />
            </div>
            <Footer />
        </div >
    )
}

export default Layout