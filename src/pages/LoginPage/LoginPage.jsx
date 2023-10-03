import styles from './LoginPage.module.scss'
import info from '/src/assets/LoginPage/Info.svg'
import AppleSignIn from '/src/assets/LoginPage/button_sign_in_apple.svg'
import GoogleSignIn from '/src/assets/LoginPage/button_sign_in_google.svg'
import MicrosoftSignIn from '/src/assets/LoginPage/button_sign_in_microsoft.svg'
import {Link, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import * as Yup from "yup";
import {isPossiblePhoneNumber} from "react-phone-number-input";
import {useFormik} from "formik";
import errorIcon from "../../assets/LoginPage/Error_round.svg";
import correctIcon from "../../assets/LoginPage/Done_round.svg";
import axios from "axios";
import Cookies from 'js-cookie';
import {$isAuth, loginFx} from "../../store/login_model.js";
import {useStore} from "effector-react";
import {useEffect} from "react";

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required')
        .matches(
            /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
            "Invalid email format"
        ),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
});

const LoginPage = () =>{

    const isAuth = useStore($isAuth)

    const navigate = useNavigate()

/*    setTimeout(() => {
        console.log('Timeout',isAuth)
    },5000)*/


    useEffect(() => {
        if (isAuth) {
            navigate('/main');
        }
    }, [isAuth, navigate]);

    const { t, i18n } = useTranslation();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log(values);


                 await loginFx({email: values.email, password: values.password})
               /*  if(isAuth){
                     navigate('/main')
                 }*/


        },

    });

    return(
        <div className={styles.login_page}>
            <div className={styles.login_page__container}>
                <img src={info} alt="Info"/>
                <div className={styles.sign_in_block}>
                    <form className={styles.sign_in_form} onSubmit={formik.handleSubmit}>
                        <p className={styles.sign_in_title}>{t('Login')}</p>
                        <label htmlFor={'email_input'} className={styles.sign_in_label}>Email</label>
                        <div className={styles.input_container}>
                            <input
                                id="email_input"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                className={styles.sign_in_input}

                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className={styles.error_text}>{formik.errors.email}</p>
                            )}
                         {/*   {formik.touched.email && (
                                formik.errors.email ? (
                                    <img className={styles.error_img} src={errorIcon}/>
                                ) : (
                                    <img className={styles.error_img} src={correctIcon}/>
                                )
                            )}*/}
                        </div>
                        <label htmlFor={'pass_input'} className={styles.sign_in_label}>Password</label>
                        <div className={styles.input_container}>
                            <input
                                id="pass_input"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                className={styles.sign_in_input}

                            />
                            {formik.touched.password && formik.errors.password && (
                                <p className={styles.error_text}>{formik.errors.password}</p>
                            )}
                      {/*      {formik.touched.password && (
                                formik.errors.password ? (
                                    <img className={styles.error_img} src={errorIcon}/>
                                ) : (
                                    <img className={styles.error_img} src={correctIcon}/>
                                )
                            )}*/}
                        </div>
                        <button className={styles.sign_in_button} type={"submit"} >{t('Sign In')}</button>
                    </form>
                    <p className={styles.sign_in_divider}>or</p>
                    <div className={styles.sign_in_links}>
                        <a><img className={styles.sign_in_img} src={AppleSignIn}/></a>
                        <a><img className={styles.sign_in_img} src={GoogleSignIn}/></a>
                        <a><img className={styles.sign_in_img} src={MicrosoftSignIn}/></a>
                    </div>
                    <div className={styles.sign_in_footer}>
                        <Link to={'/registration'}><p className={styles.sign_in_account}>Create account</p></Link>
                        <Link to={'/recovery'}><p className={styles.sign_in_account}>Forgot password?</p></Link>

                    </div>


                </div>
            </div>
        </div>
    )
}

export default LoginPage