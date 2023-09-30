import info from "../../assets/LoginPage/Info.svg";
import errorIcon from "../../assets/LoginPage/Error_round.svg";
import correctIcon from "../../assets/LoginPage/Done_round.svg";
import styles from "./NoAccess.module.scss";
import noAccess from "../../assets/LoginPage/noAccess.svg";

const NoAccess = ()=>{
    return(
        <div className={styles.access_page}>
            <div className={styles.access_page__container}>
                <div className={styles.reg_block}>
                        <h2 className={styles.reg_title}>No Access !</h2>
                        <h3 className={styles.reg_subtitle}>You are denied access for some reason</h3>
                        <img src={noAccess}/>
                        <div className={styles.reg_footer}>
                            <button className={styles.reg_button} type={"submit"} >Return</button>
                        </div>
                </div>
            </div>
        </div>
    )
}
export default NoAccess