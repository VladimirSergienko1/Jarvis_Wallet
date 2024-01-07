import styles from './Profile.module.scss'
import React, {useEffect, useMemo, useState} from "react";
import profileImg from "../../assets/Profile/profile_image.svg";
import errorIcon from "../../assets/LoginPage/Error_round.svg";
import correctIcon from "../../assets/LoginPage/Done_round.svg";
import {isPossiblePhoneNumber} from "react-phone-number-input";
import Input from 'react-phone-number-input/input'
import CustomSelect from "../../pages/LoginPage/CustomSelect.jsx";
import {useFormik} from "formik";
import * as Yup from "yup";
import gridImg from "../../assets/Profile/grid_image.svg";
import {useDispatch, useSelector} from "react-redux";
import SubscriptionBlock from "./SubscriptionBlock.jsx";
import {use} from "i18next";


const options = [
    { value: 'en', label: 'English' },
    { value: 'ru', label: 'Russian' },
    { value: 'kk', label: 'Kazakh' },
    { value: 'ua', label: 'Ukrainian' },
];

const validationSchemaInfo = Yup.object({
    name: Yup.string()
        .min(3, 'Name should be 3 characters or more')
        .max(8, 'Name should be 8 characters or less'),
    email: Yup.string()
        .email('Invalid email format')
        .matches(
            /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
            "Invalid email format"
        ),
    phone: Yup.string()
        .test('is-valid-phone', 'Invalid phone number', value =>
            value ? isPossiblePhoneNumber(value) : true
        ),
});

const validationSchemaSecurity = Yup.object({
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    rePassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Password confirmation is required'),
});

const validationSchemas = {
    0: validationSchemaInfo,
    1: validationSchemaSecurity,
};
const Profile = (props) =>{
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.login.isLoading);
    const userInfo = useSelector(userStore=>userStore.user.userData)
    console.log('profile',userInfo)

    const [selectedItem, setSelectedItem] = useState(0);

    const [isAvatarOpen, setAvatarOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const [selectedOption, setSelectedOption] = useState({ value: 'en', label: 'English' });
    const [isOverlayVisible, setIsOverlayVisible] = useState(true);

    const [openProfile, setOpenProfile] = useState(false)

    const currentValidationSchema = useMemo(() => {
        return validationSchemas[selectedItem] || validationSchemas[0];
    }, [selectedItem]);


    const handleLanguageChange = (option) => {
        setSelectedOption(option);
        formik.setFieldValue('language', option.value);
    };

    const handleGridItemClick = (index) => {
        setActiveIndex(index);
        console.log(index)
    };

    const handleAvatarMenu = () =>{
        setAvatarOpen(!isAvatarOpen);
    }
    const handleDeleteModal = () =>{
        setDeleteModalOpen(!isDeleteModalOpen);
    }

    const handleOverlay = () =>{
        setIsOverlayVisible(false)
        props.toggleProfile();
    }

    useEffect(() => { //FIXME for dynamic value change in edit
        if (userInfo) {
            const currentOption = options.find(option => option.value === userInfo.language);
            if (currentOption) {
                setSelectedOption(currentOption);
            }
        }
    }, [userInfo]);

    const formik = useFormik({
        initialValues: {
            name: userInfo?.name || '',
            email: userInfo?.email || '',
            phone: userInfo?.phone_number || '',
            language: userInfo?.language || selectedOption.value,
            password: userInfo?.password ||'',
            rePassword: '',
        },
        validationSchema: currentValidationSchema,
        onSubmit: async (values) => {
            console.log(values);

        },
    });

    return(
        <>
            {isLoading && <div>Загрузка...</div>}
            {isOverlayVisible && <div className={styles.overlay} onClick={handleOverlay}></div>}
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
                {(!isAvatarOpen && selectedItem === 0) && <div className={styles.profile__container_block}>
                    <div className={styles.block_image} onClick={handleAvatarMenu}>
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
                                   {formik.touched.name && formik.errors.name && (
                                    <p className={styles.error_text}>{formik.errors.name}</p>
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
                                    value={formik.values.phone}
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
                                value={selectedOption}
                                onChange={handleLanguageChange}
                                options={options}
                            />
                            </div>
                                <button className={styles.reg_button} type={"submit"}>Save</button>
                        </form>
                </div>}

                {/*Change Password BLOCK*/}
                {(!isDeleteModalOpen && selectedItem === 1) && <div className={styles.change_password_container_block}>
                    <form className={styles.block_form} onSubmit={formik.handleSubmit}>
                        <div className={styles.form_content}>
                            <div className={styles.block_form_title}>Change password</div>
                            <div className={styles.input_container}>
                                <label htmlFor={'email_input'} className={styles.reg_label}>Current</label>
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
                            </div>
                            <div className={styles.input_container}>
                                <label htmlFor={'email_input'} className={styles.reg_label}>New</label>
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
                            </div>
                        </div>
                        <div className={styles.reg_footer}>
                            <button className={styles.footer_back} type="button" onClick={()=>handleDeleteModal()}>Delete account</button>
                            <button className={styles.footer_button_save} type={"submit"}>Save</button>
                        </div>
                    </form>
                </div>}

                {/*DELETE ACC BLOCK*/}
                {(selectedItem === 1 && isDeleteModalOpen) &&
                    <div className={styles.change_password_container_block}>
                    <form className={styles.block_form} onSubmit={formik.handleSubmit}>
                        <div className={styles.form_content}>
                            <div className={styles.block_deletion_title}>After deleting your account, all your data including your account will disappear.</div>
                            <div className={styles.input_container}>
                                <label htmlFor={'email_input'} className={styles.reg_label}>Password</label>
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
                            </div>
                        </div>
                        <div className={styles.reg_footer}>
                            <button className={styles.avatar_back} type="button" onClick={()=>handleDeleteModal()}>Back</button>
                            <button className={styles.footer_back} type={"submit"}>Delete account</button>
                        </div>
                    </form>
                </div>}

                {/*AVATAR BLOCK OPENS WHEN PROFILE ICON CLICKED*/}
                {isAvatarOpen && selectedItem === 0 &&
                     <div className={styles.profile__container_block}>
                        <div className={styles.block_image} onClick={handleAvatarMenu}>
                            <img src={profileImg}/>
                        </div>
                        <form className={styles.avatar_form} onSubmit={formik.handleSubmit}>
                            <div className={styles.avatar_block_title}>Choose an avatar</div>
                            <div className={styles.avatar_grid}>
                                {Array(16).fill(null).map((_, index) => (
                                    <div
                                        key={index}
                                        className={`${styles.grid_item} ${index === activeIndex ? styles.active : ''}`}
                                        onClick={() => handleGridItemClick(index)}
                                    >
                                        <img src={gridImg} alt={`grid-item-${index}`} />
                                    </div>
                                ))}
                            </div>
                            <div className={styles.avatar_footer}>
                                <button className={styles.avatar_back} onClick={handleAvatarMenu} type="button">Back</button>
                                <button className={styles.avatar_button} type={"submit"}>Continue</button>
                            </div>
                        </form>
                    </div>}

                  {selectedItem === 2  && <SubscriptionBlock/>}
            </div>
        </>
    )
}

export default React.memo(Profile)