import styles from "./TelegramReg.module.scss";
import info from "../../assets/LoginPage/Info.svg";
import errorIcon from "../../assets/LoginPage/Error_round.svg";
import correctIcon from "../../assets/LoginPage/Done_round.svg";
import {Link} from "react-router-dom";
import backBtn from "../../assets/LoginPage/button_register_background.svg";
import bellIcon from "../../assets/LoginPage/bell_icon.svg";
import fireIcon from "../../assets/LoginPage/fire_icon.svg";
import lampIcon from "../../assets/LoginPage/lamp_icon.svg";
import * as Yup from "yup";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../features/login/loginSlice.js";


const validationSchema = Yup.object({
    username: Yup.string()
        .min(3, 'Name should be 3')
        .max(8, 'Name should be 8')
        .required('Name is required'),
});
const TelegramRegistration = () =>{
   const registrationData = useSelector((state) => state.login.registrationData);
   const dispatch = useDispatch()
    console.log('RegData',registrationData)

    const formik = useFormik({
        initialValues: {
            username: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const RegistrationData = {...registrationData, telegram: values?.username}
            console.log('TgData',RegistrationData);
            dispatch(registerUser(RegistrationData));
        },
    });

    return(
        <div className={styles.telegram_page}>
            <div className={styles.telegram_page__container}>
                <img src={info} alt="Info"/>
                <div className={styles.telegram_block}>
                    <form className={styles.telegram_form} onSubmit={formik.handleSubmit} >
                        <h2 className={styles.telegram_title}>Use a virtual assistant to help manage your finances!</h2>
                        <label htmlFor={'username_input'} className={styles.telegram_label}>Username in Telegram</label>
                        <div className={styles.input_container}>
                            <input
                                id="username_input"
                                name="username"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.username}

                                className={styles.telegram_input}
                            />
                            {formik.touched.username && formik.errors.username && (
                                <p className={styles.error_text}>{formik.errors.username}</p>
                            )}
                            {formik.touched.username && (
                                formik.errors.username ? (
                                    <img className={styles.error_img} src={errorIcon}/>
                                ) : (
                                    <img className={styles.error_img} src={correctIcon}/>
                                )
                            )}
                        </div>
                        <div className={styles.telegram_advantages_block}>
                            <div className={styles.advantages}>
                                <img src={bellIcon} alt={'correct_icon'}/>
                                <p className={styles.advantages_label}>Regular reports</p>
                            </div>
                            <div className={styles.advantages}>
                                <img src={fireIcon} alt={'correct_icon'}/>
                                <p  className={styles.advantages_label}>Personal advice</p>
                            </div>
                            <div className={styles.advantages}>
                                <img src={lampIcon} alt={'correct_icon'}/>
                                <p className={styles.advantages_label}>Alert about critical situations</p>
                            </div>
                        </div>

                        <div className={styles.telegram_footer}>
                            <Link to={'/registration'}>
                                <div className={styles.telegram_back}>
                                    <img  src={backBtn} alt={'back_button'}/>
                                </div>
                            </Link>

                            <button className={styles.telegram_button} type={"submit"} >Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}
export default TelegramRegistration