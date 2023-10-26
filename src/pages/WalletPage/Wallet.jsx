import styles from "./Wallet.module.scss";
import PlusIcon from "../../assets/WalletsPage/plus_icon.svg";
import wallet from "../../assets/WalletsPage/wallet.svg";
import menuBackground from "../../assets/WalletsPage/menu-background.svg";
import menuBurger from "../../assets/WalletsPage/menu.svg";
import {matchPath} from "react-router-dom";
import {useState} from "react";
import MenuBurger from "../../components/MenuBurger/MenuBurger.jsx";
import AccountModal from "../../components/Account/AccountModal.jsx";
import acc_img from '../../assets/Account/acc_img.svg'
import rightArrow from '../../assets/Account/rightArrow.svg'

const Wallet = () =>{
    const [selectedItem, setSelectedItem] = useState(0);
    const [accountModalVisible, setAccountModalVisible] = useState(false)
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);

    const openAccModal = ()=>{
        setAccountModalVisible(!accountModalVisible)
        setIsOverlayVisible(true)
    }

    const handleOverlay = () =>{
        setAccountModalVisible(false)
        setIsOverlayVisible(false)
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
                    <AccountModal accountModalVisible={accountModalVisible} isOverlayVisible={isOverlayVisible} handleOverlay={handleOverlay} />

                </div>
                <div className={styles.container_body}>
                    <input className={styles.body_input}/>
                    <div className={styles.body_empty}>
                        <img className={styles.empty_image} src={wallet}/>
                        <h2 className={styles.empty_title}>No wallets available</h2>
                        <div style={{display:'flex', width: '20rem', border: '1px solid red', padding: '1rem 1.25rem',
                        borderRadius: '0.5rem', background:'#EFEFF4'}}>
                            <img src={acc_img}/>
                            <div style={{display:'flex', alignItems:'center', marginLeft:'1.25rem', justifyContent:'space-between',width:'100%'}}>
                                <p>Kaspi</p>
                                <img style={{display:'flex'}} src={rightArrow}/>
                            </div>
                        </div>
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