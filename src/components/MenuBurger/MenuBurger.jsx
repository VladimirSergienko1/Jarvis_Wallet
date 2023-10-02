import styles from "./MenuBurger.module.scss";
import menuBackground from "../../assets/WalletsPage/menu-background.svg";
import {useState} from "react";

import profileImg from '../../assets/MenuBurger/profile_img.svg';
import lightImg from '../../assets/MenuBurger/light_img.svg';
import proImg from '../../assets/MenuBurger/pro_img.svg';

const MenuBurger = () => {
    const [isActive, setIsActive] = useState(false)
    const [theme, setTheme] = useState(false)

    const toggleActive = ()=>{
        setIsActive(!isActive)
    }
    const toggleTheme = ()=>{
        setTheme(!!theme)
    }

    return(
        <div className={`${styles.menuBurger} ${isActive ? styles.active : ''}`}>
           {/* {isActive && <ul className={styles.burgerExpanded}>
                    <li className={styles.burgerItem}><img src={profileImg}/>Profile</li>
                    <li className={styles.burgerItem}><img src={lightImg}/>Light</li>
                    <li className={styles.burgerItem}><img src={proImg}/>Pro</li>
            </ul>}*/}
            <ul className={`${styles.burgerExpanded} ${isActive ? styles.active : ''}`}>
                <li className={styles.burgerItem}><img src={profileImg}/>Profile</li>
                <li className={styles.burgerItem}><img src={lightImg}/>Light</li>
                <li className={styles.burgerItem}><img src={proImg}/>Pro</li>
            </ul>

            <div className={styles.menuBackground} onClick={toggleActive}>
                <img  src={menuBackground}/>
                <svg
                    className={styles.burgerIcon}
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                >
                    <path d="M6.66663 9.33325H25.3333" stroke="#33363F" stroke-width="2" stroke-linecap="round"/>
                    <path d="M6.66663 16H25.3333" stroke="#33363F" stroke-width="2" stroke-linecap="round"/>
                    <path d="M6.66663 22.6667H25.3333" stroke="#33363F" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </div>

        </div>
    )
}
export default MenuBurger