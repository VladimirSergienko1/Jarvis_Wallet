import React from 'react';
import CategoryCard from "./CategoryCard.jsx";
import incomeImg from "/src/assets/CategoryCard/Income.svg"
import expensesImg from "/src/assets/CategoryCard/Expenses.svg"
import transfersImg from "/src/assets/CategoryCard/Transfers.svg"
import budgetImg from "/src/assets/CategoryCard/Budget.svg"
const InitialCategoryes = ({cards}) => {
    return (
        <>
            {cards.map((card, index) => (
                <CategoryCard key={card.description} {...card} />
            ))}
        </>
    );
};

export default InitialCategoryes;