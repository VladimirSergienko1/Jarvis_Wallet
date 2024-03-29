import React from 'react';
import styles from "../Accounting.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {
    setOverAndIncomeModal, setSourceDataForEditing
} from "../../../features/ui/uiSlice.js";
import {SourceImage_dict} from "../SourceImage_dict.js";

const SourcesListElement = (props) => {
    const dispatch = useDispatch();
    const sources = useSelector((state) => state.user.userIncomeSource);

    const sourceData = useSelector((state) =>
        sources.find(source => source.id === props.sourceId)
    );

    const handleEditClick = () => {
        dispatch(setSourceDataForEditing(sourceData));
        dispatch(setOverAndIncomeModal(true, true));
    };

    console.log('props',props)
    return (
        <div className={styles.listEl}>
            <span className={styles.elText}>{props.index}</span>
            <div className={styles.elText}>
                <img src={SourceImage_dict[props.ico_id]} alt=""/>
            </div>
            <span className={styles.elText}>{props.name}</span>
            <span className={styles.elText}>{props.is_common? 'Yes' : 'NO'}</span>
            <span className={styles.elText}>{999}</span>
            <button className={styles.elBtn} onClick={()=> handleEditClick(props.sourceId)}>Edit</button>
        </div>
    );
};

export default SourcesListElement;