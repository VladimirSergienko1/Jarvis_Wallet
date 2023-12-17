import React from 'react';
import styles from "./Account.module.scss";
import AccountModal from "./AccountModal.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setOverAndAccModal, setAccountModalDataForEditing} from "../../features/ui/uiSlice.js";
import {useParams} from "react-router-dom";
const EditButton = ({title}) => {
    const dispatch = useDispatch();
    const { accountId } = useParams();

    const accountData = useSelector((state) =>
        state.user.userAccounts.find(account=> account.id.toString() === accountId)
    );
    console.log('EditAccountData',accountData)
    const handleEditClick = () => {
        dispatch(setAccountModalDataForEditing(accountData));
        dispatch(setOverAndAccModal(true, true));
    };
    return (
        <div className={styles.account__edit} onClick={handleEditClick}>
            <span>{title}</span>
{/*
            <AccountModal />
*/}
        </div>
    );
};

export default EditButton;