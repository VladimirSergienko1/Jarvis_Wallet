import React from 'react';
import {useSelector} from "react-redux";
import styles from "../Accounting.module.scss";
import ExpensesListElement from "./ExpensesListElement.jsx";
import ExpensesSourcesListElement from "./ExpensesSourcesListElement.jsx";

const ExpensesElementsContainer = () => {
    const expenses = useSelector((state) => state.user.userExpenses);
    const sources = useSelector((state) => state.user.userExpenseSource);
    const expenseTab = useSelector((state) => state.ui.expenseTab);
    return (
        <>
            {expenseTab === 'expense' && (<div className={styles.elContainer}>
                {expenses.map((expense, index) => (
                    <ExpensesListElement key={expense.id} index={index + 1} amount = {expense.amount} incomeId = {expense.id} source_id={expense.source_id} comment={expense.comment} time_at={expense.time_at} />
                ))}
            </div>)}
            {expenseTab === 'source' && (<div className={styles.elContainer}>
                {sources.map((source, index) => (
                    <ExpensesSourcesListElement key={source.id} index={index + 1} ico_id = {source.ico_id} is_common = {source.is_common} name = {source.name} sourceId = {source.id} />
                ))}
            </div>)}
        </>
    )
};

export default ExpensesElementsContainer;