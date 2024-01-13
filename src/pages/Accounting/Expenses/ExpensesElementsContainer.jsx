import React from 'react';
import styles from "../Accounting.module.scss";
import IncomesListElement from "./IncomesListElement.jsx";
import {useSelector} from "react-redux";
import SourcesListElement from "./SourcesListElement.jsx";

const ExpensesElementContainer = () => {
    const incomes = useSelector((state) => state.user.userIncomes);
    const sources = useSelector((state) => state.user.userIncomeSource);
    const incomeTab = useSelector((state) => state.ui.incomeTab);
    return (
        <>
            {incomeTab === 'income' && (<div className={styles.elContainer}>
                {incomes.map(income => (
                    <IncomesListElement key={income.id} amount = {income.amount} incomeId = {income.id} source_id={income.source_id} comment={income.comment} time_at={income.time_at} />
                ))}
            </div>)}
            {incomeTab === 'source' && (<div className={styles.elContainer}>
                {sources.map(source => (
                    <SourcesListElement key={source.id} Ico = {source.ico_id} is_common = {source.is_common} sourceId = {source.id} />
                ))}
            </div>)}
        </>
    );
};

export default ExpensesElementContainer;