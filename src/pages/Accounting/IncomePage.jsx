import React, {useEffect, useState} from 'react';
import styles from "./Accounting.module.scss";
import EditButton from "../../components/Account/EditButton.jsx";
import CloseButton from "../../components/CloseButton/CloseButton.jsx";
import AccountingList from "./AccountingList.jsx";
import AddButton from "../../components/Accounting/AddButton.jsx";
import {getAccountList, getIncomeList, getIncomeSourceList} from "../../features/user/userSlice.js";
import {useDispatch, useSelector} from "react-redux";

const IncomePage = () => {
    const dispatch = useDispatch()
    const sources = useSelector((state) => state.user.userIncomeSource);
    console.log('sources',sources)
    const [selectedItem, setSelectedItem] = useState(0);
    const handleSelect = (index)=>{
        setSelectedItem(index)
    }
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
                    <AddButton title={'Add income'}/>
                    <CloseButton />
                </div>
            </div>
            <div className={styles.nav_container_body}>
                <ul className={styles.nav_container_list}>
                    <li className={selectedItem===0 ? styles.nav_container_item_selected : styles.nav_container_item}
                        onClick={()=>handleSelect(0)}>List</li>
                    <li className={selectedItem===1 ? styles.nav_container_item_selected : styles.nav_container_item}
                        onClick={()=>handleSelect(1)}>Sources</li>
                </ul>
            </div>
            <AccountingList/>
        </div>
    );
};

export default IncomePage;