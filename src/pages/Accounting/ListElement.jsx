import React from 'react';
import styles from "./Accounting.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {
    setAccountModalDataForEditing,
    setIncomeDataForEditing,
    setOverAndAccModal,
    setOverAndIncomeModal
} from "../../features/ui/uiSlice.js";

const ListElement = (props) => {
    const dispatch = useDispatch();
    const income = useSelector((state) => state.user.userIncomes);
    const sources = useSelector((state) => state.user.userIncomeSource);
    const incomeTab = useSelector((state) => state.ui.incomeTab);

    const incomeData = useSelector((state) =>
        income.find(income=> income.id === props.incomeId)
    );

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric'};
        return new Date(dateString).toLocaleString('en-US', options);
    }
    console.log('income',income)
    console.log('incomeData',incomeData)
    const handleEditClick = () => {
        dispatch(setIncomeDataForEditing(incomeData));
        dispatch(setOverAndIncomeModal(true, true));
    };

    return (
        <div className={styles.listEl}>
            <span className={styles.elText}>354</span>
            <div>
                <span className={styles.elText}>Income</span>
                <img/>
            </div>
            <span className={styles.elText}>{props.source_id}</span>
            <span className={styles.elText}>{props.amount}</span>
            <span className={styles.elText}>{formatDate(props.time_at)}</span>
            <button className={styles.elBtn} onClick={()=> handleEditClick(props.incomeId)}>Edit</button>
        </div>
    );
};

export default ListElement;