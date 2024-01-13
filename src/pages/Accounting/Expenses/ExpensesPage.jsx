import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setExpenseTab} from "../../../features/ui/uiSlice.js";
import {getIncomeList, getIncomeSourceList} from "../../../features/user/userSlice.js";
import styles from "../Accounting.module.scss";
import AddButton from "../Income/AddButton.jsx";
import CloseButton from "../../../components/CloseButton/CloseButton.jsx";
import ExpensesList from "./ExpensesList.jsx";

const ExpensesPage = () => {
    const dispatch = useDispatch()
    const sources = useSelector((state) => state.user.userIncomeSource);
    const expenseTab = useSelector((state) => state.ui.expenseTab);

    const handleSelect = (value) => {
        dispatch(setExpenseTab(value))
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
                    <h3 className={styles.account__nav_header_title}>Expenses</h3>
                </div>
                <div style={{display:'flex',alignItems:'center', gap: '1rem'}}>
                    <AddButton title={`Add ${expenseTab === 'expense' ? 'expense' : 'source'}`}/>
                    <CloseButton />
                </div>
            </div>
            <div className={styles.nav_container_body}>
                <ul className={styles.nav_container_list}>
                    <li className={expenseTab === 'expense' ? styles.nav_container_item_selected : styles.nav_container_item}
                        onClick={()=>handleSelect('expense')}>List</li>
                    <li className={expenseTab === 'source' ? styles.nav_container_item_selected : styles.nav_container_item}
                        onClick={()=>handleSelect('source')}>Sources</li>
                </ul>
            </div>
            <ExpensesList/>
        </div>
    );
};

export default ExpensesPage;