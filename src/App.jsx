import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './pages/Layout/Layout'
import HomePage from './pages/HomePage/HomePage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegistrPage from './pages/RegistrPage/RegistrPage'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { cameWebsite } from './redux/slices/entranceSlice'
import CoursePage from './pages/CoursePage/CoursePage'
import MentorsPage from './pages/MentorsPage/MentorsPage'
import PersonalPage from './pages/PersonalPage/PersonalPage'
import ConfirmPassword from './pages/ForgotPassword/ConfirmPassword/ConfirmPassword'
import ChangePassword from './pages/ForgotPassword/ChangePassword/ChangePassword'
import PersonalNav from './components/PersonalNav/PersonalNav'
import PersonalSecurity from './components/PersonalSecurity/PersonalSecurity'
import MentorPage from './pages/MentorPage/MentorPage'
import FavoritesPage from './pages/FavoritesPage/FavoritesPage'
import FromEmailPage from './pages/FromEmailPage/FromEmailPage'
import AboutPage from './pages/AboutPage/AboutPage'

function App()
{
    const { valid } = useSelector(state => state.entranceReducer)

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<RegistrPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/forgot' element={<ForgotPassword />} />
                    <Route path='/confirm' element={<ConfirmPassword />} />
                    <Route path='/newPassword' element={<ChangePassword />} />
                    <Route path='/emailConfirm' element={<FromEmailPage />} />
                    {
                        valid &&
                        <Route path='/geeks' element={<Layout />}>
                            <Route index element={<HomePage />} />
                            <Route path={'/geeks/search'} element={<CoursePage />} />
                            <Route path={'/geeks/about'} element={<AboutPage />} />
                            <Route path={'/geeks/mentors'} element={<MentorsPage />} />
                            <Route path={'/geeks/favorite'} element={<FavoritesPage />} />
                            <Route path={'/geeks/mentors/:id'} element={<MentorPage />} />
                            <Route path={'/geeks/cabinet'} element={<PersonalPage />} />
                            <Route path={'/geeks/cabinet'} element={<PersonalNav />} />
                            <Route path={'/geeks/cabinet/security'} element={<PersonalSecurity />} />
                            <Route path={'/geeks/cabinet/security'} element={<PersonalNav />} />
                        </Route>
                    }
                    <Route path={'*'} element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
