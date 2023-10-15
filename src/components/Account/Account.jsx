import styles from "../Profile/Profile.module.scss";
import profileImg from "../../assets/Profile/profile_image.svg";
import Input from "react-phone-number-input/input-min";
import CustomSelect from "../../pages/LoginPage/CustomSelect.jsx";
import gridImg from "../../assets/Profile/grid_image.svg";

const Account = ()=>{
return(
    <>
        {isOverlayVisible && <div className={styles.overlay} onClick={handleOverlay}></div>}
        <div className={styles.profile__container}>
            <div className={styles.profile__header}>
                <h2 className={styles.profile_header_title}>Profile</h2>
                <ul className={styles.profile__header_list}>
                    <li className={selectedItem===0 ? styles.profile__list_item_selected : styles.profile__list_item}
                        onClick={()=>setSelectedItem(0)}>Information</li>
                    <li className={selectedItem===1 ? styles.profile__list_item_selected : styles.profile__list_item}
                        onClick={()=>setSelectedItem(1)}>Security</li>
                    <li className={selectedItem===2 ? styles.profile__list_item_selected : styles.profile__list_item}
                        onClick={()=>setSelectedItem(2)}>Subscriptions</li>
                </ul>
            </div>
            {(!isAvatarOpen && selectedItem === 0) && <div className={styles.profile__container_block}>
                <div className={styles.block_image} onClick={handleAvatarMenu}>
                    <img src={profileImg}/>
                </div>
                <form className={styles.block_form} onSubmit={formik.handleSubmit}>
                    <div className={styles.input_container}>
                        <label htmlFor={'name_input'} className={styles.reg_label}>Name</label>

                        <input
                            id="name_input"
                            name="name"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            className={styles.reg_input}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <p className={styles.error_text}>{formik.errors.name}</p>
                        )}
                    </div>
                    <div className={styles.input_container}>
                        <label htmlFor={'email_input'} className={styles.reg_label}>Email</label>
                        <input
                            id="email_input"
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className={styles.reg_input}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className={styles.error_text}>{formik.errors.email}</p>
                        )}
                    </div>
                    <div className={styles.input_container}>
                        <label htmlFor={'phone_input'} className={styles.reg_label}>Phone number</label>
                        <Input
                            className={styles.reg_input}
                            id="phone_input"
                            name="phone"
                            onChange={value => formik.setFieldValue('phone', value)}
                            onBlur={() => formik.setFieldTouched('phone')}

                        />
                        {formik.touched.phone && formik.errors.phone && (
                            <p className={styles.error_text}>{formik.errors.phone}</p>
                        )}
                    </div>
                    <div className={styles.input_container}>
                        <label className={styles.reg_label}>Language</label>
                        <CustomSelect
                            defaultValue={selectedOption}
                            onChange={handleLanguageChange}
                            options={options}
                        />
                    </div>
                    <button className={styles.reg_button} type={"submit"}>Continue</button>
                </form>
            </div>}

            {/*Change Password BLOCK*/}
            {(!isDeleteModalOpen && selectedItem === 1) && <div className={styles.change_password_container_block}>
                <form className={styles.block_form} onSubmit={formik.handleSubmit}>
                    <div className={styles.form_content}>
                        <div className={styles.block_form_title}>Change password</div>
                        <div className={styles.input_container}>
                            <label htmlFor={'email_input'} className={styles.reg_label}>Password</label>
                            <input
                                id="pass_input"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                className={styles.reg_input}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <p className={styles.error_text}>{formik.errors.password}</p>
                            )}
                        </div>
                        <div className={styles.input_container}>
                            <label htmlFor={'email_input'} className={styles.reg_label}>Email</label>
                            <input
                                id="repass_input"
                                name="rePassword"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.rePassword}
                                className={styles.reg_input}
                            />
                            {formik.touched.rePassword && formik.errors.rePassword && (
                                <p className={styles.error_text}>{formik.errors.rePassword}</p>
                            )}
                        </div>
                    </div>
                    <div className={styles.reg_footer}>
                        <button className={styles.footer_back} type="button" onClick={()=>handleDeleteModal()}>Delete account</button>
                        <button className={styles.footer_button_save} type={"submit"}>Save</button>
                    </div>
                </form>
            </div>}

            {/*DELETE ACC BLOCK*/}
            {(selectedItem === 1 && isDeleteModalOpen) && <div className={styles.change_password_container_block}>
                <form className={styles.block_form} onSubmit={formik.handleSubmit}>
                    <div className={styles.form_content}>
                        <div className={styles.block_deletion_title}>After deleting your account, all your data including your account will disappear.</div>
                        <div className={styles.input_container}>
                            <label htmlFor={'email_input'} className={styles.reg_label}>Password</label>
                            <input
                                id="pass_input"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                className={styles.reg_input}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <p className={styles.error_text}>{formik.errors.password}</p>
                            )}
                        </div>
                    </div>
                    <div className={styles.reg_footer}>
                        <button className={styles.avatar_back} type="button" onClick={()=>handleDeleteModal()}>Back</button>
                        <button className={styles.footer_back} type={"submit"}>Delete account</button>
                    </div>
                </form>
            </div>}

            {/*AVATAR BLOCK OPENS WHEN PROFILE ICON CLICKED*/}
            {isAvatarOpen &&
                selectedItem === 0 && <div className={styles.profile__container_block}>
                    <div className={styles.block_image} onClick={handleAvatarMenu}>
                        <img src={profileImg}/>
                    </div>
                    <form className={styles.avatar_form} onSubmit={formik.handleSubmit}>
                        <div className={styles.avatar_block_title}>Choose an avatar</div>
                        <div className={styles.avatar_grid}>
                            {Array(16).fill(null).map((_, index) => (
                                <div
                                    key={index}
                                    className={`${styles.grid_item} ${index === activeIndex ? styles.active : ''}`}
                                    onClick={() => handleGridItemClick(index)}
                                >
                                    <img src={gridImg} alt={`grid-item-${index}`} />
                                </div>
                            ))}
                        </div>
                        <div className={styles.avatar_footer}>
                            <button className={styles.avatar_back} onClick={handleAvatarMenu} type="button">Back</button>
                            <button className={styles.avatar_button} type={"submit"} >Continue</button>
                        </div>
                    </form>
                </div>}

            {(selectedItem === 2 ) && <div className={styles.subscription__container}>
                <div className={styles.subscription_info}>
                    <div className={styles.subscription__row} >
                        <p className={styles.subscription__label}>Type</p>
                        <p className={styles.subscription__label}>Base</p>
                        <p className={styles.subscription__label}>Current subscription</p>
                        <p className={styles.subscription__label}>Days until the end 24</p>
                    </div>
                    <div className={styles.subscription__row}>
                        <p className={styles.subscription__label}>Time period</p>
                        <p className={styles.subscription__label}>1 month</p>
                        <div className={styles.subscription__line}>
                            <div
                                className={styles.subscription__progress}
                                style={{ width: `${passedDaysPercentage}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
                <div className={styles.history_container}>
                    <h2 className={styles.history_title}>History</h2>
                    <div className={styles.history_row}>
                        <p className={styles.row_label}>Id</p>
                        <p className={styles.row_label}>Type</p>
                        <p className={styles.row_label}>From</p>
                        <p className={styles.row_label}>To</p>
                        <p className={styles.row_label}>Status</p>
                    </div>
                    <div className={styles.history_list} >
                        <div className={styles.history_item} >
                            <span>6</span>
                            <span>Base</span>
                            <span>12.06.2023</span>
                            <span>12.07.2023</span>
                            <span>Completed</span>
                        </div>
                        <div className={styles.history_item} >
                            <span>6</span>
                            <span>Base</span>
                            <span>12.06.2023</span>
                            <span>12.07.2023</span>
                            <span>Completed</span>
                        </div>
                        <div className={styles.history_item} >
                            <span>6</span>
                            <span>Base</span>
                            <span>12.06.2023</span>
                            <span>12.07.2023</span>
                            <span>Completed</span>
                        </div>
                        <div className={styles.history_item} >
                            <span>6</span>
                            <span>Base</span>
                            <span>12.06.2023</span>
                            <span>12.07.2023</span>
                            <span>Completed</span>
                        </div>
                        <div className={styles.history_item} >
                            <span>6</span>
                            <span>Base</span>
                            <span>12.06.2023</span>
                            <span>12.07.2023</span>
                            <span>Completed</span>
                        </div>
                        <div className={styles.history_item} >
                            <span>6</span>
                            <span>Base</span>
                            <span>12.06.2023</span>
                            <span>12.07.2023</span>
                            <span>Completed</span>
                        </div>

                    </div>
                </div>

            </div>}
        </div>
    </>
)
}
export default Account