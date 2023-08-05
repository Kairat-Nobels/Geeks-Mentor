import React from 'react'
import correct from '../../assets/images/Registr/correct.png'
import error from '../../assets/images/Registr/incorrect.svg'
import styles from './checkPassword.module.css'

export default function CheckPassword({ type, text })
{
    return (
        <section className={styles.message}>
            <img src={type ? correct : error} alt="img" />
            <p style={type ? { color: 'green' } : { color: "red" }}>{text}</p>
        </section>
    )
}
