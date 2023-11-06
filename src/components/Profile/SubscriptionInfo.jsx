import React from 'react';
import styles from "./Profile.module.scss";

const SubscriptionInfo = () => {
    const daysInMonth = 30;
    const passedDays = 6;
    const passedDaysPercentage = (passedDays / daysInMonth) * 100;

    return (
        <div className={styles.subscription__container}>
            <div className={styles.subscription_info}>
                <div className={styles.subscription__row} >
                    <p className={styles.subscription__label}>Type</p>
                    <p className={styles.subscription__label}>Base</p>
                    <p className={styles.subscription__label}>Current subscription</p>
                    <p className={styles.subscription__label}>Days until the end 24</p>
                </div>
                <div className={styles.subscription__row}>
                    <p className={styles.subscription__label}>Time period</p>
                    <p className={styles.subscription__label}>1 month</p>
                    <div className={styles.subscription__line}>
                        <div
                            className={styles.subscription__progress}
                            style={{ width: `${passedDaysPercentage}%` }}
                        ></div>
                    </div>
                </div>
            </div>
            <div className={styles.history_container}>
                <h2 className={styles.history_title}>History</h2>
                <div className={styles.history_row}>
                    <p className={styles.row_label}>Id</p>
                    <p className={styles.row_label}>Type</p>
                    <p className={styles.row_label}>From</p>
                    <p className={styles.row_label}>To</p>
                    <p className={styles.row_label}>Status</p>
                </div>
                <div className={styles.history_list} >
                    <div className={styles.history_item} >
                        <span>6</span>
                        <span>Base</span>
                        <span>12.06.2023</span>
                        <span>12.07.2023</span>
                        <span>Completed</span>
                    </div>
                    <div className={styles.history_item} >
                        <span>6</span>
                        <span>Base</span>
                        <span>12.06.2023</span>
                        <span>12.07.2023</span>
                        <span>Completed</span>
                    </div>
                    <div className={styles.history_item} >
                        <span>6</span>
                        <span>Base</span>
                        <span>12.06.2023</span>
                        <span>12.07.2023</span>
                        <span>Completed</span>
                    </div>
                    <div className={styles.history_item} >
                        <span>6</span>
                        <span>Base</span>
                        <span>12.06.2023</span>
                        <span>12.07.2023</span>
                        <span>Completed</span>
                    </div>
                    <div className={styles.history_item} >
                        <span>6</span>
                        <span>Base</span>
                        <span>12.06.2023</span>
                        <span>12.07.2023</span>
                        <span>Completed</span>
                    </div>
                    <div className={styles.history_item} >
                        <span>6</span>
                        <span>Base</span>
                        <span>12.06.2023</span>
                        <span>12.07.2023</span>
                        <span>Completed</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionInfo;