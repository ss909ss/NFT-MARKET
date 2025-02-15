import s from "./OneItem.module.scss";
import { useEffect, useState } from "react";
import { setCategory } from "../../store/peopleCategorySlice/peopleCategorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { INft } from "../../types/NFT";
import editIcon from "../../assets/editIcon.svg";
import addIcon from "../../assets/addIcon.svg";
import heart from "../../assets/heart.svg";
import redHert from "../../assets/red-heart.png";
import binIcon from "../../assets/bin.svg";
import { useAuth } from "../../context/authContenxt";
import { useFavorites } from "../../context/favorites";
import { useInfo } from "../../context/UserInfo";
import { useNft } from "../../context/nftContext";
import ModalBid from "../../components/modalBid/modalBid";
import ModalAuction from "../../components/ModalAuction/ModalAuction";
import ModalToken from "../../components/ModalToken/ModalToken";
import { toast } from "react-toastify";

interface ICategoryData {
  id: string;
  category: string;
  assignment: string;
  name: string;
}

interface IReduxState {
  people: {
    activeCategory: string;
    data: ICategoryData[];
  };
}

const OneItem: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [nftData, setNft] = useState<INft | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { activeCategory, data } = useSelector((state: IReduxState) => state.people);
  const { token } = useAuth();
  const { addFavorite, getFavorites, removeFavorite } = useFavorites();
  const navigate = useNavigate();
  const { avatar, username, userId } = useInfo();
  const currentBid = localStorage.getItem("newBidPrice");
  const bidder = localStorage.getItem("bidder");
  const {
    isOpenModalAuction,
    setIsOpenModalAuction,
    fetchGetNftAuction,
    price,
    _id,
    auctionEndTime,
    isOpenBidAuction,
    setIsOpenBidAuction,
    isOpenBuyModal,
    setIsOpenBuyModal,
    fetchGetNftData,
  } = useNft();

  const nft = _id;
  const startingPrice = price;
  const endTime = auctionEndTime;

  useEffect(() => {
    const fetchNftDetail = async () => {
      try {
        const response = await axios.get(`https://nft-market-as0q.onrender.com/nfts/${id}`);
        setNft(response.data.data);
      } catch (error) {
        console.error("Error fetching NFT detail:", error);
      }
    };

    if (id) {
      fetchNftDetail();
    }
  }, [id]);

  useEffect(() => {
    const favoritesImage = getFavorites();
    setIsFavorite(favoritesImage.some((fav) => fav._id === id));
  }, [id, getFavorites]);

  const handleClick = async () => {
    if (!token) {
      navigate("/register");
      return;
    }

    try {
      if (isFavorite) {
        const response = await axios.post(
          `https://nft-market-as0q.onrender.com/nfts/${id}/unlike`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 200 && id) {
          removeFavorite(id);
          toast.success("You removed from favorite");
        }
        setNft(response.data.data);
      } else {
        const response = await axios.post(
          `https://nft-market-as0q.onrender.com/nfts/${id}/like`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 200) {
          addFavorite(response.data);
          toast.success("You add this NFT to favorite");
        }
      }
    } catch (error) {
      console.error("Error when updating favorites:", error);
    }
  };

  const handleDeleteNft = async () => {
    if (!token) {
      alert("You don't have a token");
      return;
    }

    if (!id) {
      console.error("NFT ID not found");
      return;
    }

    try {
      const response = await axios.delete(
        `https://nft-market-as0q.onrender.com/nfts/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        removeFavorite(id);
        toast.error("You successful delete this NFT");
        navigate("/profile");
      }
      setNft(response.data.data);
    } catch (error) {
      console.error("Error when updating favorites:", error);
    }
  };

  const filteredDataByCategory = data.filter(
    (item) => item.category === activeCategory && item.assignment === "Owner"
  );

  const creatorsData = data.filter((item) => item.assignment === "Creator");

  const handleCategoryClick = (category: string) => {
    dispatch(setCategory(category));
  };

  const handleAddBid = () => {
    if (!token) {
      alert("You have not token");
    }

    try {
      setIsOpenBidAuction(true);
    } catch (e) {
      alert(e);
    }
  };

  const handleBuyNft = () => {
    if (!token) {
      alert("You have not token");
    }
    try {
      setIsOpenBuyModal(true);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <section className={`${s.oneItem} ${s.container}`}>
      <img src={nftData?.image} alt={nftData?.name} className={s.oneItem__image} />
      <div className={s.oneItem__info}>
        <h1>{nftData?.name}</h1>
        <div className={s.pricesAndStock}>
          <div className={s.discover__card__price}>{nftData?.price} BTC</div>
          <div className={s.pricesAndStock__inStock}>10 in stock</div>
        </div>
        <div className={s.oneItem__desc}>
          This NFT Card will give you Access to Special Airdrops. To learn more about UI8 please visit <br />
          <a
            className={s.oneItem__desc__link}
            target="_blank"
            rel="noopener noreferrer"
            href="https://ui8.net"
          >
            https://ui8.net
          </a>
        </div>
        <div className={s.peopleFilter}>
          <div className={s.catogories}>
            {["Info", "Owners", "History", "Bids"].map((category) => (
              <div
                key={category}
                className={`${s.category} ${activeCategory === category ? s.active : ""}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </div>
            ))}
          </div>
          <div className={s.filterResult}>
            {filteredDataByCategory.map((item) => (
              <div key={item.id} className={s.filterResult__item}>
                <div className={s.avatarWrapper}>
                  <img src={avatar} alt="Avatar" className={s.avatar} />
                </div>
                <div className={s.peopleInfo}>
                  <div className={s.assignment}>{item.assignment}</div>
                  <div className={s.name}>{item.name}</div>
                </div>
              </div>
            ))}
            <div className={s.creatorSection}>
              {creatorsData.map((item) => (
                <div key={item.id} className={s.filterResult__item}>
                  <div className={s.avatarWrapper}>
                    <img src={avatar} alt="Avatar" className={s.avatar} />
                  </div>
                  <div className={s.peopleInfo}>
                    <div className={s.assignment}>{item.assignment}</div>
                    <div className={s.name}>{item.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={s.highestBid}>
          <div className={s.highestBid__head}>
            <img src={avatar} alt="" />
            <div className={s.bidInfo}>
              <div className={s.bidInfo__head}>
                Highest bid by <span className={s.name}>{username && userId === bidder ? username : username}</span>
              </div>
              <div className={s.bidInfo__price}>
                <span className={s.ethereum}>{currentBid} BTC</span>
              </div>
            </div>
          </div>
          <div className={s.highestBid__buttons}>
            <button className={s.button_blue} onClick={handleBuyNft}>Purchase now</button>
            <button className={s.button_dark} onClick={handleAddBid} type="button">Place a bid</button>
          </div>
          <div className={s.highestBid__bottom}>
            <span>Service fee</span>
            <span className={s.whiteText}>1.5%</span>
            <span>{currentBid} ETH</span>
          </div>
        </div>
      </div>
      <div className={s.buttons}>
        <button className={s.buttons__button} onClick={() => id && fetchGetNftAuction(id)}>
          <img src={addIcon} alt="" className={s.addBudAuction} />
        </button>
        <button className={s.buttons__button} onClick={handleDeleteNft}>
          <img src={binIcon} alt="" className={s.deleteIcon} />
        </button>
        <button className={s.buttons__button} onClick={handleClick}>
          <img src={isFavorite ? redHert : heart} alt="" />
        </button>
        <button className={s.buttons__button} onClick={() => id && fetchGetNftData(id)}>
          <img src={editIcon} alt="" className={s.editIcon} />
        </button>
      </div>

      {isOpenModalAuction && (
        <ModalAuction
          isOpen={isOpenModalAuction}
          onClose={() => setIsOpenModalAuction(false)}
          nft={nft}
          startingPrice={startingPrice}
          endTime={endTime}
        />
      )}
      {isOpenBidAuction && (
        <ModalBid
          isOpenBidAuction={isOpenBidAuction}
          onClose={() => setIsOpenBidAuction(false)}
          startingPrice={startingPrice}
        />
      )}
      {isOpenBuyModal && (
        <ModalToken isOpenBuyModal={isOpenBuyModal} onClose={() => setIsOpenBuyModal(false)} />
      )}
    </section>
  );
};

export default OneItem;