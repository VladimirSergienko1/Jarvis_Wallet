import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {setAccountModalDataForEditing, setOverAndAccModal, setOverAndIncomeModal} from "../../../features/ui/uiSlice.js";
import styles from "../../../components/Account/Account.module.scss";

const AddButton = ({title}) => {
    const dispatch = useDispatch();

    const handleEditClick = () => {
        dispatch(setOverAndIncomeModal(true, true));
    };
    return (
        <div className={styles.account__edit} onClick={handleEditClick}>
            <span>{title}</span>
        </div>
    );
};
export default AddButton;