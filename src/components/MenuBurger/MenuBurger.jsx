import styles from "./MenuBurger.module.scss";
import menuBackground from "../../assets/WalletsPage/menu-background.svg";
import menuBackgroundDark from "../../assets/WalletsPage/menu-background-dark.svg";
import {useState} from "react";

import profileImg from '../../assets/MenuBurger/profile_img.svg';
import lightImg from '../../assets/MenuBurger/light_img.svg';
import proImg from '../../assets/MenuBurger/pro_img.svg';
import Profile from "../Profile/Profile.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setUserTheme} from "../../features/user/userSlice.js";

const MenuBurger = () => {
    const dispatch = useDispatch();
    const userTheme = useSelector((state) => state.user.userTheme);

    const [isActive, setIsActive] = useState(false)

    const [openProfile, setOpenProfile] = useState(false)

    const toggleActive = ()=>{
        setIsActive(!isActive)
    }
    const toggleTheme = () => {
        const newTheme = userTheme === 'light' ? 'dark' : 'light';
        dispatch(setUserTheme(newTheme))
        localStorage.setItem('theme', newTheme);
    }

    const toggleProfile = ()=> {
        setOpenProfile(!openProfile)
    }

    return(
        <div className={`${styles.menuBurger} ${isActive ? styles.active : ''}`}>
            <ul className={`${styles.burgerExpanded} ${isActive ? styles.active : ''}`}>
                <li className={styles.burgerItem} onClick={toggleProfile}><img src={profileImg}/>Profile</li>
                <li className={styles.burgerItem} onClick={toggleTheme}><img src={lightImg}/>Light</li>
                <li className={styles.burgerItem}><img src={proImg}/>Pro</li>
                <li className={styles.burgerItem}><img src={proImg}/>Log Out</li>
            </ul>

            <div className={styles.menuBackground} onClick={toggleActive}>
                <img src={userTheme === 'light' ? menuBackground : menuBackgroundDark}/>
                <svg
                    className={styles.burgerIcon}
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                >
                    <path d="M6.66663 9.33325H25.3333"  stroke={userTheme === 'light' ? "#33363F" : "#F7F7F8"} strokeWidth="2" strokeLinecap="round"/>
                    <path d="M6.66663 16H25.3333" stroke={userTheme === 'light' ? "#33363F" : "#F7F7F8"} strokeWidth="2" strokeLinecap="round"/>
                    <path d="M6.66663 22.6667H25.3333" stroke={userTheme === 'light' ? "#33363F" : "#F7F7F8"} strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </div>
            {openProfile && <Profile toggleProfile={toggleProfile}/>}

        </div>
    )
}
export default MenuBurger