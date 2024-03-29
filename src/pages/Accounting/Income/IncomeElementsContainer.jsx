import React from 'react';
import styles from "../Accounting.module.scss";
import IncomesListElement from "./IncomesListElement.jsx";
import {useSelector} from "react-redux";
import SourcesListElement from "./SourcesListElement.jsx";

const IncomeElementsContainer = () => {
    const incomes = useSelector((state) => state.user.userIncomes);
    const sources = useSelector((state) => state.user.userIncomeSource);
    const incomeTab = useSelector((state) => state.ui.incomeTab);
    console.log('sources',sources)
    return (
        <>
        {incomeTab === 'income' && (<div className={styles.elContainer}>
            {incomes.map((income, index) => (
                <IncomesListElement key={income.id} amount = {income.amount} incomeId = {income.id} index={index + 1} source_id={income.source_id} comment={income.comment} time_at={income.time_at} />
            ))}
        </div>)}
            {incomeTab === 'source' && (<div className={styles.elContainer}>
                {sources.map((source, index) => (
                    <SourcesListElement key={source.id} ico_id = {source.ico_id} is_common = {source.is_common} index={index + 1} name = {source.name} sourceId = {source.id} />
                ))}
            </div>)}
        </>
    );
};

export default IncomeElementsContainer;