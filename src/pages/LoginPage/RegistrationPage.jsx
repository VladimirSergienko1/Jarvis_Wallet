import styles from './RegistrationPage.module.scss'
import info from "../../assets/LoginPage/Info.svg";
import backBtn from "../../assets/LoginPage/button_register_background.svg";
import requiredIcon from "../../assets/LoginPage/required.svg";
import errorIcon from "../../assets/LoginPage/Error_round.svg";
import correctIcon from "../../assets/LoginPage/Done_round.svg";
import CustomSelect from "./CustomSelect.jsx";
import {useState} from "react";
import {Link} from "react-router-dom";

const RegistrationPage = () =>{
    const options = [
        { value: 'eng', label: 'English' },
        { value: 'ru', label: 'Russian' },
        { value: 'kz', label: 'Kazakh' },
    ];
    const [selectedOption, setSelectedOption] = useState({ value: 'eng', label: 'English' });
    const [name, setName] = useState('');
    const [nameDirty, setNameDirty] = useState(false);
    const [nameError, setNameError] = useState('Name field is required');
    const [nameIcon, setNameIcon] = useState();
    const [email, setEmail] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [emailError, setEmailError] = useState('Email field is required');
    const [emailIcon, setEmailIcon] = useState();
    const [password, setPassword] = useState('');
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [passwordError, setPasswordError] = useState('Password field is required');
    const [passwordIcon, setPasswordIcon] = useState();
    const [rePassword, setRePassword] = useState('');
    const [rePasswordDirty, setRePasswordDirty] = useState(false);
    const [rePasswordError, setRePasswordError] = useState('Repeat password field is required');
    const [rePasswordIcon, setRePasswordIcon] = useState();


    const nameHandler = (e) =>{
        setName(e.target.value);
        if(e.target.value.length < 3 || e.target.value.length > 8){
            setNameError('Name should be < 3 > 8');
            setNameIcon(errorIcon)
            setNameDirty(true)
        }
        else {
            setNameError('');
            setNameIcon(correctIcon)
            setNameDirty(false)
        }
    }
    const blurHandler = (e)=>{
        switch (e.target.name) {
            case 'name':
                setNameDirty(true);

                break;
            default:
                break;
        }
    }


    const onSubmit = (e) =>{
        e.preventDefault();
        if (name.length === 0){
            setNameError('Name field is required');
            setNameIcon(errorIcon);
            setNameDirty(true);
        }
        if (email.length === 0){
            setEmailError('Email field is required');
            setEmailIcon(errorIcon);
            setEmailDirty(true);
        }

        const data = new FormData(e.target);
        console.log(Object.fromEntries(data.entries()))

    }


    return(
        <div className={styles.registration_page}>
            <div className={styles.registration_page__container}>
                <img src={info} alt="Info"/>
                <div className={styles.reg_block}>
                    <form className={styles.reg_form} onSubmit={onSubmit}>
                        <p className={styles.reg_title}>New user</p>
                        <label htmlFor={'name_input'} className={styles.reg_label_required}>Name</label>
                        <div className={styles.input_container}>
                            <input
                                name={'name'}
                                onBlur={blurHandler}
                                id={'name_input'}
                                className={styles.reg_input}
                                value={name}
                                onChange={nameHandler}
                            />
                            {(nameError && nameDirty) && <p className={styles.error_text}>{nameError}</p>}
                            <img className={styles.error_img} src={nameIcon}/>

                        </div>
                        <label htmlFor={'email_input'} className={styles.reg_label_required}>Email</label>
                        <div className={styles.input_container}>
                            <input
                                id={'email_input'}
                                className={styles.reg_input}
                                name={'Email'}
                            />
                            {(emailError && emailDirty) && <p className={styles.error_text}>{emailError}</p>}
                            <img className={styles.error_img} src={emailIcon}/>

                        </div>
                        <label htmlFor={'phone_input'} className={styles.reg_label}>Phone number</label>
                        <div className={styles.input_container}>
                            <input id={'phone_input'}
                                   className={styles.reg_input}
                                   name={'Phone'}
                            />
                            <img className={styles.error_img} src={correctIcon}/>

                        </div>
                        <label htmlFor={'pass_input'} className={styles.reg_label_required}>Password</label>
                        <div className={styles.input_container}>
                            <input id={'pass_input'} className={styles.reg_input} />
                            <p className={styles.error_text}>Error</p>
                            <img className={styles.error_img} src={errorIcon}/>
                        </div>
                        <label htmlFor={'repass_input'} className={styles.reg_label_required}>Password again</label>
                        <div className={styles.input_container}>
                            <input id={'repass_input'} className={styles.reg_input} />
                            <p className={styles.error_text}>Error</p>
                            <img className={styles.error_img} src={correctIcon}/>

                        </div>

                        <label htmlFor={'language_input'} className={styles.reg_label}>Language</label>
                        <CustomSelect
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={options}
                        />

                        <div className={styles.reg_footer}>
                            <Link to={'/login'}>
                             <div className={styles.reg_back}>
                                 <img  src={backBtn} alt={'back_button'}/>
                             </div>
                            </Link>

                            <button className={styles.reg_button} type={"submit"} >Continue</button>
                        </div>
                    </form>

                </div>

            </div>

        </div>
    )

}

export default RegistrationPage