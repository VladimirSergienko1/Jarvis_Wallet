import styles from './RegistrationPage.module.scss'
import info from "../../assets/LoginPage/Info.svg";
import backBtn from "../../assets/LoginPage/button_register_background.svg";
import requiredIcon from "../../assets/LoginPage/required.svg";
import errorIcon from "../../assets/LoginPage/Error_round.svg";
import correctIcon from "../../assets/LoginPage/Done_round.svg";
import CustomSelect from "./CustomSelect.jsx";
import {useState} from "react";
import {Link} from "react-router-dom";

import { useFormik } from 'formik';
import * as Yup from 'yup';

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
    phone: Yup.string(),
    password: Yup.string(),
    rePassword: Yup.string(),

});
const RegistrationPage = () =>{
    const options = [
        { value: 'eng', label: 'English' },
        { value: 'ru', label: 'Russian' },
        { value: 'kz', label: 'Kazakh' },
    ];
    const [selectedOption, setSelectedOption] = useState({ value: 'eng', label: 'English' });
    const [emailIcon, setEmailIcon] = useState();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            password: '',
            rePassword: ''
            // Другие поля
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            // Обработка отправки формы
        },
    });

    return(
        <div className={styles.registration_page}>
            <div className={styles.registration_page__container}>
                <img src={info} alt="Info"/>
                <div className={styles.reg_block}>
                    <form className={styles.reg_form} onSubmit={formik.handleSubmit}>
                        <p className={styles.reg_title}>New user</p>
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
                            <img className={styles.error_img} src={emailIcon}/>

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
                            <img className={styles.error_img} src={emailIcon}/>

                        </div>
                        <label htmlFor={'phone_input'} className={styles.reg_label}>Phone number</label>
                        <div className={styles.input_container}>
                            <input id={'phone_input'}
                                   className={styles.reg_input}
                                   name={'Phone'}
                            />
                            <img className={styles.error_img} src={correctIcon}/>

                        </div>
                        <label htmlFor={'pass_input'} className={styles.reg_label_required}>Password</label>
                        <div className={styles.input_container}>
                            <input id={'pass_input'} className={styles.reg_input} />
                            <p className={styles.error_text}>Error</p>
                            <img className={styles.error_img} src={errorIcon}/>
                        </div>
                        <label htmlFor={'repass_input'} className={styles.reg_label_required}>Password again</label>
                        <div className={styles.input_container}>
                            <input id={'repass_input'} className={styles.reg_input} />
                            <p className={styles.error_text}>Error</p>
                            <img className={styles.error_img} src={correctIcon}/>

                        </div>

                        <label htmlFor={'language_input'} className={styles.reg_label}>Language</label>
                        <CustomSelect
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={options}
                        />

                        <div className={styles.reg_footer}>
                            <Link to={'/login'}>
                             <div className={styles.reg_back}>
                                 <img  src={backBtn} alt={'back_button'}/>
                             </div>
                            </Link>

                            <button className={styles.reg_button} type={"submit"} >Continue</button>
                        </div>
                    </form>

                </div>

            </div>

        </div>
    )

}

export default RegistrationPage