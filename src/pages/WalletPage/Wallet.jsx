import styles from "./Wallet.module.scss";
import PlusIcon from "../../assets/WalletsPage/plus_icon.svg";
import wallet from "../../assets/WalletsPage/wallet.svg";
import {matchPath} from "react-router-dom";

const Wallet = () =>{
    return(
        <div className={styles.wallet_page}>
            <div className={styles.wallet__container}>
                <div className={styles.container_header}>
                    <h2 className={styles.header_title}>Accounts</h2>
                    <img src={PlusIcon}/>
                </div>
                <div className={styles.container_body}>
                    <input className={styles.body_input}/>
                    <div className={styles.body_empty}>
                        <img className={styles.empty_image} src={wallet}/>
                        <h2 className={styles.empty_title}>No wallets available</h2>

                    </div>

                </div>


            </div>
        </div>
    )
}

export default Wallet