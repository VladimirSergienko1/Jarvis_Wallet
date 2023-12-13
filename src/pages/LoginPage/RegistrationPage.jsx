import styles from './RegistrationPage.module.scss'
import info from "../../assets/LoginPage/Info.svg";
import backBtn from "../../assets/LoginPage/button_register_background.svg";
import requiredIcon from "../../assets/LoginPage/required.svg";
import errorIcon from "../../assets/LoginPage/Error_round.svg";
import correctIcon from "../../assets/LoginPage/Done_round.svg";
import CustomSelect from "./CustomSelect.jsx";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from 'react-phone-number-input/input'
import {isPossiblePhoneNumber} from "react-phone-number-input";
import {loginUser, registerUser, setRegistrationData} from "../../features/login/loginSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {store} from "../../store/store.js";

const validationSchema = Yup.object({
    name: Yup.string()
        .min(3, 'Name should be 3')
        .max(8, 'Name should be 8')
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required')
        .matches(
            /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
            "Invalid email format"
        ),
    phone_number: Yup.string()
        .test('is-valid-phone', 'Invalid phone number', value =>
            value ? isPossiblePhoneNumber(value) : true
        ),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    rePassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Password confirmation is required'),

});
const RegistrationPage = () =>{
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const registrationData = useSelector((state) => state.login.registrationData);

    const options = [
        { value: 'en', label: 'English' },
        { value: 'ru', label: 'Russian' },
        { value: 'kk', label: 'Kazakh' },
        { value: 'ua', label: 'Ukrainian' },
    ];
    const [selectedOption, setSelectedOption] = useState({ value: 'en', label: 'English' });

    const handleLanguageChange = (option) => {
        setSelectedOption(option);
        formik.setFieldValue('language', option.value);
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone_number: '',
            password: '',
            rePassword: '',
            language: selectedOption.value,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log(values);

            const { rePassword, ...submissionValues } = values;
            try {
                dispatch(setRegistrationData(submissionValues));
                const currentRegistrationData = store.getState().login.registrationData;
                navigate('/telegram')
                console.log('Store',currentRegistrationData);
            } catch (error) {
                console.error("Ошибка регистрации:", error);
            }

        },
    });
    return(
        <div className={styles.registration_page}>
            <div className={styles.registration_page__container}>
                <img src={info} alt="Info"/>
                <div className={styles.reg_block}>
                    <form className={styles.reg_form} onSubmit={formik.handleSubmit}>
                        <h2 className={styles.reg_title}>New user</h2>
                        <label htmlFor={'name_input'} className={styles.reg_label_required}>Name</label>
                        <div className={styles.input_container}>
                            <input
                                id="name_input"
                                name="name"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                className={styles.reg_input}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <p className={styles.error_text}>{formik.errors.name}</p>
                            )}
                            {formik.touched.name && (
                                formik.errors.name ? (
                                    <img className={styles.error_img} src={errorIcon}/>
                                ) : (
                                    <img className={styles.error_img} src={correctIcon}/>
                                )
                            )}


                        </div>
                        <label htmlFor={'email_input'} className={styles.reg_label_required}>Email</label>
                        <div className={styles.input_container}>
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
                        <label htmlFor={'phone_input'} className={styles.reg_label}>Phone number</label>
                        <div className={styles.input_container}>
                            <Input
                                className={styles.reg_input}
                                id="phone_input"
                                name="phone_number"
                                onChange={value => formik.setFieldValue('phone_number', value)}
                                onBlur={() => formik.setFieldTouched('phone_number')}

                            />
                            {formik.touched.phone_number && formik.errors.phone_number && (
                                <p className={styles.error_text}>{formik.errors.phone_number}</p>
                            )}
                            {formik.touched.phone_number && formik.values.phone_number && (
                                formik.errors.phone_number ? (
                                    <img className={styles.error_img} src={errorIcon}/>
                                ) : (
                                    <img className={styles.error_img} src={correctIcon}/>
                                )
                            )}

                        </div>
                        <label htmlFor={'pass_input'} className={styles.reg_label_required}>Password</label>
                        <div className={styles.input_container}>
                            <input
                                id="pass_input"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                className={styles.reg_input}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <p className={styles.error_text}>{formik.errors.password}</p>
                            )}
                            {formik.touched.password && (
                                formik.errors.password ? (
                                    <img className={styles.error_img} src={errorIcon}/>
                                ) : (
                                    <img className={styles.error_img} src={correctIcon}/>
                                )
                            )}
                        </div>
                        <label htmlFor={'repass_input'} className={styles.reg_label_required}>Password again</label>
                        <div className={styles.input_container}>
                            <input
                                id="repass_input"
                                name="rePassword"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.rePassword}
                                className={styles.reg_input}
                            />
                            {formik.touched.rePassword && formik.errors.rePassword && (
                                <p className={styles.error_text}>{formik.errors.rePassword}</p>
                            )}
                            {formik.touched.rePassword && (
                                formik.errors.rePassword ? (
                                    <img className={styles.error_img} src={errorIcon}/>
                                ) : (
                                    <img className={styles.error_img} src={correctIcon}/>
                                )
                            )}

                        </div>

                        <label htmlFor={'language_input'} className={styles.reg_label}>Language</label>
                        <CustomSelect
                            defaultValue={selectedOption}
                            onChange={handleLanguageChange}
                            options={options}
                        />

                        <div className={styles.reg_footer}>
                            <Link to={'/main/login'}>
                             <div className={styles.reg_back}>
                                 <img  src={backBtn} alt={'back_button'}/>
                             </div>
                            </Link>
                            <button className={styles.reg_button} type={"submit"}>Continue</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default RegistrationPage