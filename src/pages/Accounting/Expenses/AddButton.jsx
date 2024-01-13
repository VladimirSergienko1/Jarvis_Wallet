import React from 'react';
import {useDispatch} from "react-redux";
import {
    setOverAndExpenseModal,
} from "../../../features/ui/uiSlice.js";
import styles from "../../../components/Account/Account.module.scss";

const AddButton = ({title}) => {
    const dispatch = useDispatch();

    const handleEditClick = () => {
        dispatch(setOverAndExpenseModal(true, true));
    };
    return (
        <div className={styles.account__edit} onClick={handleEditClick}>
            <span>{title}</span>
        </div>
    );
};
export default AddButton;