import React, { useEffect, useState } from 'react';
import styles from './SuccessMessage.module.css';
import { useDispatch } from 'react-redux';
import { cameWebsite } from '../../redux/slices/entranceSlice';


const SuccessMessage = ({ message, data }) =>
{
    const dispatch = useDispatch()
    useEffect(() =>
    {
        localStorage.setItem('forConfirm', JSON.stringify(data))
    }, [])
    return (
        <section className={styles.successMessage}>
            {(
                <section className={styles.animation}>
                    <svg className={styles.animate} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 18 32.34 l -8.34 -8.34 -2.83 2.83 11.17 11.17 24 -24 -2.83 -2.83 z" stroke="#FFE600" fill="transparent" />
                    </svg>
                </section>
            )}
            <div className={styles.successText}>{message}</div>
        </section>
    );
};

export default SuccessMessage;