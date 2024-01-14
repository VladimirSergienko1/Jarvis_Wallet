import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    setExpenseSourceDataForEditing, setOverAndExpenseModal,
    setOverAndIncomeModal,
    setSourceDataForEditing
} from "../../../features/ui/uiSlice.js";
import styles from "../Accounting.module.scss";
import {SourceImage_dict} from "../SourceImage_dict.js";

const ExpensesSourcesListElement = (props) => {
    const dispatch = useDispatch();
    const sources = useSelector((state) => state.user.userExpenseSource);
    const expenseTab = useSelector((state) => state.ui.expenseTab);

    const sourceData = useSelector((state) =>
        sources.find(source => source.id === props.sourceId)
    );
    console.log('sourceData',sourceData)

    const handleEditClick = () => {
        dispatch(setExpenseSourceDataForEditing(sourceData));
        dispatch(setOverAndExpenseModal(true, true));
    };

    return (
        <div className={styles.listEl}>
            <span className={styles.elText}>354</span>
            <div className={styles.elText}>
                <img src={SourceImage_dict[props.ico_id]} alt=""/>
            </div>
            <div>
                <span className={styles.elText}>{props.name}</span>
            </div>
            <span className={styles.elText}>{props.is_common? 'Yes' : 'NO'}</span>
            <span className={styles.elText}>99</span>
            <button className={styles.elBtn} onClick={()=> handleEditClick(props.sourceId)}>Edit</button>
        </div>
    );
};

export default ExpensesSourcesListElement;