import styles from './SubmitBtn.module.css'

function SubmitBtn({ value, disable, onClick })
{
    return (
        <button disabled={disable} onClick={onClick} className={styles.button}>{value}</button>
    )
}

export default SubmitBtn