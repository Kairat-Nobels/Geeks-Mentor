import styles from './Programs.module.css'
function Programs({ skilF, handleClick, data })
{
    return (
        <div style={skilF === data.name ? { background: '#262523' } : { background: '#FFFFFF' }} onClick={() => handleClick(data.name === skilF ? '' : data.name)} className={styles.program}>
            <h4 style={skilF === data.name ? { color: '#FFFFFF' } : { color: '#252525' }}>{data.name}</h4>
            <img src={data.img} alt="image" className={styles.logos} />
        </div>
    )

}
export default Programs;