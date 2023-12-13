import React from 'react';
import styles from "./Account.module.scss";
import AccountModal from "./AccountModal.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setOverAndAccModal} from "../../features/ui/uiSlice.js";
const EditButton = ({title}) => {
    const dispatch = useDispatch();

    return (
        <div className={styles.account__edit} /*onClick={()=> dispatch(setOverAndAccModal(true, true))}*/>
            <span>{title}</span>
            <AccountModal />
        </div>
    );
};

export default EditButton;