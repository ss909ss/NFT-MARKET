import BreadCrumps from '../../components/BreadCrumps/BreadCrumps'
import s from './Edit.module.scss'
import avatar from '../../assets/avatar.png';
import plusIcon from '../../assets/plus.png';
import removeIcon from '../../assets/removeIcon.png'

const Edit = () => {
    return (
        <>
            <BreadCrumps />

            <section className={s.editPage}>
                <div className={s.container}>
                    <div className={s.editPageContent}>
                        <div className={s.contentTop}>
                            <h1 className={s.contentTitle}>Edit profile</h1>
                            <p className={s.contentSubtitle}>You can set preferred display name, create <span>your profile
                                URL</span> and manage other personal settings.
                            </p>
                        </div>

                        <div className={s.contentBottom}>
                            <div className={s.contentLeft}>
                                <img src={avatar} alt="Avatar" className={s.userAvater} />
                                <div className={s.userInfo}>
                                    <p className={s.userInfoTitle}>Profile photo</p>
                                    <p className={s.userInfoDescription}>We recommend an image
                                        of at least 400x400.Gifs work too 🙌</p>
                                    <button type='button' className={s.buttonUpload}>
                                        Upload
                                    </button>
                                </div>
                            </div>

                            <div className={s.contentRight}>
                                <h2 className={s.contentRightTilte}>Account info</h2>
                                <div className={s.contentRightForm}>
                                    <div className={s.formBlock}>
                                        <label htmlFor="displayName" className={s.formLabel}>
                                            DISPLAY NAME
                                        </label>
                                        <input
                                            type="text"
                                            id="displayName"
                                            name="displayName"
                                            className={s.formInput}
                                            placeholder="Enter your display name"
                                        />
                                    </div>


                                    <div className={s.formBlock}>
                                        <label htmlFor="customUrl" className={s.formLabel}>
                                            CUSTOM URL
                                        </label>
                                        <input
                                            type="text"
                                            id="customUrl"
                                            name="customUrl"
                                            className={s.formInput}
                                            placeholder="ui8.net/Your custom URL"
                                        />
                                    </div>
                                    <div className={s.formBlock}>
                                        <label htmlFor="bio" className={s.formLabel}>
                                            BIO
                                        </label>
                                        <textarea
                                            name="bio"
                                            id="bio"
                                            className={s.formBio}
                                            placeholder="About yourselt in a few words."
                                        />
                                    </div>

                                    <h2 className={s.formSocial}>Social</h2>


                                    <div className={s.formBlock}>
                                        <label htmlFor="url" className={s.formLabel}>
                                            PORTFOLIO OR WEBSITE
                                        </label>
                                        <input
                                            type="url"
                                            name="url"
                                            id="url"
                                            className={s.formInput}
                                            placeholder="Enter URL"
                                        />
                                    </div>


                                    <div className={s.formBlock}>
                                        <label htmlFor="twitter" className={s.formLabel}>
                                            TWITTER
                                        </label>
                                        <div className={s.formTwitter}>
                                            <input
                                                type="text"
                                                name="twitter"
                                                id="twitter"
                                                className={s.formInput}
                                                placeholder="@twitter_username"
                                            />
                                            <button className={s.formVerifyBtn} type="button">
                                                Verify account
                                            </button>
                                        </div>
                                    </div>

                                    <button type='button' className={s.newLink}>
                                        <img src={plusIcon} alt="Icon" className={s.newLinkIcon} />
                                        Add more social account
                                    </button>

                                    <p className={s.editDescription}>
                                        To update your settings you should sign message through your wallet. Click 'Update profile' then sign the message
                                    </p>

                                    <span className={s.editpageLine}></span>

                                    <div className={s.editButtons}>
                                        <button type='button' className={s.updateButton}>
                                        Update Profile
                                        </button>
                                        <button type='button' className={s.clearButton}>
                                            <img src={removeIcon} alt="remove-icon" className={s.removeIcon} />
                                            Clear all
                                        </button>
                                    </div>




                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default Edit
