import React, {useState} from 'react';
import styles from "../../pages/WalletPage/Wallet.module.scss";
import MenuBurger from "../MenuBurger/MenuBurger.jsx";
import CategoryCard from "./CategoryCard.jsx";
import InitialCategoryes from "./InitialCategoryes.jsx";
import incomeImg from "/src/assets/CategoryCard/Income.svg"
import expensesImg from "/src/assets/CategoryCard/Expenses.svg"
import transfersImg from "/src/assets/CategoryCard/Transfers.svg"
import budgetImg from "/src/assets/CategoryCard/Budget.svg"

const cardsData = [  //FIXME Img LINKS
    { category: "Accounting", description: "Income", img: incomeImg, link: "/accounting/income" },
    { category: "Accounting", description: "Expenses", img: expensesImg, link: "/accounting/expenses" },
    { category: "Accounting", description: "Transfers", img: transfersImg, link: "/accounting/income" },
    { category: "Accounting", description: "Budget", img: budgetImg, link: "/accounting/income" },
    { category: "Accounting", description: "Loans", img:'', link: "/accounting/income" },
    { category: "Accounting", description: "Obligations", img:'', link: "/accounting/income" },
    { category: "Accounting", description: "Assets", img:'', link: "/accounting/income" },
    { category: "Accounting", description: "Goals", img:'', link: "/accounting/income" },
    { category: "System", description: "Export", img:'', link: "/system/export" },
    { category: "System", description: "Bot", img:'', link: "/system/bot" },
];

const InitialWalletView = () => {
    const [selectedItem, setSelectedItem] = useState(0);
    const handleSelect = (index)=>{
        setSelectedItem(index)
    }

    const filteredCards = cardsData.filter(card => {
        if (selectedItem === 0) return true;
        if (selectedItem === 1 && card.category === "Accounting") return true;
        return selectedItem === 2 && card.category === "System";

    });
    return (
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
            <div className={styles.categoryCardContainer} > {/*FIXME*/}
                <InitialCategoryes cards={filteredCards}/>
            </div>
        </div>
    );
};

export default InitialWalletView;