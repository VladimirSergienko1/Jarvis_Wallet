import React, {useState} from 'react';
import styles from "./CloseButton.module.scss";
import closeImg from "../../assets/Account/close.svg";
import closeImgDark from "../../assets/Account/close-dark.svg";
import {setAccountModalDataForEditing, setOverAndAccModal, setOverAndIncomeModal} from "../../features/ui/uiSlice.js";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import menuBackground from "../../assets/WalletsPage/menu-background.svg";
import menuBackgroundDark from "../../assets/WalletsPage/menu-background-dark.svg";

const CloseButton = () => {
    const dispatch = useDispatch();
    const accountModalVisible = useSelector((state) => state.ui.accountModalIsVisible)
    const accountingIncomeModalVisible = useSelector((state) => state.ui.accountingIncomeModalIsVisible)
    const theme = useSelector((state)=> state.user.userTheme)

    let navigate = useNavigate()
    const close = ()=>{
        if(accountModalVisible){
            dispatch(setOverAndAccModal(false, false))
            dispatch(setAccountModalDataForEditing(null))
        }
        if(accountingIncomeModalVisible){
            dispatch(setOverAndIncomeModal(false, false));
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