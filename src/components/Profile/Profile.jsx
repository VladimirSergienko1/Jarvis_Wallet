
import styles from './Profile.module.scss'
import MenuBurger from "../MenuBurger/MenuBurger.jsx";
import {useState} from "react";

const Profile = () =>{
    const [selectedItem, setSelectedItem] = useState(0);

    return(
            <div className={styles.profile__container}>
                <div className={styles.profile__header}>
                    <h2 className={styles.profile_header_title}>Profile</h2>
                    <ul className={styles.profile__header_list}>
                        <li className={selectedItem===0 ? styles.profile__list_item_selected : styles.profile__list_item}
                        onClick={()=>setSelectedItem(0)}>inf</li>
                        <li className={selectedItem===1 ? styles.profile__list_item_selected : styles.profile__list_item}
                            onClick={()=>setSelectedItem(1)}>sda</li>
                        <li className={selectedItem===2 ? styles.profile__list_item_selected : styles.profile__list_item}
                            onClick={()=>setSelectedItem(2)}>ss</li>

                    </ul>

                </div>

            </div>
    )
}

export default Profile