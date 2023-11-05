import React, {useState} from 'react';
import styles from "../../pages/WalletPage/Wallet.module.scss";
import MenuBurger from "../MenuBurger/MenuBurger.jsx";

const InitialWalletView = () => {
    const [selectedItem, setSelectedItem] = useState(0);
    const handleSelect = (index)=>{
        setSelectedItem(index)
    }
    return (
        <div className={styles.wallet_nav_container}>
            <div className={styles.nav_container_header}>
                <h2 className={styles.nav_header_title}>Jarvis Wallet</h2>
                <MenuBurger/>
            </div>
            <div className={styles.nav_container_body}>
                <ul className={styles.nav_container_list}>
                    <li className={selectedItem===0 ? styles.nav_container_item_selected : styles.nav_container_item}
                        onClick={()=>handleSelect(0)}>All</li>
                    <li className={selectedItem===1 ? styles.nav_container_item_selected : styles.nav_container_item}
                        onClick={()=>handleSelect(1)}>Accounting</li>
                    <li className={selectedItem===2 ? styles.nav_container_item_selected : styles.nav_container_item}
                        onClick={()=>handleSelect(2)}>System</li>
                </ul>
            </div>
        </div>
    );
};

export default InitialWalletView;