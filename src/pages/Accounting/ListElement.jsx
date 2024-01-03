import React from 'react';
import styles from "./Accounting.module.scss";

const ListElement = () => {
    return (
        <div className={styles.listEl}>
            <span className={styles.elText}>354</span>
            <div>
                <span className={styles.elText}>Income</span>
                <img/>
            </div>
            <span className={styles.elText}>Work</span>
            <span className={styles.elText}>80.00</span>
            <span className={styles.elText}>10.09.2023</span>
            <button className={styles.elBtn}>Edit</button>
        </div>
    );
};

export default ListElement;