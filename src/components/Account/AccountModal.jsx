import styles from "../Account/Account.module.scss";
import React, {useState} from "react";
import CustomSelect from "../../pages/LoginPage/CustomSelect.jsx";
import AccountIcons from "../AccountIcons/AccountIcons.jsx";
import button_help from "../../assets/Account/button_help.svg"
import * as Yup from "yup";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {createAccount} from "../../features/user/userSlice.js";
import CloseButton from "../CloseButton/CloseButton.jsx";


const validationSchema = Yup.object({
    name: Yup.string()
        .max(256, 'Name should be less than 256 characters ')
        .required('Name is required'),
  /*  comment: Yup.string()
        .email('Invalid email format')
        .matches(
            /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
            "Invalid email format"
        ),*/
/*    currency: Yup.string()
        .test('is-valid-phone', 'Invalid phone number', value =>
            value ? isPossiblePhoneNumber(value) : true
        ),*/
    value: Yup.number()
        .positive('Value must be positive')
        .integer('Value must be an integer')
        .required('Start balance is required'),

});
const AccountModal = ({accountModalVisible, isOverlayVisible, handleOverlay})=>{
    const dispatch = useDispatch()
    const options = [
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' },
        { value: 'KZT', label: 'KZT' },
        { value: 'UAH', label: 'UAH' },
        { value: 'RUB', label: 'RUB' },
    ];
    const [selectedOption, setSelectedOption] = useState({ value: 'KZT', label: 'KZT' });
    const [activeIndex, setActiveIndex] = useState( 0);
    const handleGridItemClick = (index) => {
        setActiveIndex(index);
        console.log(index)
    };
    const handleCurrencyChange = (option) => {
        setSelectedOption(option);
        formik.setFieldValue('currency', option.value);
    };

    const formik = useFormik({
        initialValues: {
            name:   '',
            comment:  '',
            value:  '',
            currency: selectedOption.value,
            ico_id: activeIndex
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log(values);
            const accountData = {...values, ico_id: activeIndex}
            try {
                dispatch(createAccount(accountData));
            } catch (error) {
                console.error("Ошибка в создании кошелька:", error);
            }
        },
    });

return(
    <>
        {isOverlayVisible && <div className={styles.overlay} onClick={handleOverlay}></div>}
        {accountModalVisible &&
            <div className={styles.account__container}>
            <div className={styles.account__header}>
                <h2 className={styles.account_header_title}>Add new account</h2>
                <img className={styles.help_button} src={button_help}/>
            </div>
            <form className={styles.block_form} onSubmit={formik.handleSubmit}>
                <div className={styles.input_group}>
                    <div className={styles.input_container}>
                        <label htmlFor={'name_input'} className={styles.reg_label_required}>Name</label>
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
                        <label htmlFor={'balance_input'} className={styles.reg_label_required}>Start balance</label>
                        <input
                            id="balancel_input"
                            name="value"
                            type="number"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.value}
                            className={styles.reg_input}
                        />
                        {formik.touched.value && formik.errors.value && (
                            <p className={styles.error_text}>{formik.errors.value}</p>
                        )}
                    </div>
                </div>
                <div className={styles.input_group}>
                    <div className={styles.input_container}>
                        <label htmlFor={'comment_input'} className={styles.reg_label}>Comment</label>
                        <input
                            id="comment_input"
                            name="comment"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.comment}
                            className={styles.reg_input}
                        />
                        {formik.touched.comment && formik.errors.comment && (
                            <p className={styles.error_text}>{formik.errors.comment}</p>
                        )}
                    </div>
                    <div className={styles.input_container} >
                        <label htmlFor={'language_input'} className={styles.reg_label}>Currency</label>
                        <CustomSelect
                            defaultValue={selectedOption}
                            onChange={handleCurrencyChange}
                            options={options}
                            width={'280px'}
                        />
                        </div>
                     </div>
                <AccountIcons activeIndex={activeIndex} handleGridItemClick={handleGridItemClick}/>
                    <button className={styles.reg_button} type={"submit"}>Continue</button>
            </form>
        </div>}
    </>
)
}
export default AccountModal