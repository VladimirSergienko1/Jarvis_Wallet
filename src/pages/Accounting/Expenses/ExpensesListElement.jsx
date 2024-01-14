import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    setExpenseDataForEditing,
    setIncomeDataForEditing, setOverAndExpenseModal,
    setOverAndIncomeModal
} from "../../../features/ui/uiSlice.js";
import s from "../Accounting.module.scss";

const ExpensesListElement = (props) => {
    const dispatch = useDispatch();
    const expense = useSelector((state) => state.user.userExpenses);
    const expenseTab = useSelector((state) => state.ui.expenseTab);

    const expenseData = useSelector((state) =>
        expense.find(income=> income.id === props.incomeId)
    );

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric'};
        return new Date(dateString).toLocaleString('en-US', options);
    }
    const handleEditClick = () => {
        dispatch(setExpenseDataForEditing(expenseData));
        dispatch(setOverAndExpenseModal(true, true));
    };

    return (
        <div className={s.listEl}>
            <span className={s.elText}>354</span>
            <span className={s.elText}>Income</span>
            <img/>
            <span className={s.elText}>{props.source_id}</span>
            <span className={s.elText}>{props.amount}</span>
            <span className={s.elText}>{formatDate(props.time_at)}</span>
            <button className={s.elBtn} onClick={()=> handleEditClick(props.incomeId)}>Edit</button>
        </div>
    );
};

export default ExpensesListElement;