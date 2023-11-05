import React from 'react';
import styles from "../../pages/WalletPage/Wallet.module.scss";
import MenuBurger from "../MenuBurger/MenuBurger.jsx";

const AccountWalletView = ({accountId}) => {
    console.log(accountId)
    return (
        <div className={styles.wallet_nav_container}>
            <div className={styles.nav_container_header}>
                <div style={{display:'flex', gap:'1rem'}}>
                    <h2 className={styles.nav_header_title}>Accounts</h2>
                    <h2 style={{display:'flex',alignSelf:'center'}}>Acc NAME</h2>
                </div>
                <MenuBurger/>
            </div>
        </div>
    );
};

export default AccountWalletView;