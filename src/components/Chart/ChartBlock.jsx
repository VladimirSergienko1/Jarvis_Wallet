import React from 'react';
import LineChart from "./LineChart.jsx";
import styles from "../Account/Account.module.scss"

const ChartBlock = () => {
    return (
        <div className={styles.chart_container}>
            <LineChart/>
        </div>
    );
};

export default ChartBlock;