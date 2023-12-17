import React, {useState} from 'react';
import styles from "../../components/Account/Account.module.scss";
import styles1 from "../../pages/Accounting/Accounting.scss";
import EditButton from "../../components/Account/EditButton.jsx";
import CloseButton from "../../components/CloseButton/CloseButton.jsx";
import AccountBalance from "../../components/Account/AccountBalance.jsx";
import ChartBlock from "../../components/Chart/ChartBlock.jsx";

const IncomePage = () => {
    const [selectedItem, setSelectedItem] = useState(0);
    const handleSelect = (index)=>{
        setSelectedItem(index)
    }

    return (
        <div className={styles.account__view_nav_container}>
            <div className={styles.account__nav_header}>
                <div className={styles.account__nav_header_row}>
                    <h3 className={styles.account__nav_header_title}>Income</h3>
                </div>
                <div style={{display:'flex',alignItems:'center', gap: '1rem'}}>
                    <EditButton title={'Add income'}/>
                    <CloseButton />
                </div>
            </div>
            <div className={styles1.nav_container_body}>
                <ul className={styles1.nav_container_list}>
                    <li className={selectedItem===0 ? styles1.nav_container_item_selected : styles1.nav_container_item}
                        onClick={()=>handleSelect(0)}>List</li>
                    <li className={selectedItem===1 ? styles1.nav_container_item_selected : styles1.nav_container_item}
                        onClick={()=>handleSelect(1)}>Sources</li>
                </ul>
            </div>
        </div>
    );
};

export default IncomePage;