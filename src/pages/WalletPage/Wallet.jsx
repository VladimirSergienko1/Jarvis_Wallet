import styles from "./Wallet.module.scss";
import PlusIcon from "../../assets/WalletsPage/plus_icon.svg";
import wallet from "../../assets/WalletsPage/wallet.svg";
import {useEffect, useState} from "react";
import MenuBurger from "../../components/MenuBurger/MenuBurger.jsx";
import AccountModal from "../../components/Account/AccountModal.jsx";
import acc_img from '../../assets/Account/acc_img.svg'
import rightArrow from '../../assets/Account/rightArrow.svg'
import {checkAuth, getAccountList} from "../../features/user/userSlice.js";
import {useDispatch, useSelector} from "react-redux";
import AccountList from "../../components/Account/AccountList.jsx";
import InitialWalletView from "../../components/Wallet/InitialWalletView.jsx";
import AccountWalletView from "../../components/Account/AccountWalletView.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {RotatingLines} from "react-loader-spinner";

const Wallet = () =>{
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.user.accountsLoading);
    const accounts = useSelector((state) => state.user.userAccounts);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        dispatch(checkAuth())
    }, []);

/*    useEffect(() => {
        dispatch(checkAuth())
    }, [dispatch]);*/

    useEffect(() => {
        dispatch(getAccountList())
    }, []);

    const [accountModalVisible, setAccountModalVisible] = useState(false)
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);

    const openAccModal = ()=>{
        setAccountModalVisible(!accountModalVisible)
        setIsOverlayVisible(true)
    }

    const handleOverlay = () =>{
        setAccountModalVisible(false)
        setIsOverlayVisible(false)
    }

    useEffect(() => {
        const currentPath = location.pathname;
        if (currentPath === '/main/account/create') {
            setAccountModalVisible(true);
            setIsOverlayVisible(true);
        }
    }, [location]);



    return(
        <>
        <div className={styles.wallet_page}> {/*FIXME Убрать/дл styles.wallet_page из mainLayout*/}
            <div className={styles.wallet__container} style={{overflowY:'auto'}}>
                <div className={styles.container_header}>
                    <h2 className={styles.header_title}>Accounts</h2>
                    <img src={PlusIcon} onClick={openAccModal} style={{cursor: 'pointer'}} alt={'plusIcon'}/>
                    <AccountModal accountModalVisible={accountModalVisible} isOverlayVisible={isOverlayVisible} handleOverlay={handleOverlay} />
                </div>
                <div className={styles.container_body}>
                    <input className={styles.body_input}/>
                    {!accounts.length ? (<div className={styles.body_empty}>
                        <img className={styles.empty_image} src={wallet}/>
                         <h2 className={styles.empty_title}>No wallets available</h2>
                    </div>)
                    :
                    <AccountList/>
                        }
                </div>
            </div>
            {isLoading ?  (<div style={{display:'flex', justifyContent:'center',alignItems:'center', width:'inherit'}}>
                    <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="96"
                    visible={true}
                /></div>
                ) : location.pathname === '/main' ? <InitialWalletView/> : <AccountWalletView/>}
        </div>
        </>
    )
}

export default Wallet