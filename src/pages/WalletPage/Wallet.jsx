import styles from "./Wallet.module.scss";
import PlusIcon from "../../assets/WalletsPage/plus_icon.svg";
import wallet from "../../assets/WalletsPage/wallet.svg";
import menuBackground from "../../assets/WalletsPage/menu-background.svg";
import menuBurger from "../../assets/WalletsPage/menu.svg";
import {matchPath} from "react-router-dom";
import {useState} from "react";
import MenuBurger from "../../components/MenuBurger/MenuBurger.jsx";
import Account from "../../components/Account/Account.jsx";

const Wallet = () =>{
    const [selectedItem, setSelectedItem] = useState(0);
    const [accountModalVisible, setAccountModalVisible] = useState(false)

    const openAccModal = ()=>{
        setAccountModalVisible(!accountModalVisible)
    }

    const handleSelect = (index)=>{
        setSelectedItem(index)
    }


    return(
        <div className={styles.wallet_page}>
            <div className={styles.wallet__container}>
                <div className={styles.container_header}>
                    <h2 className={styles.header_title}>Accounts</h2>
                    <img src={PlusIcon} onClick={openAccModal} style={{cursor: 'pointer'}}/>
                    <Account accountModalVisible={accountModalVisible} />

                </div>
                <div className={styles.container_body}>
                    <input className={styles.body_input}/>
                    <div className={styles.body_empty}>
                        <img className={styles.empty_image} src={wallet}/>
                        <h2 className={styles.empty_title}>No wallets available</h2>
                    </div>
                </div>
            </div>
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
        </div>
    )
}

export default Wallet