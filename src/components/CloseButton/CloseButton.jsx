import React, {useState} from 'react';
import styles from "./CloseButton.module.scss";
import closeImg from "../../assets/Account/close.svg";
import menuBackground from "../../assets/WalletsPage/menu-background.svg";
import Profile from "../Profile/Profile.jsx";
import {useNavigate} from "react-router-dom";

const CloseButton = () => {

    let navigate = useNavigate()
    const goBack = ()=>{
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