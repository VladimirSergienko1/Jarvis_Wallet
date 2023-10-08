import styles from "./MenuBurger.module.scss";
import menuBackground from "../../assets/WalletsPage/menu-background.svg";
import {useState} from "react";

import profileImg from '../../assets/MenuBurger/profile_img.svg';
import lightImg from '../../assets/MenuBurger/light_img.svg';
import proImg from '../../assets/MenuBurger/pro_img.svg';
import Profile from "../Profile/Profile.jsx";

const MenuBurger = () => {
    const [isActive, setIsActive] = useState(false)
    const [theme, setTheme] = useState(false)

    const [openProfile, setOpenProfile] = useState(false)

    const toggleActive = ()=>{
        setIsActive(!isActive)
    }
    const toggleTheme = ()=>{
        setTheme(!!theme)
    }

    const toggleProfile = ()=>{
        setOpenProfile(!openProfile)
    }
    console.log('BurgerOpenProfile',openProfile)

    return(
        <div className={`${styles.menuBurger} ${isActive ? styles.active : ''}`}>
            <ul className={`${styles.burgerExpanded} ${isActive ? styles.active : ''}`}>
                <li className={styles.burgerItem} onClick={toggleProfile}><img src={profileImg}/>Profile</li>
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
                    <path d="M6.66663 9.33325H25.3333" stroke="#33363F" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M6.66663 16H25.3333" stroke="#33363F" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M6.66663 22.6667H25.3333" stroke="#33363F" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </div>
            {openProfile && <Profile toggleProfile={toggleProfile}/>}

        </div>
    )
}
export default MenuBurger