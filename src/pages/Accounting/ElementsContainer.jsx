import React from 'react';
import styles from "./Accounting.module.scss";
import ListElement from "./ListElement.jsx";
import {useSelector} from "react-redux";

const ElementsContainer = () => {
    const incomes = useSelector((state) => state.user.userIncomes);
    const sources = useSelector((state) => state.user.userIncomeSource);
    const incomeTab = useSelector((state) => state.ui.incomeTab);
    return (
        <div className={styles.elContainer}>
            {incomes.map(income => (
                <ListElement key={income.id} amount = {income.amount} incomeId = {income.id} source_id={income.source_id} comment={income.comment} time_at={income.time_at} />
            ))}
        </div>
    );
};

export default ElementsContainer;