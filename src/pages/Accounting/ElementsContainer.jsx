import React from 'react';
import styles from "./Accounting.module.scss";
import ListElement from "./ListElement.jsx";

const ElementsContainer = () => {
    return (
        <div className={styles.elContainer}>
            <ListElement/>
            <ListElement/>
        </div>
    );
};

export default ElementsContainer;