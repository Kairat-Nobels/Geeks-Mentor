import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './coursePage.module.css';
import MentorCard from '../../components/MentorCard/MentorCard';
import Spinner from '../../components/Spinner/Spinner';
import Pagination from '../MentorsPage/components/Pagination/Pagination';
import { NavLink } from 'react-router-dom';
import { selectFilter, selectLang } from '../../redux/slices/filterSlice'
import arrowRight from '../../assets/images/Home/arrow-right.svg'

function CoursePage()
{
    const { searchMentors, loading } = useSelector(state => state.mentorsReducer)
    const [offset, setOffset] = useState(0);
    const [mentors, setMentors] = useState(searchMentors);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const { search, selected, langMentor } = useSelector(state => state.filterReducer)
    const [pageOffset, setPageOffset] = useState(12)

    const dispatch = useDispatch()
    useEffect(() =>
    {
        if (selected !== "" && langMentor !== '') {
            setMentors(searchMentors.filter(m => m.course === selected && m.language.includes(langMentor)))
        }
        else if (selected !== "") setMentors(searchMentors.filter(m => m.course === selected))
        else if (langMentor !== "") setMentors(searchMentors.filter(m => m.language.includes(langMentor)))
        else setMentors(searchMentors)
    }, [selected, searchMentors, langMentor]);
    useEffect(() =>
    {
        setPageCount(Math.ceil(mentors.length / pageOffset));
    }, [mentors])
    const handleChangePage = (e) =>
    {
        setPage(e);
        setOffset((e - 1) * pageOffset);
        setTimeout(() =>
        {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
    };
    useEffect(() =>
    {
        window.scrollTo(0, 0);
        const checkWidth = () =>
        {
            if (window.innerWidth <= 460) setPageOffset(8)
            else setPageOffset(12)
        }
        checkWidth()
    }, [])
    window.addEventListener("resize", () =>
    {
        if (window.innerWidth <= 460) setPageOffset(8)
        else setPageOffset(12)
    })
    const pageLabelBuilder = () => <span>{`${page} / ${pageCount}`}</span>;
    return (
        <div className={styles.page}>
            <div className={styles.AllMentors}><NavLink onClick={() =>
            {
                dispatch(selectFilter(''))
                dispatch(selectLang(''))
            }} to='/geeks/mentors'><img src={arrowRight} alt="img" /><p>Посмотреть всех</p></NavLink></div>
            <div className={styles.cards}>
                {
                    loading ? <Spinner />
                        :
                        mentors.length > 0 ?
                            mentors.slice(offset, offset + pageOffset).map((el) => (
                                <MentorCard key={el.id} data={el} />
                            ))
                            :
                            <h3>По поиску <span>{search}</span> ничего не найдено</h3>
                }
            </div>
            {
                pageCount > 1 &&
                <Pagination
                    handleChangePage={(e) => handleChangePage(e)}
                    page={page}
                    count={pageCount}
                    pageLabelBuilder={pageLabelBuilder}
                />
            }
        </div>
    )
}

export default CoursePage