import React from 'react';
import styles from "./Account.module.scss";
import arrow_up from '../../assets/Account/arrow_up.svg'

    const AccountBalance = ({value, currency}) => {
    return (
        <div className={styles.account__balance_container}>
            <div className={styles.balance_block}>
                <p className={styles.balance_block_title}>Balance</p>
                <p className={styles.balance_block_value}>{value} {currency}</p>
            </div>
            <div className={styles.balance_changes_block}>
                <p className={styles.changes_title}>Change in 30 days</p>
                <p className={styles.changes_value}>233%</p>
                <img src={arrow_up}/>

            </div>
        </div>
    );
};

export default AccountBalance;