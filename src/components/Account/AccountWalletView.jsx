import React, {useEffect} from 'react';
import styles from "./Account.module.scss";
import MenuBurger from "../MenuBurger/MenuBurger.jsx";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getSingleAccount} from "../../features/user/userSlice.js";
import AccountBalance from "./AccountBalance.jsx";
import EditButton from "./EditButton.jsx";
import CloseButton from "../CloseButton/CloseButton.jsx";
import LineChart from "../Chart/LineChart.jsx";
import ChartBlock from "../Chart/ChartBlock.jsx";

const   AccountWalletView = () => {
    const dispatch = useDispatch();
    const { accountId } = useParams();

    const userTheme = useSelector((state)=> state.user.userData?.style)
    
   /* const isLoading = useSelector((state) => state.user.isLoading);
    const error = useSelector((state) => state.user.error);*/

    const accountData = useSelector((state) =>
        state.user.userAccounts.find(account=> account.id.toString() === accountId)
    );
    console.log('accountData',accountData)

    const { value = null, currency = null } = accountData || {};


    useEffect(() => {
        if (accountId) {
            dispatch(getSingleAccount({ id: accountId }));
        }
    }, [accountId]);


    return (
        <div className={styles.account__view_nav_container}>
            <div className={styles.account__nav_header}>
                <div className={styles.account__nav_header_row}>
                    <h3 className={styles.account__nav_header_title}>Accounts</h3>
                    <h3 className={styles.account__nav_header_subtitle}>{accountData?.name || 'No data'}</h3>
                </div>
                <div style={{display:'flex',alignItems:'center', gap: '1rem'}}>
                    <EditButton title={'Edit'}/>
                    <CloseButton />
                </div>
            </div>
            <AccountBalance value={value} currency={currency}/>
            <ChartBlock/>
        </div>
    );
};


export default AccountWalletView;