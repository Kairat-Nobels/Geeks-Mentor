import styles from './spinner.module.css'
import { RotatingLines } from 'react-loader-spinner'

function Spinner()
{
    return (
        <div className={styles.loading}>
            <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="100"
                visible={true}
            />
            <p>Loading...</p>
        </div>
    )
}

export default Spinner