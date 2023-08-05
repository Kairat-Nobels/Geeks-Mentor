import React from 'react';
import styles from './Pagination.module.css';
import arrowImg from '../../../../assets/images/PaginateErrow.svg';

const Pagination = ({ handleChangePage, page, count, pageLabelBuilder }) =>
{
    const handlePrevPage = () =>
    {
        if (page > 1) {
            handleChangePage(page - 1);
        }
    };
    const handleNextPage = () =>
    {
        if (page < count) {
            handleChangePage(page + 1)
        }
    };

    return (
        <div className={styles.pagination}>
            <button onClick={handlePrevPage} disabled={page === 1}>
                <img style={{ transform: "rotate(180deg)" }} src={arrowImg} alt="img" />
            </button>
            {pageLabelBuilder()}
            <button onClick={handleNextPage} disabled={page === count}>
                <img src={arrowImg} alt="img" />
            </button>
        </div>
    );
};

export default Pagination;
