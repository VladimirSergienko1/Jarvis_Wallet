
import styles from './Error.module.scss'
const Error403 = () => {
    return(
        <div className={styles.error_page}>
            <h1 className={styles.error_title}>403</h1>
            <h2 className={styles.error_subtitle}>No Access</h2>
        </div>
    )
}
export default Error403