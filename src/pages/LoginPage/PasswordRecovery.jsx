import info from "../../assets/LoginPage/Info.svg";
import errorIcon from "../../assets/LoginPage/Error_round.svg";
import correctIcon from "../../assets/LoginPage/Done_round.svg";
import styles from "./PasswordRecovery.module.scss";
import {Link} from "react-router-dom";
import backBtn from "../../assets/LoginPage/button_register_background.svg";
import * as Yup from "yup";
import {useFormik} from "formik";

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required')
        .matches(
            /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
            "Invalid email format"
        ),
});
const PasswordRecovery = ()=>{

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return(
        <div className={styles.recovery_page}>
            <div className={styles.recovery_page__container}>
                <div className={styles.reg_block}>
                    <form className={styles.reg_form} onSubmit={formik.handleSubmit}>
                        <h2 className={styles.reg_title}>Password recovery</h2>
                        <h3 className={styles.reg_subtitle}>A new password will be sent to your email</h3>
                        <div className={styles.input_container}>
                            <label htmlFor={'email_input'} className={styles.reg_label}>Email</label>

                            <input
                                id="email_input"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                className={styles.reg_input}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className={styles.error_text}>{formik.errors.email}</p>
                            )}
                            {formik.touched.email && (
                                formik.errors.email ? (
                                    <img className={styles.error_img} src={errorIcon}/>
                                ) : (
                                    <img className={styles.error_img} src={correctIcon}/>
                                )
                            )}

                        </div>
                        <div className={styles.reg_footer}>
                            <Link to={'/main/login'}>
                                <div className={styles.reg_back}>
                                    <img  src={backBtn} alt={'back_button'}/>
                                </div>
                            </Link>

                            <button className={styles.reg_button} type={"submit"} >Send</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default PasswordRecovery