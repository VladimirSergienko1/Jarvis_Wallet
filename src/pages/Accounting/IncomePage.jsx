import React from 'react';
import styles from "../../components/Account/Account.module.scss";
import EditButton from "../../components/Account/EditButton.jsx";
import CloseButton from "../../components/CloseButton/CloseButton.jsx";
import AccountBalance from "../../components/Account/AccountBalance.jsx";
import ChartBlock from "../../components/Chart/ChartBlock.jsx";

const IncomePage = () => {
    console.log('INCOMEPAGE')
    return (
        <div className={styles.account__view_nav_container}>
            <div className={styles.account__nav_header}>
                <div className={styles.account__nav_header_row}>
                    <h3 className={styles.account__nav_header_title}>Income</h3>
                </div>
                <div style={{display:'flex',alignItems:'center', gap: '1rem'}}>
                    <EditButton title={'Add income'}/>
                    <CloseButton />
                </div>
            </div>
        </div>
    );
};

export default IncomePage;