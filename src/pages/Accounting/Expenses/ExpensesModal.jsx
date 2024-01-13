import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    createIncome, createIncomeSource,
    deleteIncome,
    deleteIncomeSource, editIncome, editIncomeSource,
    getAccountList,
    getIncomeSourceList
} from "../../../features/user/userSlice.js";
import {
    setDeletionMode,
    setIncomeDataForEditing,
    setOverAndExpenseModal, setOverAndIncomeModal,
    setSourceDataForEditing
} from "../../../features/ui/uiSlice.js";
import {useFormik} from "formik";
import styles from "../Income/AccountingModal.module.scss";
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
const sourceValidationSchema = Yup.object({
    name: Yup.string()
        .required('name is required')
});
const ExpensesModal = () => {
    const dispatch = useDispatch()
    const expenseModalIsVisible = useSelector((state) => state.ui.expenseModalIsVisible)
    const expenseOverlayIsVisible = useSelector((state) => state.ui.expenseOverlayIsVisible)
    const isDeletionMode = useSelector((state) => state.ui.isDeletionMode)
    const [activeIndex, setActiveIndex] = useState( 0);
    const incomeDataForEditing = useSelector((state) => state.ui.incomeDataForEditing);
    const sourceDataForEditing = useSelector((state) => state.ui.sourceDataForEditing);
    const accounts = useSelector((state) => state.user.userAccounts);
    const sources = useSelector((state) => state.user.userIncomeSource);
    const expenseTab = useSelector((state) => state.ui.expenseTab);
    const incomeId = incomeDataForEditing?.id
    const sourceId = sourceDataForEditing?.id
    const [accountOptions, setAccountOptions] = useState([]);
    const [sourceOptions, setSourceOptions] = useState([]);

    useEffect(() => {
        dispatch(getAccountList())
        dispatch(getIncomeSourceList())
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
        //dispatch(setIncomeDataForEditing(null))
        //dispatch(setSourceDataForEditing(null))
        dispatch(setDeletionMode(false))
    }
    const handleDelete = (incomeId)=>{
        if (expenseTab === 'expense') {
            dispatch(deleteIncome(incomeId))
            dispatch(setOverAndExpenseModal(false,false))
            dispatch(setIncomeDataForEditing(null))
            dispatch(setDeletionMode(false))
        }
        if (expenseTab === 'source'){
            dispatch(deleteIncomeSource(incomeId))
            dispatch(setOverAndExpenseModal(false,false))
            dispatch(setSourceDataForEditing(null))
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
            if (!incomeDataForEditing){
                const incomeData = {...values}
                try {
                    dispatch(createIncome(incomeData));
                    dispatch(setDeletionMode(false))
                    dispatch(setOverAndExpenseModal(false,false))
                    formik.resetForm();
                } catch (error) {
                    console.error("Ошибка в создании Income:", error);
                }
            }
            else {
                try {
                    const incomeData = {
                        income_id: incomeDataForEditing.id,
                        ...values,
                    };
                    console.log('incomeData',incomeData)
                    dispatch(editIncome(incomeData));
                    dispatch(setOverAndExpenseModal(false,false))
                    formik.resetForm();
                } catch (error) {
                    console.error("Ошибка при редактировании Income:", error);
                }
                console.log('incomeDataForEditing', values);
            }

        },
    });
    const sourceFormik = useFormik({
        initialValues: {
            name: '',
            comment: '',
            ico_id: activeIndex,
        },
        validationSchema: sourceValidationSchema,
        onSubmit: async (values) => {
            if (!sourceDataForEditing){
                const sourceData = {...values}
                try {
                    dispatch(createIncomeSource(sourceData));
                    dispatch(setDeletionMode(false))
                    dispatch(setOverAndExpenseModal(false,false))
                    sourceFormik.resetForm();
                } catch (error) {
                    console.error("Ошибка в создании Source:", error);
                }
            }
            else {
                try {
                    const sourceData = {
                        source_id: sourceDataForEditing.id,
                        ...values,
                        ico_id: activeIndex
                    };
                    dispatch(editIncomeSource(sourceData));
                    dispatch(setOverAndExpenseModal(false,false))
                    sourceFormik.resetForm();
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
                amount: incomeDataForEditing?.amount || '',
                comment: incomeDataForEditing?.comment,
                time_at: incomeDataForEditing?.time_at
            }
        });
    }, [incomeDataForEditing]);

    useEffect(() => {
        sourceFormik.resetForm({
            values: {
                name: sourceDataForEditing?.name,
                comment: sourceDataForEditing?.comment,
                ico_id: setActiveIndex(sourceDataForEditing?.ico_id),
            }
        });
    }, [sourceDataForEditing]);

    useEffect(() => {
        if (incomeDataForEditing) {
            const editingAccountValue = accounts.find(acc => acc.id === incomeDataForEditing.account_id);
            const editingSourceValue = sources.find(src => src.id === incomeDataForEditing.source_id);
            formik.setFieldValue('account_id', editingAccountValue ? editingAccountValue.id : '');
            formik.setFieldValue('source_id', editingSourceValue ? editingSourceValue.id : '');
        } else {
            setAccountOptions(accounts.map(acc => ({ value: acc.id, label: acc.name })));
            setSourceOptions(sources.map(src => ({ value: src.id, label: src.name })));
        }
    }, [incomeDataForEditing, accounts, sources,  formik.setFieldValue]);

    return(
        <>
            {expenseOverlayIsVisible && <div className={styles.overlay} onClick={handleOverlayClick}></div>}
            {expenseModalIsVisible &&
                <div className={styles.account__container}>
                    <div className={styles.account__header}>
                        <h2 className={styles.account_header_title}>{isDeletionMode ? 'Confirmation': (incomeDataForEditing || sourceDataForEditing) ? `Edit  ${expenseTab === 'expense' ? 'expense' : 'expense source'}`  : `Add new  ${expenseTab === 'expense' ? 'expense' : 'expense source'}`}</h2>
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
                            {incomeDataForEditing &&  <button className={styles.del_button} type={"button"}  onClick={()=>dispatch(setDeletionMode(true))}>Delete</button>}
                            <button className={styles.reg_button} type={"submit"}>Add</button>
                        </div>
                    </form>}

                    {(!isDeletionMode && expenseTab === 'source') && <form className={styles.block_form} onSubmit={sourceFormik.handleSubmit}>
                        <div className={styles.input_group}>
                            <div className={styles.input_container} >
                                <label htmlFor={'name_input'} className={styles.reg_label_required}>Name</label>
                                <input
                                    id="name_input"
                                    name="name"
                                    type="text"
                                    onChange={sourceFormik.handleChange}
                                    onBlur={sourceFormik.handleBlur}
                                    value={sourceFormik.values.name}
                                    className={styles.reg_input}
                                />
                                {sourceFormik.touched.name && sourceFormik.errors.name && (
                                    <p className={styles.error_text}>{sourceFormik.errors.name}</p>
                                )}
                            </div>
                            <div className={styles.input_container}>
                                <label htmlFor={'comment_input'} className={styles.reg_label}>Comment</label>
                                <input
                                    id="comment_input"
                                    name="comment"
                                    type="text"
                                    onChange={sourceFormik.handleChange}
                                    onBlur={sourceFormik.handleBlur}
                                    value={sourceFormik.values.comment}
                                    className={styles.reg_input}
                                />
                                {sourceFormik.touched.comment && formik.errors.comment && (
                                    <p className={styles.error_text}>{sourceFormik.errors.comment}</p>
                                )}
                            </div>
                        </div>
                        <AccountIcons activeIndex={activeIndex} handleGridItemClick={handleGridItemClick}/>
                        <div className={styles.reg_footer}>
                            {sourceDataForEditing &&  <button className={styles.del_button} type={"button"}  onClick={()=>dispatch(setDeletionMode(true))}>Delete</button>}
                            <button className={styles.reg_button} type={"submit"}>Add</button>
                        </div>
                    </form>}

                    {(isDeletionMode &&  expenseTab === 'expense') && <form className={styles.block_form} onSubmit={formik.handleSubmit}>
                        <div className={styles.block_form_content}>
                            <p className={styles.content_text}>Confirm the deletion operation</p>
                        </div>
                        <div className={styles.reg_footer}>
                            <button className={styles.cancel_button} type={"submit"} onClick={()=>dispatch(setDeletionMode(false))}>Back</button>
                            <button className={styles.del_button} type={"button"} onClick={()=>handleDelete(incomeId)}>Delete</button>
                        </div>
                    </form>}

                    {(isDeletionMode &&  expenseTab === 'source') && <form className={styles.block_form} onSubmit={sourceFormik.handleSubmit}>
                        <div className={styles.block_form_content}>
                            <p className={styles.content_text}>Confirm the deletion operation</p>
                        </div>
                        <div className={styles.reg_footer}>
                            <button className={styles.cancel_button} type={"submit"} onClick={()=>setIncomeDeletionMode(false)}>Back</button>
                            <button className={styles.del_button} type={"button"} onClick={()=>handleDelete(sourceId)}>Delete</button>
                        </div>
                    </form>}
                </div>}
        </>
    )
};

export default ExpensesModal;