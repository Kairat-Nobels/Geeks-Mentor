import React, { useEffect, useState } from 'react';
import MentorCard from '../../../../components/MentorCard/MentorCard';
import styles from './FilteredPage.module.css';
import Programs from '../../../../components/Programs/Programs';
import Pagination from "../Pagination/Pagination";
import BreadCrums from '../../../../components/BreadCrums/BreadCrums';
import { useSelector } from 'react-redux';
import Spinner from '../../../../components/Spinner/Spinner';

function FilteredPage({ skils, langMentor, mentorProf })
{
    const [offset, setOffset] = useState(0);
    const [skilLoad, setSkilLoad] = useState(false);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [programs, setPrograms] = useState([]);
    const { mentors, loading } = useSelector(state => state.mentorsReducer)
    const [mentorsF, setMentorsF] = useState(mentors);
    const [skilF, setSkilF] = useState('')
    const [pageOffset, setPageOffset] = useState(12)

    useEffect(() =>
    {
        setPrograms(skils.filter((el) => el.type === mentorProf));
        handleChangePage(1)
    }, [mentorProf]);

    useEffect(() =>
    {
        setPageCount(Math.ceil(mentorsF.length / pageOffset));
    }, [mentorsF]);
    useEffect(() =>
    {
        handleChangePage(1)
        if (langMentor) setMentorsF(mentors.filter(item => item.language.includes(langMentor) && item.course === mentorProf))
        else setMentorsF(mentors.filter(item => item.course === mentorProf))
    }, [mentors, langMentor]);

    const handleChangePage = (e) =>
    {
        setPage(e);
        setOffset((e - 1) * pageOffset);
        setTimeout(() =>
        {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
    };
    const handleClick = (value) =>
    {
        setSkilLoad(true)
        setSkilF(value)
        handleChangePage(1)
        if (value) {
            langMentor ? setMentorsF(mentors.filter((item) => item.skils.includes(value) && item.language.includes(langMentor) && item.course === mentorProf)) :
                setMentorsF(mentors.filter((item) => item.skils.includes(value) && item.course === mentorProf));
        }
        else {
            langMentor ? setMentorsF(mentors.filter((item) => item.language.includes(langMentor) && item.course === mentorProf)) : setMentorsF(mentors.filter((item) => item.course === mentorProf))
        }
        setTimeout(() =>
        {
            setSkilLoad(false);
        }, 200);
    }
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
    return (
        <div className={styles.page}>
            <BreadCrums />
            <div className={styles.headerTitle}>
                <h1>{mentorProf}</h1>
                <p>{mentorsF.length} менторов</p>
            </div>
            {
                programs.length > 0 &&
                <div className={styles.programs}>
                    {programs.map((i) => (
                        <Programs key={i.id} skilF={skilF} handleClick={handleClick} data={i} />
                    ))}
                </div>
            }
            <div className={styles.cards}>
                {
                    loading || skilLoad ? <Spinner />
                        :
                        mentorsF.length > 0 ? mentorsF.slice(offset, offset + pageOffset).map((el) => (
                            <MentorCard key={el.id} data={el} />
                        ))
                            : <h2 className={styles.empty}>По вашему запросу ничего не найдено</h2>
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
    );
}

export default FilteredPage;
