import React from 'react';
import styles from "../../pages/WalletPage/Wallet.module.scss";
import image from "../../assets/LoginPage/Info.svg"
import {Link} from "react-router-dom";
const CategoryCard = ({ link, category,  description, img}) => {
    return (
        <Link to={link}>
        <div className={styles.categoryCard}>
            <div className={styles.cardDesc}>
                <span className={styles.descCategory}>{category}</span>
                <span className={styles.descTitle}>{description}</span>
            </div>
            {/*<div className={styles.cardImageContainer} >*/} {/*//FIXME*/}
                <img className={styles.cardImage} src={img ? img : image}  alt={'img'}/>
           {/* </div>*/}
        </div>
        </Link>
    );
};

export default CategoryCard;