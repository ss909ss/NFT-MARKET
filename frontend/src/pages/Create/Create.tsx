import s from './Create.module.scss';
import fileUploadIcon from '../../assets/upload field.png';
import plusIcon from '../../assets/plusIcon.svg';
import nft from "../../assets/MultipleNft.png"
import removeIcon from '../../assets/removeIcon.png';
import { useState } from 'react';




//на видео открытие инпута для чек боксов
const Create = () => {
    const [isSaleChecked, setIsSaleChecked] = useState(true);
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckeCheckbox = () => {
        setIsChecked(!isChecked)
    }
    return (
        <section className={s.createPage}>
            <div className={s.container}>
                <div className={s.createPageContent}>
                    <div className={s.leftContent}>
                        <div className={s.contentTop}>
                            <p className={s.contentTitle}>Create single collectible</p>
                            <button type='button' className={s.switchButton}>
                                Switch to Multiple
                            </button>
                        </div>
                        <h2 className={s.uploadTitle}>Upload file</h2>
                        <p className={s.uploadContenttTitle}>Drag or choose your file to upload</p>

                        <div className={s.uploadContent}>
                            <img src={fileUploadIcon} alt="" className={s.uploadZone} />
                        </div>
                        <h2 className={s.uploadDetails}>Item Details</h2>
                        <div className={s.detailsBlock}>
                            <label htmlFor="name"  >ITEM NAME</label>
                            <input type="text" name='name' id='name' placeholder='e. g. "Redeemable Bitcoin Card with logo"' className={s.detailsFiled} />
                        </div>

                        <div className={s.detailsBlock}>
                            <label htmlFor="description" >DESCRIPTION</label>
                            <input type="text" name='description' id='description' placeholder='e. g. “After purchasing you will able to recived the logo...”' className={s.detailsFiled} />
                        </div>

                        <span className={s.line}></span>

                        <div className={s.detailsInfo}>
                            <div className={s.detailsInfoLeft}>
                                <h3>Put on sale</h3>
                                <p>You’ll receive bids on this item</p>
                            </div>
                            <input
                                type="checkbox"
                                className={s.detailsInfoField}
                                checked={isSaleChecked}
                                onChange={() => setIsSaleChecked(!isSaleChecked)}

                            />

                        </div>

                        <div className={s.detailsInfo}>
                            <div className={s.detailsInfoLeft}>
                                <h3>Instant sale price</h3>
                                <p>Enter the price for which the item will be instantly sold</p>
                            </div>
                            <input type="checkbox" className={s.detailsInfoField} onChange={handleCheckeCheckbox}
                                checked={isChecked} />
                        </div>
                        {isChecked && (
                            <input type="number" placeholder="Enter price" className={s.detailsCheckedInput} />
                        )}


                        {/* <div className={s.detailsInfo}>
                            <div className={s.detailsInfoLeft}>
                                <h3>Choose a date</h3>
                                <p>Content will be delete from </p>
                            </div>

                            <input type="checkbox" className={s.detailsInfoField} />


                        </div> */}
                        <div className={s.detailsCollection}>
                            <h3 className={s.collectionTitle}>Choose collection</h3>
                            <p className={s.collectionSubtitle}>Choose an exiting collection or create a new one</p>

                            <div className={s.detailsCollections}>
                                <div className={s.collection}>
                                    <img src={plusIcon} alt="" />
                                    <p className={s.collectionCrypto}>Create collection</p>
                                </div>

                                <div className={s.collection}>
                                    <img src={plusIcon} alt="icon" />
                                    <p className={s.collectionCrypto}>Crypto Legend - Professor</p>
                                </div>

                                <div className={s.collection}>
                                    <img src={plusIcon} alt="icon" />
                                    <p className={s.collectionCrypto}>Legend Photography</p>
                                </div>

                                <div className={s.collection}>
                                    <img src={plusIcon} alt="icon" />
                                    <p className={s.collectionCrypto}>Crypto Legend - Professor</p>
                                </div>
                            </div>

                            <button type='submit' className={s.createNft}>
                                Create item
                            </button>
                        </div>

                    </div>
                    <div className={s.rightContent}>
                        <div className={s.rightBlock}>
                            <h3 className={s.previewTitle}>Preview</h3>
                            <img src={nft} alt="" className={s.previeImg} />
                            <div className={s.nftPreviewInfo}>
                                <p className={s.nftTitle}>NFT TITLE</p>
                                <p className={s.nftPrice}>2.45 ETH</p>
                            </div>
                            <button type='button' className={s.nftDeleteButton}>
                                <img src={removeIcon} alt="remove-icon" className={s.removeIcon} />
                                Clear all
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Create
