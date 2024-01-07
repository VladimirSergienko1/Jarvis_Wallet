import React from 'react';
import styles from "./Accounting.module.scss";
import ListElement from "./ListElement.jsx";
import {useSelector} from "react-redux";

const ElementsContainer = () => {
    const incomes = useSelector((state) => state.user.userIncomes);
    const sources = useSelector((state) => state.user.userIncomeSource);

    return (
        <div className={styles.elContainer}>
            {incomes.map(income => (
                <ListElement key={income.id} amount = {income.amount} incomeId={income.id} />
            ))}
        </div>
    );
};

export default ElementsContainer;