
import styles from './Profile.module.scss'
import MenuBurger from "../MenuBurger/MenuBurger.jsx";
import {useState} from "react";
import profileImg from "../../assets/Profile/profile_image.svg";
import errorIcon from "../../assets/LoginPage/Error_round.svg";
import correctIcon from "../../assets/LoginPage/Done_round.svg";
import {isPossiblePhoneNumber} from "react-phone-number-input";
import Input from 'react-phone-number-input/input'
import CustomSelect from "../../pages/LoginPage/CustomSelect.jsx";
import {useFormik} from "formik";
import {registrationFx} from "../../store/login_model.js";
import * as Yup from "yup";
import {Link} from "react-router-dom";
import backBtn from "../../assets/LoginPage/button_register_background.svg";

const validationSchema = Yup.object({
    name: Yup.string()
        .min(3, 'Name should be 3')
        .max(8, 'Name should be 8'),
        /*.required('Name is required'),*/
    email: Yup.string()
        .email('Invalid email format')
      /*  .required('Email is required')*/
        .matches(
            /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
            "Invalid email format"
        ),
    phone: Yup.string()
        .test('is-valid-phone', 'Invalid phone number', value =>
            value ? isPossiblePhoneNumber(value) : true
        ),
});
const Profile = () =>{
    const [selectedItem, setSelectedItem] = useState(0);

    const options = [
        { value: 'en', label: 'English' },
        { value: 'ru', label: 'Russian' },
        { value: 'kk', label: 'Kazakh' },
        { value: 'ua', label: 'Ukrainian' },
    ];
    const [selectedOption, setSelectedOption] = useState({ value: 'eng', label: 'English' });

    const handleLanguageChange = (option) => {
        setSelectedOption(option);
        formik.setFieldValue('language', option.value);
    };
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            language: selectedOption.value,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log(values);

        },
    });

    return(
            <div className={styles.profile__container}>
                <div className={styles.profile__header}>
                    <h2 className={styles.profile_header_title}>Profile</h2>
                    <ul className={styles.profile__header_list}>
                        <li className={selectedItem===0 ? styles.profile__list_item_selected : styles.profile__list_item}
                        onClick={()=>setSelectedItem(0)}>Information</li>
                        <li className={selectedItem===1 ? styles.profile__list_item_selected : styles.profile__list_item}
                            onClick={()=>setSelectedItem(1)}>Security</li>
                        <li className={selectedItem===2 ? styles.profile__list_item_selected : styles.profile__list_item}
                            onClick={()=>setSelectedItem(2)}>Subscriptions</li>
                    </ul>
                </div>
                {selectedItem === 0 && <div className={styles.profile__container_block}>
                    <div className={styles.block_image}>
                        <img src={profileImg}/>
                    </div>
                        <form className={styles.block_form} onSubmit={formik.handleSubmit}>
                            <div className={styles.input_container}>
                                <label htmlFor={'name_input'} className={styles.reg_label}>Name</label>

                                <input
                                    id="name_input"
                                    name="name"
                                    type="text"
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.name}
                                    className={styles.reg_input}
                                />
                                   {formik.touched.email && formik.errors.email && (
                                    <p className={styles.error_text}>{formik.errors.email}</p>
                                )}
                            </div>
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
                            </div>
                            <div className={styles.input_container}>
                                <label htmlFor={'phone_input'} className={styles.reg_label}>Phone number</label>
                                <Input
                                    className={styles.reg_input}
                                    id="phone_input"
                                    name="phone"
                                    onChange={value => formik.setFieldValue('phone', value)}
                                    onBlur={() => formik.setFieldTouched('phone')}

                                />
                                {formik.touched.phone && formik.errors.phone && (
                                    <p className={styles.error_text}>{formik.errors.phone}</p>
                                )}
                            </div>
                            <div className={styles.input_container}>
                            <label className={styles.reg_label}>Language</label>
                            <CustomSelect
                                defaultValue={selectedOption}
                                onChange={handleLanguageChange}
                                options={options}
                            />
                            </div>
                                <button className={styles.reg_button} type={"submit"} >Continue</button>
                        </form>
                </div>}

                {selectedItem === 1 && <div className={styles.profile__container_block}>
                    <form className={styles.block_form} onSubmit={formik.handleSubmit}>
                        <button className={styles.reg_button} type={"submit"} >Continue</button>
                    </form>
                </div>}

                {selectedItem === 2 &&
                    <div className={styles.profile__container_block}>
                        <form className={styles.block_form} onSubmit={formik.handleSubmit}>
                            <div className={styles.reg_footer}>
                                <button className={styles.footer_back}>Back</button>
                                <button className={styles.reg_button} type={"submit"} >Continue</button>
                            </div>
                        </form>
                    </div>}
            </div>
    )
}

export default Profile