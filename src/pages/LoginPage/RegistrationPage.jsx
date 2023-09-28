import styles from './RegistrationPage.module.scss'
import info from "../../assets/LoginPage/Info.svg";
import backBtn from "../../assets/LoginPage/button_register_background.svg";
import requiredIcon from "../../assets/LoginPage/required.svg";

const RegistrationPage = () =>{
    return(
        <div className={styles.registration_page}>
            <div className={styles.registration_page__container}>
                <img src={info} alt="Info"/>
                <div className={styles.reg_block}>
                    <form className={styles.reg_form} >
                        <p className={styles.reg_title}>New user</p>
                        <label htmlFor={'name_input'} className={styles.reg_label_required}>Name</label>
                        <input id={'name_input'} className={styles.reg_input} />
                        <label htmlFor={'email_input'} className={styles.reg_label_required}>Email</label>
                        <input id={'email_input'} className={styles.reg_input} />
                        <label htmlFor={'phone_input'} className={styles.reg_label}>Phone number</label>
                        <input id={'phone_input'} className={styles.reg_input} />
                        <label htmlFor={'pass_input'} className={styles.reg_label_required}>Password</label>
                        <input id={'pass_input'} className={styles.reg_input} />
                        <label htmlFor={'repass_input'} className={styles.reg_label_required}>Password again</label>
                        <input id={'repass_input'} className={styles.reg_input} />
                        <label htmlFor={'language_input'} className={styles.reg_label}>Language</label>
                        <input id={'language_input'} className={styles.reg_input} />
                        <div className={styles.reg_footer}>
                            <div className={styles.reg_back}>
                                <img  src={backBtn}/>
                            </div>

                            <button className={styles.reg_button} type={"submit"} >Continue</button>
                        </div>
                    </form>

                </div>

            </div>

        </div>
    )

}

export default RegistrationPage