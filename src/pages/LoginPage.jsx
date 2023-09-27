import styles from './LoginPage.module.scss'
import info from '/src/assets/Info.svg'

const LoginPage = () =>{
    return(
        <div className={styles.login_page}>
            <div className={styles.login_page__container}>
                <img src={info} alt="Info"/>
                <div className={styles.sign_in_block}>
                    <form className={styles.sign_in_form}>
                        <p className={styles.sign_in_title}>Login</p>
                        <label htmlFor={'email_input'} className={styles.sign_in_label}>Email</label>
                        <input id={'email_input'} className={styles.sign_in_input} />
                        <label htmlFor={'pass_input'} className={styles.sign_in_label}>Password</label>
                        <input id={'pass_input'} className={styles.sign_in_input} />
                        <button className={styles.sign_in_button}>Sign In</button>
                    </form>
                    <p className={styles.sign_in_divider}>or</p>


                </div>
            </div>
        </div>
    )
}

export default LoginPage