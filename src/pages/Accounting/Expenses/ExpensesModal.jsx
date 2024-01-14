import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    createExpense, createExpenseSource, deleteExpense, deleteExpenseSource,
    editExpense, editExpenseSource, editIncome, editIncomeSource,
    getAccountList, getExpenseSourceList,
    getIncomeSourceList
} from "../../../features/user/userSlice.js";
import {
    setDeletionMode, setExpenseDataForEditing, setExpenseSourceDataForEditing,
    setIncomeDataForEditing,
    setOverAndExpenseModal, setOverAndIncomeModal,
    setSourceDataForEditing
} from "../../../features/ui/uiSlice.js";
import {useFormik} from "formik";
import styles from "../AccountingModal.module.scss";
import button_help from "../../../assets/Account/button_help.svg";
import CustomSelect from "../../LoginPage/CustomSelect.jsx";
import AccountIcons from "../../../components/AccountIcons/AccountIcons.jsx";
import * as Yup from "yup";


const expenseValidationSchema = Yup.object({
    time_at : Yup.string()
        .max(256, 'Name should be less than 256 characters ')
        .required('Time is required'),
    amount: Yup.number()
        .positive('Value must be positive')
        .integer('Value must be an integer')
        .required('Amount is required'),
    comment: Yup.string()
        .required('comment is required')

});
const expenseSourceValidationSchema = Yup.object({
    name: Yup.string()
        .required('name is required')
});
const ExpensesModal = () => {
    const dispatch = useDispatch()
    const expenseModalIsVisible = useSelector((state) => state.ui.expenseModalIsVisible)
    const expenseOverlayIsVisible = useSelector((state) => state.ui.expenseOverlayIsVisible)
    const isDeletionMode = useSelector((state) => state.ui.isDeletionMode)
    const [activeIndex, setActiveIndex] = useState( 0);
    const expenseDataForEditing = useSelector((state) => state.ui.expenseDataForEditing);
    const expenseSourceDataForEditing = useSelector((state) => state.ui.expenseSourceDataForEditing);
    const accounts = useSelector((state) => state.user.userAccounts);
    const expenseSources = useSelector((state) => state.user.userExpenseSource);
    const expenseTab = useSelector((state) => state.ui.expenseTab);
    const expenseId = expenseDataForEditing?.id
    const expenseSourceId = expenseSourceDataForEditing?.id
    const [accountOptions, setAccountOptions] = useState([]);
    const [sourceOptions, setSourceOptions] = useState([]);

    useEffect(() => {
        dispatch(getAccountList())
        dispatch(getExpenseSourceList())
    }, []);


    const handleAccountChange = (selectedOption) => {
        formik.setFieldValue('account_id', selectedOption.value);
    };
    const handleGridItemClick = (index) => {
        setActiveIndex(index);
    };

    const handleSourceChange = (selectedOption) => {
        formik.setFieldValue('source_id', selectedOption.value);
    };
    const handleOverlayClick = ()=>{
        dispatch(setOverAndExpenseModal(false,false))
        dispatch(setExpenseDataForEditing(null))
        dispatch(setExpenseSourceDataForEditing(null))
        dispatch(setDeletionMode(false))
    }
    const handleDelete = (id)=>{
        if (expenseTab === 'expense') {
            dispatch(deleteExpense(id))
            dispatch(setOverAndExpenseModal(false,false))
            dispatch(setExpenseDataForEditing(null))
            dispatch(setDeletionMode(false))
        }
        if (expenseTab === 'source'){
            dispatch(deleteExpenseSource(id))
            dispatch(setOverAndExpenseModal(false,false))
            dispatch(setExpenseSourceDataForEditing(null))
            dispatch(setDeletionMode(false))
        }
    }

    const formik = useFormik({
        initialValues: {
            account_id: '',
            source_id: '',
            amount: '',
            comment:'',
            time_at: '',
        },
        validationSchema: expenseValidationSchema,
        onSubmit: async (values) => {
            if (!expenseDataForEditing){
                const expenseData = {...values}
                try {
                    dispatch(createExpense(expenseData));
                    dispatch(setDeletionMode(false))
                    dispatch(setOverAndExpenseModal(false,false))
                    formik.resetForm();
                } catch (error) {
                    console.error("Ошибка в создании Expense:", error);
                }
            }
            else {
                try {
                    const expenseData = {
                        expense_id: expenseDataForEditing.id,
                        ...values,
                    };
                    console.log('expenseData',expenseData)
                    dispatch(editExpense(expenseData));
                    dispatch(setOverAndExpenseModal(false,false))
                    formik.resetForm();
                } catch (error) {
                    console.error("Ошибка при редактировании Expense:", error);
                }
                console.log('expenseDataForEditing', values);
            }

        },
    });
    const expenseSourceFormik = useFormik({
        initialValues: {
            name: '',
            comment: '',
            ico_id: activeIndex,
        },
        validationSchema: expenseSourceValidationSchema,
        onSubmit: async (values) => {
            if (!expenseSourceDataForEditing){
                const expenseSourceData = {...values}
                try {
                    dispatch(createExpenseSource(expenseSourceData));
                    dispatch(setDeletionMode(false))
                    dispatch(setOverAndExpenseModal(false,false))
                    expenseSourceFormik.resetForm();
                } catch (error) {
                    console.error("Ошибка в создании Source:", error);
                }
            }
            else {
                try {
                    const sourceData = {
                        source_id: expenseSourceDataForEditing.id,
                        ...values,
                        ico_id: activeIndex
                    };
                    dispatch(editExpenseSource(sourceData));
                    dispatch(setOverAndExpenseModal(false,false))
                    expenseSourceFormik.resetForm();
                } catch (error) {
                    console.error("Ошибка при редактировании Source:", error);
                }
            }
        },
    });

    useEffect(() => {
        formik.resetForm({
            values: {
                account_id: accountOptions || '',
                source_id: sourceOptions || '',
                amount: expenseDataForEditing?.amount || '',
                comment: expenseDataForEditing?.comment,
                time_at: expenseDataForEditing?.time_at
            }
        });
    }, [expenseDataForEditing]);

    useEffect(() => {
        expenseSourceFormik.resetForm({
            values: {
                name: expenseSourceDataForEditing?.name,
                comment: expenseSourceDataForEditing?.comment,
                ico_id: setActiveIndex(expenseSourceDataForEditing?.ico_id),
            }
        });
    }, [expenseSourceDataForEditing]);

    useEffect(() => {
        if (expenseDataForEditing) {
            const editingAccountValue = accounts.find(acc => acc.id === expenseDataForEditing.account_id);
            const editingSourceValue = expenseSources.find(src => src.id === expenseDataForEditing.source_id);
            formik.setFieldValue('account_id', editingAccountValue ? editingAccountValue.id : '');
            formik.setFieldValue('source_id', editingSourceValue ? editingSourceValue.id : '');
        } else {
            setAccountOptions(accounts.map(acc => ({ value: acc.id, label: acc.name })));
            setSourceOptions(expenseSources.map(src => ({ value: src.id, label: src.name })));
        }
    }, [expenseDataForEditing, accounts, expenseSources,  formik.setFieldValue]);

    return(
        <>
            {expenseOverlayIsVisible && <div className={styles.overlay} onClick={handleOverlayClick}></div>}
            {expenseModalIsVisible &&
                <div className={styles.account__container}>
                    <div className={styles.account__header}>
                        <h2 className={styles.account_header_title}>{isDeletionMode ? 'Confirmation': (expenseDataForEditing || expenseSourceDataForEditing) ? `Edit  ${expenseTab === 'expense' ? 'expense' : 'expense source'}`  : `Add new  ${expenseTab === 'expense' ? 'expense' : 'expense source'}`}</h2>
                        <img className={styles.help_button} src={button_help}/>
                    </div>
                    {(!isDeletionMode && expenseTab === 'expense') && <form className={styles.block_form} onSubmit={formik.handleSubmit}>
                        <div className={styles.input_group}>
                            <div className={styles.input_container} >
                                <label htmlFor={'acc_input'} className={styles.reg_label}>Account</label>
                                <CustomSelect
                                    value={accountOptions.find(option => option.value === formik.values.account_id)}
                                    onChange={handleAccountChange}
                                    options={accountOptions}
                                    width={'280px'}
                                    placeholder={'Choose account'}
                                />
                            </div>
                            <div className={styles.input_container} >
                                <label htmlFor={'source_input'} className={styles.reg_label}>Source</label>
                                <CustomSelect
                                    value={sourceOptions.find(option => option.value === formik.values.source_id)}
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
                                <label htmlFor={'comment_input'} className={styles.reg_label_required}>Comment</label>
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
                                    type="datetime-local"
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
                            {expenseDataForEditing &&  <button className={styles.del_button} type={"button"}  onClick={()=>dispatch(setDeletionMode(true))}>Delete</button>}
                            <button className={styles.reg_button} type={"submit"}>{expenseDataForEditing ? 'Edit' : 'Add'}</button>
                        </div>
                    </form>}

                    {(!isDeletionMode && expenseTab === 'source') && <form className={styles.block_form} onSubmit={expenseSourceFormik.handleSubmit}>
                        <div className={styles.input_group}>
                            <div className={styles.input_container} >
                                <label htmlFor={'name_input'} className={styles.reg_label_required}>Name</label>
                                <input
                                    id="name_input"
                                    name="name"
                                    type="text"
                                    onChange={expenseSourceFormik.handleChange}
                                    onBlur={expenseSourceFormik.handleBlur}
                                    value={expenseSourceFormik.values.name}
                                    className={styles.reg_input}
                                />
                                {expenseSourceFormik.touched.name && expenseSourceFormik.errors.name && (
                                    <p className={styles.error_text}>{expenseSourceFormik.errors.name}</p>
                                )}
                            </div>
                            <div className={styles.input_container}>
                                <label htmlFor={'comment_input'} className={styles.reg_label}>Comment</label>
                                <input
                                    id="comment_input"
                                    name="comment"
                                    type="text"
                                    onChange={expenseSourceFormik.handleChange}
                                    onBlur={expenseSourceFormik.handleBlur}
                                    value={expenseSourceFormik.values.comment}
                                    className={styles.reg_input}
                                />
                                {expenseSourceFormik.touched.comment && formik.errors.comment && (
                                    <p className={styles.error_text}>{expenseSourceFormik.errors.comment}</p>
                                )}
                            </div>
                        </div>
                        <AccountIcons activeIndex={activeIndex} handleGridItemClick={handleGridItemClick}/>
                        <div className={styles.reg_footer}>
                            {expenseSourceDataForEditing &&  <button className={styles.del_button} type={"button"}  onClick={()=>dispatch(setDeletionMode(true))}>Delete</button>}
                            <button className={styles.reg_button} type={"submit"}>{expenseSourceDataForEditing ? 'Edit' : 'Add'}</button>
                        </div>
                    </form>}

                    {(isDeletionMode &&  expenseTab === 'expense') && <form className={styles.block_form} onSubmit={formik.handleSubmit}>
                        <div className={styles.block_form_content}>
                            <p className={styles.content_text}>Confirm the deletion operation</p>
                        </div>
                        <div className={styles.reg_footer}>
                            <button className={styles.cancel_button} type={"submit"} onClick={()=>dispatch(setDeletionMode(false))}>Back</button>
                            <button className={styles.del_button} type={"button"} onClick={()=>handleDelete(id)}>Delete</button>
                        </div>
                    </form>}

                    {(isDeletionMode &&  expenseTab === 'source') && <form className={styles.block_form} onSubmit={expenseSourceFormik.handleSubmit}>
                        <div className={styles.block_form_content}>
                            <p className={styles.content_text}>Confirm the deletion operation</p>
                        </div>
                        <div className={styles.reg_footer}>
                            <button className={styles.cancel_button} type={"submit"} onClick={()=>dispatch(setDeletionMode(false))}>Back</button>
                            <button className={styles.del_button} type={"button"} onClick={()=>handleDelete(sourceId)}>Delete</button>
                        </div>
                    </form>}
                </div>}
        </>
    )
};

export default ExpensesModal;