import React from 'react';
import acc_img from "../../assets/Account/acc_img.svg";
import rightArrow from "../../assets/Account/rightArrow.svg";
import {useSelector} from "react-redux";
import styles from "./Account.module.scss";
import {accImg_dict} from "../../features/handlers/accImage_dict.js";

const Account = ({name, id, ico_id}) => {
    return (
        <div className={styles.account__card}>
                <div key={id} className={styles.account__card_body}>
                    <img src={accImg_dict[ico_id]} alt="Account"/>
                    <div className={styles.account__card_inner}>
                        <p>{name}</p>
                        <img style={{display: 'flex'}} src={rightArrow} alt="Arrow"/>
                    </div>
                </div>
        </div>
    );
};

export default Account;