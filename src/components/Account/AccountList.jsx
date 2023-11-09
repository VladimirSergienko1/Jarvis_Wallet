import React from 'react';
import Account from "./Account.jsx";
import {useSelector} from "react-redux";

const AccountList = () => {
    const accounts = useSelector((state) => state.user.userAccounts);

    console.log(accounts)
    return (
        <div >
            {accounts?.map(({ name, id, ico_id }) => (
                <div key={id}>
                    <Account name={name} id={id} ico_id={ico_id}/>
                </div>
            ))}
        </div>
    );
};

export default AccountList;