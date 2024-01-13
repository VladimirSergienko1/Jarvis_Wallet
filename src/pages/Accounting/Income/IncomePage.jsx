import React, {useEffect, useState} from 'react';
import styles from "../Accounting.module.scss";
import EditButton from "../../../components/Account/EditButton.jsx";
import CloseButton from "../../../components/CloseButton/CloseButton.jsx";
import IncomeList from "./IncomeList.jsx";
import AddButton from "./AddButton.jsx";
import {getAccountList, getIncomeList, getIncomeSourceList} from "../../../features/user/userSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {setIncomeTab} from "../../../features/ui/uiSlice.js";

const IncomePage = () => {
    const dispatch = useDispatch()
    const incomeTab = useSelector((state) => state.ui.incomeTab);

    const handleSelect = (value) => {
        dispatch(setIncomeTab(value))
    };

    useEffect(() => {
        dispatch(getIncomeSourceList())
    }, []);
    useEffect(() => {
        dispatch(getIncomeList())
    }, []);


    return (
        <div className={styles.account__view_nav_container}>
            <div className={styles.account__nav_header}>
                <div className={styles.account__nav_header_row}>
                    <h3 className={styles.account__nav_header_title}>Income</h3>
                </div>
                <div style={{display:'flex',alignItems:'center', gap: '1rem'}}>
                    <AddButton title={`Add ${incomeTab === 'income' ? 'income' : 'source'}`}/>
                    <CloseButton />
                </div>
            </div>
            <div className={styles.nav_container_body}>
                <ul className={styles.nav_container_list}>
                    <li className={incomeTab === 'income' ? styles.nav_container_item_selected : styles.nav_container_item}
                        onClick={()=>handleSelect('income')}>List</li>
                    <li className={incomeTab === 'source' ? styles.nav_container_item_selected : styles.nav_container_item}
                        onClick={()=>handleSelect('source')}>Sources</li>
                </ul>
            </div>
            <IncomeList/>
        </div>
    );
};

export default IncomePage;