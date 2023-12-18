import React, {useState} from 'react';
import styles from "./Accounting.module.scss";
import CustomSelect from "../LoginPage/CustomSelect.jsx";
import errorIcon from "../../assets/LoginPage/Error_round.svg";
import correctIcon from "../../assets/LoginPage/Done_round.svg";

const options = [
    { value: 'all', label: 'ALL' },
    { value: 'en', label: 'English' },
    { value: 'ru', label: 'Russian' },
    { value: 'kk', label: 'Kazakh' },
    { value: 'ua', label: 'Ukrainian' },
];
const AccountingList = () => {

    const [selectedOption, setSelectedOption] = useState(null);

    const handleLanguageChange = (option) => {
        setSelectedOption(option);
      //  formik.setFieldValue('language', option.value);
    };

    return (
        <div className={styles.accountingList}>
            <div className={styles.listHeader}>
                <div className={styles.inputGroup}>
                    <label htmlFor={'Sources'} className={styles}>Sources</label>
                    <CustomSelect
                        placeholder="All"
                        defaultValue={selectedOption}
                        onChange={handleLanguageChange}
                        options={options}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor={'from_input'} className={styles}>From</label>
                        <input
                            id="from_input"
                            name="password"
                            type="password"
                            placeholder={'dd/mm/yyyy'}
                            // onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            // value={formik.values.password}
                            className={styles.listInput}
                        />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor={'to_input'} className={styles}>To</label>
                        <input
                            id="to_input"
                            name="password"
                            type="password"
                            placeholder={'dd/mm/yyyy'}
                              // onChange={formik.handleChange}
                              // onBlur={formik.handleBlur}
                              // value={formik.values.password}
                            className={styles.listInput}
                        />
                </div>
            </div>
            <div className={styles.listBody}>
                    <div className={styles.listGroups}>
                        <span className={styles.row_label}>Position</span>
                        <span className={styles.row_label}>Type</span>
                        <span className={styles.row_label}>Source</span>
                        <span className={styles.row_label}>Value</span>
                        <span className={styles.row_label}>Time</span>
                        <span className={styles.row_label}>Action</span>
                    </div>
            </div>
        </div>
    );
};

export default AccountingList;