import s from './Create.module.scss';
// import fileUploadIcon from '../../assets/upload field.png';
import plusIcon from '../../assets/plusIcon.svg';
import nft from "../../assets/MultipleNft.png"
import removeIcon from '../../assets/removeIcon.png'
import axios, { AxiosError } from 'axios'
import { useState } from 'react';
import { useAuth } from '../../context/authContenxt';
import { IAddNft } from '../../types/NftType';
// import { usePostAddNftMutation } from '../../store/api/AddNfts';




//на видео открытие инпута для чек боксов

const Create = () => {
    const { token } = useAuth(); // Get token from context
    const [isChecked, setIsChecked] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [data, setData] = useState<IAddNft>({
        name: "",
        description: "",
        price: 0,
        auctionEndTime: null, // Дата теперь хранится как объект Date
        collection: "",
    });


    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
    
        if (name === "auctionEndTime") {
            const localDate = new Date(value);  // Создаем объект Date из значения ввода
            const utcDate = new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate()));  // Конвертируем в UTC
            setData((prevData) => ({
                ...prevData,
                auctionEndTime: utcDate,  // Устанавливаем в стейт дату в UTC
            }));
        } else {
            setData((prevData) => ({ ...prevData, [name]: value }));
        }
    };
    



    const handleCheckeCheckbox = () => {
        setIsChecked(!isChecked);
    };

    const handleCollectionSelect = (collectionName: string) => {
        setData((prevData) => ({
            ...prevData,
            collection: collectionName,
        }));
    };

    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!data.name || !data.description || !data.price || !data.auctionEndTime || !data.collection) {
            alert("Please fill in all fields!");
            return;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price.toString());

        if (data.auctionEndTime) {
            formData.append("auctionEndTime", data.auctionEndTime.toISOString()); // Гарантируем UTC-формат
        }


        formData.append("collection", data.collection);
        console.log("FormData before sending:", data);

        if (image) {
            const base64Image = await readImageAsBase64(image);
            formData.append("image", base64Image);
        }

        sendFormData(formData);
    };

    const readImageAsBase64 = (imageFile: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result as string);
            };
            reader.onerror = () => {
                reject("Error reading image file.");
            };
            reader.readAsDataURL(imageFile);
        });
    };


    const sendFormData = async (formData: FormData) => {
        if (!token) {
            alert("No token found! You need to be logged in.");
            return;
        }

        try {
            const response = await axios.post(
                "https://nft-market-as0q.onrender.com/nfts",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Use token here

                    },
                }
            );
            console.log("Data sent successfully:", response.data);
            if (response.data.success) {
                setImage(null);
                setData({
                    name: "",
                    description: "",
                    price: 0,
                    auctionEndTime: null,
                    collection: "",
                });
            }
        } catch (e) {
            if (e instanceof AxiosError) {
                console.error('Error sending data:', e.response ? e.response.data : e.message);
            } else {
                console.error('Unknown error:', e);
            }
            alert("There was an error sending your data.");
        }
    };


   
   


    return (
        <section className={s.createPage}>
            <div className={s.container}>
                <form onSubmit={onSubmitHandler} className={s.createPageContent}>
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

                            <input
                                type="file"
                                onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                                className={s.fileInput}
                            />
                        </div>
                        <h2 className={s.uploadDetails}>Item Details</h2>
                        <div className={s.detailsBlock}>
                            <label htmlFor="name"  >ITEM NAME</label>
                            <input
                                onChange={onChangeHandler}
                                value={data.name}
                                type="text"
                                name='name'
                                id='name'
                                placeholder='e. g. "Redeemable Bitcoin Card with logo"'
                                className={s.detailsFiled}

                            />
                        </div>

                        <div className={s.detailsBlock}>
                            <label htmlFor="description" >DESCRIPTION</label>
                            <input
                                onChange={onChangeHandler}
                                value={data.description}
                                type="text"
                                name='description'
                                id='description'
                                placeholder='e. g. “After purchasing you will able to recived the logo...”'
                                className={s.detailsFiled}
                            />
                        </div>

                        <span className={s.line}></span>

                        <div className={s.detailsInfo}>

                            <label htmlFor="start">Choose Date</label>
                            <input
                                type="date"
                                id="start"
                                name="auctionEndTime"
                                value={data.auctionEndTime ? data.auctionEndTime.toISOString().split("T")[0] : ""} // Преобразуем в формат YYYY-MM-DD
                                onChange={onChangeHandler}
                                min="2025-02-09"
                                max="2030-02-09"
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
                            <input
                                onChange={onChangeHandler}
                                value={data.price}
                                type="number" placeholder="Enter price" name='price' className={s.detailsCheckedInput} />
                        )}



                        <div className={s.detailsCollection}>
                            <h3 className={s.collectionTitle}>Choose collection</h3>
                            <p className={s.collectionSubtitle}>Choose an exiting collection or create a new one</p>

                            <div className={s.detailsCollections}>
                                <div className={s.collection} onClick={() => handleCollectionSelect("Create collection")}>
                                    <img src={plusIcon} alt="" />
                                    <p className={s.collectionCrypto}>Create collection</p>
                                </div>

                                <div className={s.collection} onClick={() => handleCollectionSelect("Crypto Legend - Professor")}>
                                    <img src={plusIcon} alt="icon" />
                                    <p className={s.collectionCrypto}>Crypto Legend - Professor</p>
                                </div>

                                <div className={s.collection} onClick={() => handleCollectionSelect("Legend Photography")}>
                                    <img src={plusIcon} alt="icon" />
                                    <p className={s.collectionCrypto}>Legend Photography</p>
                                </div>

                                <div className={s.collection} onClick={() => handleCollectionSelect("Crypto Legend - Professor")}>
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
                            <img
                                src={image ? URL.createObjectURL(image) : nft}
                                alt="uploaded-preview"
                                className={s.previeImg}
                            />
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
                </form>
            </div>
        </section>
    )
}

export default Create
