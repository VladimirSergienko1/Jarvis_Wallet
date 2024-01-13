import React from 'react';
import styles from "../Accounting.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {
    setAccountModalDataForEditing,
    setIncomeDataForEditing,
    setOverAndAccModal,
    setOverAndIncomeModal, setSourceDataForEditing
} from "../../../features/ui/uiSlice.js";

const IncomesListElement = (props) => {
    const dispatch = useDispatch();
    const sources = useSelector((state) => state.user.userIncomeSource);
    const incomeTab = useSelector((state) => state.ui.incomeTab);

    const sourceData = useSelector((state) =>
        sources.find(source => source.id === props.sourceId)
    );
    console.log('sourceData',sourceData)

    const handleEditClick = () => {
        dispatch(setSourceDataForEditing(sourceData));
        dispatch(setOverAndIncomeModal(true, true));
    };

    return (
        <div className={styles.listEl}>
            <span className={styles.elText}>354</span>
            <div>{`ico ${props.ico_id}`}</div>
            <div>
                <span className={styles.elText}>Sources</span>
                <img/>
            </div>
            <span className={styles.elText}>{props.is_common}</span>
            <button className={styles.elBtn} onClick={()=> handleEditClick(props.sourceId)}>Edit</button>
        </div>
    );
};

export default IncomesListElement;