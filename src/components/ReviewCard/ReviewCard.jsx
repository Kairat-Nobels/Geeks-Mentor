import React from 'react'
import styles from './ReviewCard.module.css'
function ReviewCard({ review })
{
    return (
        <div className={styles.reviewCard}>
            <h3 className={styles.reviewCardText}>{review}</h3>
        </div>
    )
}

export default ReviewCard