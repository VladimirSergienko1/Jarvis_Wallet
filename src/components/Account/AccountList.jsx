import React from 'react';
import Account from "./Account.jsx";
import {useSelector} from "react-redux";
import styles from "../../pages/WalletPage/Wallet.module.scss";
import wallet from "../../assets/WalletsPage/wallet.svg";

const AccountList = ({filter }) => {
    const accounts = useSelector((state) => state.user.userAccounts);
    const filteredAccounts = accounts?.filter(account =>
        account.name.toLowerCase().includes(filter.toLowerCase())
    );
    console.log('filteredAccounts',filteredAccounts)
    return (
        <div>
            {filteredAccounts.length > 0 ? (
                filteredAccounts.map(({ name, id, ico_id }) => (
                    <div key={id}>
                        <Account name={name} id={id} ico_id={ico_id}/>
                    </div>
                ))
            ) : (
                <div className={styles.body_empty}>
                    <img className={styles.empty_image} src={wallet}/>
                    <h2 className={styles.empty_title}>No wallets available</h2>
                </div>
            )}
        </div>

    );
};

export default AccountList;