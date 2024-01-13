import React, {useState} from 'react';
import styles from "./CloseButton.module.scss";
import closeImg from "../../assets/Account/close.svg";
import closeImgDark from "../../assets/Account/close-dark.svg";
import {
    setAccountModalDataForEditing, setDeletionMode,
    setIncomeDataForEditing,
    setOverAndAccModal,
    setOverAndIncomeModal, setSourceDataForEditing
} from "../../features/ui/uiSlice.js";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const CloseButton = () => {
    const dispatch = useDispatch();
    const accountModalVisible = useSelector((state) => state.ui.accountModalIsVisible)
    const incomeModalVisible = useSelector((state) => state.ui.incomeModalIsVisible)
    const theme = useSelector((state)=> state.user.userTheme)

    let navigate = useNavigate()
    const close = ()=>{
        if (accountModalVisible){
            dispatch(setOverAndAccModal(false, false))
            dispatch(setAccountModalDataForEditing(null))
            dispatch(setDeletionMode(false))
        }
        else if (incomeModalVisible){
            dispatch(setOverAndIncomeModal(false, false));
            dispatch(setIncomeDataForEditing(null))
            dispatch(setSourceDataForEditing(null))
            dispatch(setDeletionMode(false))
        }
        else {
            navigate('/main')
        }
    }
    return (
            <div className={styles.menuBurger} onClick={close}>
                <div className={styles.menuBackground}>
                    <img  className={styles.burgerIcon} src={theme === 'light' ? closeImg : closeImgDark} alt={'close'}/>
                </div>
            </div>
    );
};

export default CloseButton;