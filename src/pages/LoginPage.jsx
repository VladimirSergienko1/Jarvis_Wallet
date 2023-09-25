import styles from './LoginPage.module.css'
import info from '/src/assets/Info.svg'

const LoginPage = () =>{
    return(
        <div className={styles.login_page}>
            <div className={styles.login_page__container}>
                <img src={info}/>
                <div>
                    <p>Login</p>

                </div>
            </div>
        </div>
    )
}

export default LoginPage