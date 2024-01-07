import React, {useMemo, useState} from 'react';
import styles from "./Accounting.module.scss";
import CustomSelect from "../LoginPage/CustomSelect.jsx";
import errorIcon from "../../assets/LoginPage/Error_round.svg";
import correctIcon from "../../assets/LoginPage/Done_round.svg";
import ReactInputDateMask from 'react-input-date-mask';
import ElementsContainer from "./ElementsContainer.jsx";
import {useSelector} from "react-redux";

const options = [
    { value: 'all', label: 'ALL' },
    { value: 'en', label: 'English' },
    { value: 'ru', label: 'Russian' },
    { value: 'kk', label: 'Kazakh' },
    { value: 'ua', label: 'Ukrainian' },
];
const AccountingList = () => {

    const [selectedOption, setSelectedOption] = useState(null);
    const sources = useSelector((state) => state.user.userIncomeSource);
    const handleLanguageChange = (option) => {
        setSelectedOption(option);
      //  formik.setFieldValue('language', option.value);
    };
    const sourceOptions = useMemo(() => {
        return sources.map(source => ({
            value: source.id, // Использовать id для значения
            label: source.name // Имя для отображения
        }));
    }, [sources]);

    return (
        <div className={styles.accountingList}>
            <div className={styles.listHeader}>
                <div className={styles.inputGroup}>
                    <label htmlFor={'Sources'} className={styles.inputLabels}>Source</label>
                    <CustomSelect
                        placeholder="All"
                        defaultValue={selectedOption}
                        onChange={handleLanguageChange}
                        options={sourceOptions}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor={'from_input'} className={styles.inputLabels}>From</label>
                      {/*  <input
                            id="from_input"
                            name="password"
                            type="password"
                            placeholder={'dd/mm/yyyy'}
                            // onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            // value={formik.values.password}
                            className={styles.listInput}
                        />*/}
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
            </div>
            <div className={styles.listBody}>
                    <div className={styles.listGroups}>
                        <span className={styles.listLabels}>Position</span>
                        <span className={styles.listLabels}>Type</span>
                        <span className={styles.listLabels}>Source</span>
                        <span className={styles.listLabels}>Value</span>
                        <span className={styles.listLabels}>Time</span>
                        <span className={styles.listLabels}>Action</span>
                    </div>
                <ElementsContainer/>
            </div>

        </div>

    );
};

export default AccountingList;