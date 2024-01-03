import React, {useEffect, useMemo, useState} from 'react';
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {createIncome, deleteAccount, editAccount} from "../../features/user/userSlice.js";
import {setAccountModalDataForEditing, setOverAndAccModal, setOverAndIncomeModal} from "../../features/ui/uiSlice.js";
import {useFormik} from "formik";
import styles from "./AccountingModal.module.scss";
import button_help from "../../assets/Account/button_help.svg";
import CustomSelect from "../../pages/LoginPage/CustomSelect.jsx";

const validationSchema = Yup.object({
    time_at : Yup.string()
        .max(256, 'Name should be less than 256 characters ')
        .required('Time is required'),
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
    amount: Yup.number()
        .positive('Value must be positive')
        .integer('Value must be an integer')
        .required('Amount is required'),

});
const AccountingModal = () => {
    const dispatch = useDispatch()
    const accountingIncomeModalIsVisible = useSelector((state) => state.ui.accountingIncomeModalIsVisible)
    const accountingOverlayIsVisible = useSelector((state) => state.ui.accountingOverlayIsVisible)
    const [isDeletionMode, setDeletionMode] = useState(false);
    const accountModalDataForEditing = useSelector((state) => state.ui.accountModalDataForEditing);
    const { accountId } = useParams();
    const accounts = useSelector((state) => state.user.userAccounts);
    const sources = useSelector((state) => state.user.userIncomeSource);
    console.log('sources',sources)

    const accountOptions = useMemo(() => {
        return accounts.map(acc => ({
            value: acc.id, // Использовать id для значения
            label: acc.name // Имя для отображения
        }));
    }, [accounts]);

    const sourceOptions = useMemo(() => {
        return sources.map(source => ({
            value: source.id, // Использовать id для значения
            label: source.name // Имя для отображения
        }));
    }, [sources]);

    const handleAccountChange = (selectedOption) => {
        formik.setFieldValue('account_id', selectedOption.value);
    };

    const handleSourceChange = (selectedOption) => {
        formik.setFieldValue('source_id', selectedOption.value);
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
            account_id: '',
            source_id: '',
            amount: '',
            comment:'',
            time_at: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            //if (!accountModalDataForEditing){
                console.log('IncomeTest',values)
                const incomeData = {...values}
                try {
                    dispatch(createIncome(incomeData));
                    setDeletionMode(false)
                    dispatch(setOverAndIncomeModal(false,false))
                } catch (error) {
                    console.error("Ошибка в создании Income:", error);
                }
          //  }
          //  else {
                try {
                    const incomeData = {
                        account_id: accountModalDataForEditing.id,
                        ...values,
                    };
                    dispatch(editAccount(incomeData));
                } catch (error) {
                    console.error("Ошибка при редактировании Income:", error);
                }
                console.log('accountModalDataForEditing', values);
          //  }


        },
    });
   /* useEffect(() => {
        formik.resetForm({
            values: {
                name: accountModalDataForEditing?.name || '',
                comment: accountModalDataForEditing?.comment || '',
                value: accountModalDataForEditing?.value || '',
                currency: accOptions.value, //FIXME
                ico_id: activeIndex
            }
        });
    }, [accountModalDataForEditing]);*/

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
                                    onChange={handleAccountChange}
                                    options={accountOptions}
                                    width={'280px'}
                                    placeholder={'Choose account'}
                                />
                            </div>
                            <div className={styles.input_container} >
                                <label htmlFor={'source_input'} className={styles.reg_label}>Source</label>
                                <CustomSelect
                                    onChange={handleSourceChange}
                                    options={sourceOptions}
                                    width={'280px'}
                                    placeholder={'Choose source'}
                                />
                            </div>
                        </div>
                        <div className={styles.input_group}>
                            <div className={styles.input_container}>
                                <label htmlFor={'amount_input'} className={styles.reg_label_required}>Amount</label>
                                <input
                                    id="amount_input"
                                    name="amount"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.amount}
                                    className={styles.reg_input}
                                />
                                {formik.touched.amount && formik.errors.amount && (
                                    <p className={styles.error_text}>{formik.errors.amount}</p>
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
                                <label htmlFor={'time_input'} className={styles.reg_label_required}>Time</label>
                                <input
                                    id="time_input"
                                    name="time_at"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.time_at}
                                    className={styles.reg_input}
                                />
                                {formik.touched.time_at && formik.errors.time_at && (
                                    <p className={styles.error_text}>{formik.errors.time_at}</p>
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