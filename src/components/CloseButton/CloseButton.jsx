import React, {useState} from 'react';
import styles from "./CloseButton.module.scss";
import closeImg from "../../assets/Account/close.svg";
import menuBackground from "../../assets/WalletsPage/menu-background.svg";
import Profile from "../Profile/Profile.jsx";
import {setOverAndAccModal} from "../../features/ui/uiSlice.js";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

const CloseButton = () => {
    const dispatch = useDispatch();

    let navigate = useNavigate()
    const goBack = ()=>{
        dispatch(setOverAndAccModal(false, false))
        navigate('/main')
    }
    return (
            <div className={styles.menuBurger} onClick={goBack}>
                <div className={styles.menuBackground}>
                    <img  className={styles.burgerIcon} src={closeImg} alt={'close'}/>
                </div>
            </div>
    );
};

export default CloseButton;