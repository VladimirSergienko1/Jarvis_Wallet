import styles from './LoginPage.module.scss'
import info from '/src/assets/LoginPage/Info.svg'
import AppleSignIn from '/src/assets/LoginPage/button_sign_in_apple.svg'
import GoogleSignIn from '/src/assets/LoginPage/button_sign_in_google.svg'
import MicrosoftSignIn from '/src/assets/LoginPage/button_sign_in_microsoft.svg'
import {Link} from "react-router-dom";

const LoginPage = () =>{
    const handleSubmit = (e) =>{
        e.preventDefault();
    }

    return(
        <div className={styles.login_page}>
            <div className={styles.login_page__container}>
                <img src={info} alt="Info"/>
                <div className={styles.sign_in_block}>
                    <form className={styles.sign_in_form} onSubmit={handleSubmit}>
                        <p className={styles.sign_in_title}>Login</p>
                        <label htmlFor={'email_input'} className={styles.sign_in_label}>Email</label>
                        <input id={'email_input'} className={styles.sign_in_input} />
                        <label htmlFor={'pass_input'} className={styles.sign_in_label}>Password</label>
                        <input id={'pass_input'} className={styles.sign_in_input} />
                        <button className={styles.sign_in_button} type={"submit"} >Sign In</button>
                    </form>
                    <p className={styles.sign_in_divider}>or</p>
                    <div className={styles.sign_in_links}>
                        <a><img className={styles.sign_in_img} src={AppleSignIn}/></a>
                        <a><img className={styles.sign_in_img} src={GoogleSignIn}/></a>
                        <a><img className={styles.sign_in_img} src={MicrosoftSignIn}/></a>
                    </div>
                    <div className={styles.sign_in_footer}>
                        <Link to={'/registration'}><p className={styles.sign_in_account}>Create account</p></Link>
                        <a href={'#'}><p className={styles.sign_in_account}>Forgot password?</p></a>

                    </div>


                </div>
            </div>
        </div>
    )
}

export default LoginPage