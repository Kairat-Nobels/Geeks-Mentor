import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../../../components/Spinner/Spinner'
import MentorCard from '../../../../components/MentorCard/MentorCard'
import { NavLink } from 'react-router-dom'
import { selectFilter } from '../../../../redux/slices/filterSlice'
import arrowRight from '../../../../assets/images/Home/arrow-right.svg'
import styles from './SkilsFiltered.module.css'
import Pagination from '../Pagination/Pagination'
function SkilsFiltered({ langMentor, skilF })
{
    const [offset, setOffset] = useState(0);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [pageOffset, setPageOffset] = useState(12)
    const [mentorsF, setMentorsF] = useState([])
    const { mentors, loading } = useSelector(state => state.mentorsReducer)
    const dispatch = useDispatch()
    useEffect(() =>
    {
        langMentor ? setMentorsF(mentors.filter(item => item.language.includes(langMentor) && (skilF && item.skils.includes(skilF)))) : skilF ? setMentorsF(mentors.filter(item => item.skils.includes(skilF))) : setMentorsF(mentors)
        if (skilF === 'Java') {
            setPageCount(Math.ceil(mentors.filter(el => el.course === 'Android').length / pageOffset))
            setMentorsF(mentors.filter(el => el.course === 'Android'))
        }
        else setPageCount(Math.ceil(mentors.length / pageOffset));
    }, [mentors, langMentor])
    useEffect(() =>
    {
        setPageCount(Math.ceil(mentorsF.length / pageOffset));
    }, [mentorsF])
    const handleChangePage = (e) =>
    {
        setPage(e);
        setOffset((e - 1) * pageOffset);
        setTimeout(() =>
        {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
    };
    const pageLabelBuilder = () => <span>{`${page} / ${pageCount}`}</span>;
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
    useEffect(() =>
    {
        setPage(1)
        setOffset(0)
    }, [skilF])
    return (
        <div className={styles.page}>
            <div className={styles.cards}>
                {
                    loading ? <Spinner />
                        :
                        mentorsF.length > 0 ?
                            skilF !== 'Java' ?
                                mentorsF.slice(offset, offset + pageOffset).map((el) => (
                                    <MentorCard key={el.id} data={el} />
                                )) :
                                mentorsF.filter(el => el.course === 'Android').slice(offset, offset + pageOffset).map((el) => (
                                    <MentorCard key={el.id} data={el} />
                                ))
                            :
                            <h3>По поиску ничего не найдено</h3>
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

export default SkilsFiltered