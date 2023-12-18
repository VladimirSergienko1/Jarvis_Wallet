import React, {useEffect, useMemo, useState} from 'react';
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {createAccount, deleteAccount, editAccount} from "../../features/user/userSlice.js";
import {setAccountModalDataForEditing, setOverAndAccModal} from "../../features/ui/uiSlice.js";
import {useFormik} from "formik";
import styles from "./AccountingModal.module.scss";
import button_help from "../../assets/Account/button_help.svg";
import CustomSelect from "../../pages/LoginPage/CustomSelect.jsx";
import AccountIcons from "../AccountIcons/AccountIcons.jsx";

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
const AccountingModal = () => {
    const dispatch = useDispatch()
    const accountingIncomeModalIsVisible = useSelector((state) => state.ui.accountingIncomeModalIsVisible)
    const accountingOverlayIsVisible = useSelector((state) => state.ui.accountingOverlayIsVisible)
    const [isDeletionMode, setDeletionMode] = useState(false);
    const accountModalDataForEditing = useSelector((state) => state.ui.accountModalDataForEditing);
    //console.log('accountModalDataForEditing',accountModalDataForEditing)
    const { accountId } = useParams();
    const accounts = useSelector((state) => state.user.userAccounts);


    const accOptions = useMemo(() => {
        const uniqueNames = new Set(accounts.map(acc => acc.name));
        return Array.from(uniqueNames).map(name => ({
            value: name,
            label: name
        }));
    }, [accounts]);


    const [accOption1, setAccOption] = useState({ value: 'KZT', label: 'KZT' });
    const [activeIndex, setActiveIndex] = useState( 0);
    const handleGridItemClick = (index) => {
        setActiveIndex(index);
        console.log(index)
    };
    const handleCurrencyChange = (option) => {
        setAccOption(option);
        formik.setFieldValue('currency', option.value);
    };

    const handleDeleteAccount = (accountId)=>{
        console.log('accountId',accountId)
        dispatch(deleteAccount((accountId)))
        dispatch(setOverAndAccModal(false,false))
    }

    const handleOverlayClick = () =>{
        setDeletionMode(false)
        dispatch(setOverAndAccModal(false,false))
        dispatch(setAccountModalDataForEditing(null))
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            comment: '',
            value: '',
            currency: accOption1.value,
            ico_id: activeIndex
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            if (!accountModalDataForEditing){
                console.log(values);
                const accountData = {...values, ico_id: activeIndex}
                try {
                    dispatch(createAccount(accountData));
                } catch (error) {
                    console.error("Ошибка в создании кошелька:", error);
                }
            }
            else {
                try {
                    const accountData = {
                        account_id: accountModalDataForEditing.id,
                        ...values,
                        ico_id: activeIndex
                    };
                    dispatch(editAccount(accountData));
                } catch (error) {
                    console.error("Ошибка при редактировании аккаунта:", error);
                }
                console.log('accountModalDataForEditing', values);
            }


        },
    });
    useEffect(() => {
        formik.resetForm({
            values: {
                name: accountModalDataForEditing?.name || '',
                comment: accountModalDataForEditing?.comment || '',
                value: accountModalDataForEditing?.value || '',
                currency: accOption1.value, //FIXME
                ico_id: activeIndex
            }
        });
    }, [accountModalDataForEditing]);

    return(
        <>
            {accountingOverlayIsVisible && <div className={styles.overlay} onClick={handleOverlayClick}></div>}
            {accountingIncomeModalIsVisible &&
                <div className={styles.account__container}>
                    <div className={styles.account__header}>
                        <h2 className={styles.account_header_title}>{isDeletionMode ? 'Confirmation': accountModalDataForEditing ? 'Edit account'  : 'Add new income'}</h2>
                        <img className={styles.help_button} src={button_help}/>
                    </div>
                    {!isDeletionMode && <form className={styles.block_form} onSubmit={formik.handleSubmit}>
                        <div className={styles.input_group}>
                            <div className={styles.input_container} >
                                <label htmlFor={'acc_input'} className={styles.reg_label}>Account</label>
                                <CustomSelect
                                    onChange={handleCurrencyChange}
                                    options={accOptions}
                                    width={'280px'}
                                    placeholder={'Choose account'}
                                />
                            </div>
                            <div className={styles.input_container} >
                                <label htmlFor={'source_input'} className={styles.reg_label}>Source</label>
                                <CustomSelect
                                    onChange={handleCurrencyChange}
                                    options={accOptions}
                                    width={'280px'}
                                    placeholder={'Choose source'}
                                />
                            </div>
                        </div>
                        <div className={styles.input_group}>
                            <div className={styles.input_container}>
                                <label htmlFor={'amount_input'} className={styles.reg_label}>Amount</label>
                                <input
                                    id="amount_input"
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
                        </div>
                        <div className={styles.input_group}>
                            <div className={styles.input_container}>
                                <label htmlFor={'time_input'} className={styles.reg_label}>Time</label>
                                <input
                                    id="time_input"
                                    name="time"
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
                        </div>
                        <div className={styles.reg_footer}>
                            {accountModalDataForEditing &&  <button className={styles.del_button} type={"button"}  onClick={()=>setDeletionMode(true)}>Delete</button>}
                            <button className={styles.reg_button} type={"submit"}>Add</button>
                        </div>
                    </form>}

                    {isDeletionMode && <form className={styles.block_form} onSubmit={formik.handleSubmit}>
                        <div className={styles.block_form_content}>
                            <p className={styles.content_text}>Confirm the deletion operation</p>
                        </div>
                        <div className={styles.reg_footer}>
                            <button className={styles.cancel_button} type={"submit"} onClick={()=>setDeletionMode(false)}>Back</button>
                            <button className={styles.del_button} type={"button"} onClick={()=>handleDeleteAccount(accountId)}>Delete</button>
                        </div>
                    </form>}
                </div>}
        </>
    )
};

export default AccountingModal;