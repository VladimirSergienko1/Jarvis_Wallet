import React, {useState} from 'react';
import styles from "./AccountIcons.module.scss";
import gridImg from "../../assets/Profile/grid_image.svg";

const AccountIcons = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const handleGridItemClick = (index) => {
        setActiveIndex(index);
        console.log(index)
    };
    return (
        <div>
            <div className={styles.avatar_block_title}>Icon</div>
            <div className={styles.avatar_grid}>
                {Array(14).fill(null).map((_, index) => (
                    <div
                        key={index}
                        className={`${styles.grid_item} ${index === activeIndex ? styles.active : ''}`}
                        onClick={() => handleGridItemClick(index)}
                    >
                        <img src={gridImg} alt={`grid-item-${index}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AccountIcons;