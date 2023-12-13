import React, {useState} from 'react';
import styles from "./CloseButton.module.scss";
import closeImg from "../../assets/Account/close.svg";
import menuBackground from "../../assets/WalletsPage/menu-background.svg";
import Profile from "../Profile/Profile.jsx";
import {setOverAndAccModal} from "../../features/ui/uiSlice.js";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const CloseButton = () => {
    const dispatch = useDispatch();
    const accountModalVisible = useSelector((state) => state.ui.accountModalIsVisible)
    let navigate = useNavigate()
    const close = ()=>{
        if(accountModalVisible){
            dispatch(setOverAndAccModal(false, false))
        }
        else {
            navigate('/main')
        }
    }
    return (
            <div className={styles.menuBurger} onClick={close}>
                <div className={styles.menuBackground}>
                    <img  className={styles.burgerIcon} src={closeImg} alt={'close'}/>
                </div>
            </div>
    );
};

export default CloseButton;