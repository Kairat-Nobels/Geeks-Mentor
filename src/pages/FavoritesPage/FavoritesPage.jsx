import React, { useEffect, useState } from 'react';
import MentorCard from '../../components/MentorCard/MentorCard';
import { useSelector } from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';
import styles from './FavoritesPage.module.css'
import Pagination from '../MentorsPage/components/Pagination/Pagination';

function FavoritesPage()
{
    const { info, loading } = useSelector(state => state.usersReducer);
    const [page, setPage] = useState(1);
    const [offset, setOffset] = useState(0);
    const [pageCount, setPageCount] = useState(1);
    const [pageOffset, setPageOffset] = useState(12);

    const handleChangePage = (page) =>
    {
        setPage(page);
        setOffset((page - 1) * pageOffset);
        setTimeout(() =>
        {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
    };
    useEffect(() =>
    {
        info?.favorites && setPageCount(Math.ceil(info.favorites.length / pageOffset));
        pageCount < page && handleChangePage(page - 1)
    }, [info, pageCount]);

    const pageLabelBuilder = () => <span>{`${page} / ${pageCount}`}</span>;

    useEffect(() =>
    {
        const checkWidth = () =>
        {
            if (window.innerWidth <= 460) setPageOffset(8);
            else setPageOffset(12);
        };
        checkWidth();
        window.scrollTo(0, 0)
        window.addEventListener('resize', checkWidth);
        return () =>
        {
            window.removeEventListener('resize', checkWidth);
        };
    }, []);

    return (
        <>
            {loading ? (
                <Spinner />
            ) : info && info.favorites && info.favorites.length > 0 ? (
                <div className={styles.pages}>
                    <h2>Избранные ментора</h2>
                    <div className={styles.cards}>
                        {info.favorites.slice(offset, offset + pageOffset).map(m => (
                            <MentorCard key={m.id} data={m} />
                        ))}
                    </div>
                    {
                        pageCount > 1 &&
                        <Pagination
                            handleChangePage={handleChangePage}
                            page={page}
                            count={pageCount}
                            pageLabelBuilder={pageLabelBuilder}
                        />
                    }
                </div>


            ) : (
                <span className={styles.notFound}>Вы никого еще не добавили в избранные:(</span>
            )}
        </>
    );
}

export default FavoritesPage;
