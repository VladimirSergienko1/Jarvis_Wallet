import React, {useMemo, useState} from 'react';
import {useSelector} from "react-redux";
import styles from "../Accounting.module.scss";
import CustomSelect from "../../LoginPage/CustomSelect.jsx";
import ReactInputDateMask from "react-input-date-mask";
import ExpensesElementsContainer from "./ExpensesElementsContainer.jsx";

const ExpensesList = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const sources = useSelector((state) => state.user.userExpenseSource);
    const expenseTab = useSelector((state) => state.ui.expenseTab);
    const handleSourceChange = (option) => {
        setSelectedOption(option);
    };
    const sourceOptions = useMemo(() => {
        return sources.map(source => ({
            value: source.id,
            label: source.name
        }));
    }, [sources]);

    return (
        <div className={styles.accountingList}>
            { expenseTab === 'expense' && ( <div className={styles.listHeader}>
                <div className={styles.inputGroup}>
                    <label htmlFor={'Sources'} className={styles.inputLabels}>Source</label>
                    <CustomSelect
                        placeholder="All"
                        defaultValue={selectedOption}
                        onChange={handleSourceChange}
                        options={sourceOptions}
                        className={styles.listInput}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor={'from_input'} className={styles.inputLabels}>From</label>
                    <ReactInputDateMask
                        mask='dd/mm/yyyy'
                        id="from_input"
                        name="from"
                        showMaskOnFocus={false}
                        className={styles.listInput}
                        placeholder={'dd/mm/yyyy'}
                        showMaskOnHover={true}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor={'to_input'} className={styles.inputLabels}>To</label>
                    <ReactInputDateMask
                        mask='dd/mm/yyyy'
                        id="to_input"
                        name="to"
                        showMaskOnFocus={false}
                        className={styles.listInput}
                        placeholder={'dd/mm/yyyy'}
                        showMaskOnHover={true}
                    />
                </div>
            </div>)}
            { expenseTab === 'source' && (
                <div className={styles.listHeader}>
                    <div className={styles.inputGroup}>
                        <label htmlFor={'Sources'} className={styles.inputLabels}>Name</label>
                        <CustomSelect
                            placeholder="All"
                            defaultValue={selectedOption}
                            onChange={handleSourceChange}
                            options={sourceOptions}
                            className={styles.listInput}
                        />
                    </div>
                </div>)}
            <div className={styles.listBody}>
                {expenseTab === 'expense' && (
                    <div className={styles.listGroups}>
                        <span className={styles.listLabels}>Position</span>
                        <span className={styles.listLabels}>Type</span>
                        <span className={styles.listLabels}>Source</span>
                        <span className={styles.listLabels}>Value</span>
                        <span className={styles.listLabels}>Time</span>
                        <span className={styles.listLabels}>Action</span>
                    </div>
                )}
                {expenseTab === 'source' && (
                    <div className={styles.listGroups}>
                        <span className={styles.listLabels}>Position</span>
                        <span className={styles.listLabels}>Ico</span>
                        <span className={styles.listLabels}>Name</span>
                        <span className={styles.listLabels}>Common</span>
                        <span className={styles.listLabels}>Used</span>
                        <span className={styles.listLabels}>Action</span>
                    </div>
                )}
                <ExpensesElementsContainer/>

            </div>
        </div>

    );
};
export default ExpensesList;