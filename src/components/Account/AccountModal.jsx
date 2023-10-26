import styles from "../Account/Account.module.scss";
import React, {useState} from "react";
import CustomSelect from "../../pages/LoginPage/CustomSelect.jsx";
import AccountIcons from "../AccountIcons/AccountIcons.jsx";
import button_help from "../../assets/Account/button_help.svg"

const AccountModal = ({accountModalVisible, isOverlayVisible, handleOverlay})=>{
    const options = [
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' },
        { value: 'KZT', label: 'KZT' },
        { value: 'UAH', label: 'UAH' },
        { value: 'RUB', label: 'RUB' },
    ];
    const [selectedOption, setSelectedOption] = useState({ value: 'KZT', label: 'KZT' });
    const handleCurrencyChange = (option) => {
        setSelectedOption(option);
        formik.setFieldValue('language', option.value);
    };


return(
    <>
        {isOverlayVisible && <div className={styles.overlay} onClick={handleOverlay}></div>}
        {accountModalVisible &&  <div className={styles.account__container}>
            <div className={styles.account__header}>
                <h2 className={styles.account_header_title}>Add new account</h2>
                <img className={styles.help_button} src={button_help}/>
            </div>
            <form className={styles.block_form} /*onSubmit={formik.handleSubmit}*/>
                <div className={styles.input_group}>
                    <div className={styles.input_container}>
                        <label htmlFor={'name_input'} className={styles.reg_label_required}>Name</label>
                        <input
                            id="name_input"
                            name="name"
                            type="text"
                            /*    onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}*/
                            className={styles.reg_input}
                        />
                        {/*{formik.touched.name && formik.errors.name && (
                        <p className={styles.error_text}>{formik.errors.name}</p>
                    )}*/}
                    </div>
                    <div className={styles.input_container}>
                        <label htmlFor={'email_input'} className={styles.reg_label_required}>Start balance</label>
                        <input
                            id="email_input"
                            name="email"
                            type="email"
                            /* onChange={formik.handleChange}
                             onBlur={formik.handleBlur}
                             value={formik.values.email}*/
                            className={styles.reg_input}
                        />
                        {/*  {formik.touched.email && formik.errors.email && (
                        <p className={styles.error_text}>{formik.errors.email}</p>
                    )}*/}
                    </div>
                </div>
                <div className={styles.input_group}>
                    <div className={styles.input_container}>
                        <label htmlFor={'name_input'} className={styles.reg_label}>Comment</label>
                        <input
                            id="name_input"
                            name="name"
                            type="text"
                            /*    onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}*/
                            className={styles.reg_input}
                        />
                        {/*{formik.touched.name && formik.errors.name && (
                        <p className={styles.error_text}>{formik.errors.name}</p>
                    )}*/}
                    </div>
                    <div className={styles.input_container} >
                        <label htmlFor={'language_input'} className={styles.reg_label}>Language</label>
                        <CustomSelect
                            defaultValue={selectedOption}
                            onChange={handleCurrencyChange}
                            options={options}
                            width={'280px'}
                        />
                        </div>
                     </div>
                <AccountIcons/>
                    <button className={styles.reg_button} type={"submit"}>Continue</button>
            </form>
        </div>}
    </>
)
}
export default AccountModal