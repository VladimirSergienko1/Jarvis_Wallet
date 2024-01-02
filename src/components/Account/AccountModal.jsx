import styles from "../Account/Account.module.scss";
import React, {useEffect, useState} from "react";
import CustomSelect from "../../pages/LoginPage/CustomSelect.jsx";
import AccountIcons from "../AccountIcons/AccountIcons.jsx";
import button_help from "../../assets/Account/button_help.svg"
import * as Yup from "yup";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {createAccount, deleteAccount, editAccount} from "../../features/user/userSlice.js";
import CloseButton from "../CloseButton/CloseButton.jsx";
import {setAccountModalDataForEditing, setOverAndAccModal, setOverAndIncomeModal} from "../../features/ui/uiSlice.js";
import {useNavigate, useParams} from "react-router-dom";


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
    value: Yup.number()
        .positive('Value must be positive')
        .integer('Value must be an integer')
        .required('Start balance is required'),

});
const AccountModal = ()=>{
    const dispatch = useDispatch()
    const accountModalIsVisible = useSelector((state) => state.ui.accountModalIsVisible)
    const overlayIsVisible = useSelector((state) => state.ui.overlayIsVisible)
    const [isDeletionMode, setDeletionMode] = useState(false);
    const navigate = useNavigate();
    const accountModalDataForEditing = useSelector((state) => state.ui.accountModalDataForEditing);
    //console.log('accountModalDataForEditing',accountModalDataForEditing)
    const { accountId } = useParams();

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

    const handleDeleteAccount = (accountId)=>{
        console.log('accountId',accountId)
        dispatch(deleteAccount((accountId)))
        dispatch(setOverAndAccModal(false,false))
        navigate('/main');
        setDeletionMode(false)
    }

    const handleOverlayClick = () =>{
        setDeletionMode(false)
        dispatch(setOverAndAccModal(false,false))
        dispatch(setOverAndIncomeModal(false,false))
        dispatch(setAccountModalDataForEditing(null))
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            comment: '',
            value: '',
            currency: selectedOption.value,
            ico_id: activeIndex
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            if (!accountModalDataForEditing){
                const accountData = {...values, ico_id: activeIndex}
                try {
                    dispatch(createAccount(accountData));
                    dispatch(setOverAndAccModal(false,false))
                    formik.resetForm();
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
                    dispatch(setOverAndAccModal(false,false))
                    formik.resetForm();
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
                ico_id:  setActiveIndex(accountModalDataForEditing?.ico_id)
            }
        });
    }, [accountModalDataForEditing]);

    useEffect(() => { //FIXME for dynamic value change in edit
        if (accountModalDataForEditing) {
            const currentOption = options.find(option => option.value === accountModalDataForEditing.currency);
            if (currentOption) {
                setSelectedOption(currentOption);
            }
        }
    }, [accountModalDataForEditing]);


    return(
    <>
        {overlayIsVisible && <div className={styles.overlay} onClick={handleOverlayClick}></div>}
        {accountModalIsVisible &&
            <div className={styles.account__container}>
            <div className={styles.account__header}>
                <h2 className={styles.account_header_title}>{isDeletionMode ? 'Confirmation': accountModalDataForEditing ? 'Edit account'  : 'Add new account'}</h2>
                <img className={styles.help_button} src={button_help}/>
            </div>
                {!isDeletionMode && <form className={styles.block_form} onSubmit={formik.handleSubmit}>
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
                            id="balance_input"
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
                            value={selectedOption}
                            onChange={handleCurrencyChange}
                            options={options}
                            width={'280px'}
                        />
                    </div>
                </div>
                <AccountIcons activeIndex={activeIndex} handleGridItemClick={handleGridItemClick}/>
                <div className={styles.reg_footer}>
                    {accountModalDataForEditing &&  <button className={styles.del_button} type={"button"}  onClick={()=>setDeletionMode(true)}>Delete</button>}
                    <button className={styles.reg_button} type={"submit"}>Continue</button>
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
}
export default AccountModal