import React, {useEffect} from 'react';
import styles from "../../pages/WalletPage/Wallet.module.scss";
import MenuBurger from "../MenuBurger/MenuBurger.jsx";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getSingleAccount} from "../../features/user/userSlice.js";

const AccountWalletView = () => {
    const dispatch = useDispatch();
    const { accountId } = useParams(); // Получение id из параметров URL

    const isLoading = useSelector((state) => state.user.isLoading);
    const error = useSelector((state) => state.user.error);

    const accountData = useSelector((state) =>
        state.user.userAccounts.find(account=> account.id.toString() === accountId)
    );

    useEffect(() => {
        if (accountId) {
            dispatch(getSingleAccount({ id: accountId }));
        }
    }, [accountId, dispatch]);

    /*if (isLoading) {
        return <div>Loading...</div>;
    }*/

    return (
        <div className={styles.wallet_nav_container}>
            <div className={styles.nav_container_header}>
                <div style={{display:'flex', gap:'1rem'}}>
                    <h2 className={styles.nav_header_title}>Accounts</h2>
                    <h2 style={{display:'flex',alignSelf:'center'}}>{accountData?.name || 'No data'}</h2>
                    {accountData?.comment}
                </div>
                <MenuBurger />
            </div>
        </div>
    );
};


export default AccountWalletView;