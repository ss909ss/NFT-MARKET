import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContenxt";
import { INft } from "../types/NFT";
import { useNavigate, useParams } from "react-router";

interface NFTContextType {
    name: string;
    description: string;
    price: number;
    auctionEndTime: string;
    // collection: string;
    image: string | File | null;
    updateNFT: (
        id: string,
        name: string,
        description: string,
        price: number,
        auctionEndTime: string,
        image: string | null,
        // collection: string
    ) => Promise<void>;
    fetchGetNftData: (id: string) => Promise<void>
}

const UpdateNftContext = createContext<NFTContextType | null>(null);

export const UpdateNftProvider = ({ children }: { children: React.ReactNode }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [auctionEndTime, setAuctionEndTime] = useState("");
    const [image, setImage] = useState<File | string>("");
    // const [collection, setColletion] = useState("");
    const { token } = useAuth();
    const { id } = useParams();
    console.log(id)
    const navigate = useNavigate();





    const fetchGetNftData = async (id: string): Promise<void> => {
        if (!token) {
            alert("You have not token");
        }

        try {
            const response = await axios.get(`https://nft-market-as0q.onrender.com/nfts/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = response.data.data;
            console.log(response.data)
            console.log(data)

            if(response.status === 200){
navigate(`/editNft/${id}`)
            }

            setName(data.name || "");
            setDescription(data.description || "");
            setPrice(data.price || 0);
            setAuctionEndTime(data.auctionEndTime || "");
            setImage(data.image || "");
            // setColletion(data.collection || "");

        } catch (error) {
            console.error("Error fetching NFT data:", error);

        }
    };


    // Вызываем fetchGetNftData при изменении token или id
    useEffect(() => {
        if (id) {
            fetchGetNftData(id);
        }

    }, [token, id]);



    const updateNFT = async (
        id: string,
        name: string,
        description: string,
        price: number,
        auctionEndTime: string,
        image: string | null,
        // collection: string
    ) => {

        if(!token || !id){
            alert("error")
        }
        

        try {
            const response = await axios.put<INft>(
                `https://nft-market-as0q.onrender.com/nfts/${id}`,
                {
                    name,
                    description,
                    price,
                    auctionEndTime,
                    image, // передаём Base64-строку, если сервер ожидает именно её
                    // collection,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            // Обновляем данные в контексте, если сервер возвращает обновлённые данные в response.data.data
            const data = response.data.data;
            if(response.status === 200){
                navigate("/profile")
            }
            console.log(response.data)
            console.log(data)

            setName(data?.name);
            setDescription(data?.description);
            setPrice(data?.price);
            setAuctionEndTime(data?.auctionEndTime);
            setImage(data?.image);
            // setColletion(data.collection);
        } catch (error) {
            console.error("Error updating NFT:", error);
        }
    };


    return (
        <UpdateNftContext.Provider
            value={{
                name,
                description,
                price,
                auctionEndTime,
                image,
                // collection,
                updateNFT,
                fetchGetNftData
            }}
        >
            {children}
        </UpdateNftContext.Provider>
    );
};

export const useNft = () => {
    const context = useContext(UpdateNftContext);
    if (!context) throw new Error("useNft must be used within an UpdateNftProvider");
    return context;
};
