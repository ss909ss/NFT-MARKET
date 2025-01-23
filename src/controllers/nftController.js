import NFT from '../models/NFTSchema/NFT.models.js';
import Auction from '../models/NFTSchema/Auction.models.js';
import client from '../config/redis.js';

// Получение списка всех NFT с фильтрацией
async function getAllNFTs(req,res) {
    const {price,auctionEndTime,likes} = req.query;
    try {
        const filter = {};
        if (price) filter.price = { $lte: price };
        if (auctionEndTime) filter.auctionEndTime = { $lte: new Date(auctionEndTime) };
        if (likes) filter.likes = { $gte: likes };

        const cacheKey = `allNFTs:${price || 'none'}:${auctionEndTime || 'none'}:${likes || 'none'}`;
        const cachedNFTs = await client.get(cacheKey);
        if (cachedNFTs) {
            return res.status(200).json({ data: JSON.parse(cachedNFTs) });
        }
        
        const nfts = await NFT.find(filter);

        await client.set(cacheKey, JSON.stringify(nfts), { EX: 600 });
        res.status(200).json(nfts);
    } catch (err) {
        res.status(500).json({ message: 'Error in getAllNFTs controller', error: err });
    }
}

// Получение информации о конкретном NFT
async function getNFT(req,res) {
    try {
        const nftId = req.params.id;
        const cachedNft = await client.get(`nft:${nftId}`);
        if(cachedNft) {
            return res.status(200).json({data:JSON.parse(cachedNft)});
        }
        const nft = await NFT.findById(nftId);
        if(!nft) {
            return res.status(404).json({ message: 'NFT is not found' });
        }

        await client.set(`nft:${nftId}`,JSON.stringify(nft),{EX:600});
        res.status(200).json(nft);
    } catch (err) {
        res.status(500).json({ message: 'Error in getNFT controller', error: err });
    }
}

// Создание нового NFT
async function createNFT(req, res) {
    const { name, description, price, auctionEndTime, image, collection } = req.body; // Убираем title
    try {
        // Проверяем, переданы ли обязательные поля
        if (!name || !price || !auctionEndTime) {
            return res.status(400).json({ message: 'Name, price, and auctionEndTime are required fields.' });
        }

        // Создаем новый объект NFT
        const newNFT = new NFT({
            name,
            description,
            price,
            auctionEndTime,
            image,
            collection,
            creator: req.user?.id || null, // ID текущего пользователя как creator
        });

        // Сохраняем NFT в базу данных
        await newNFT.save();

        res.status(201).json(newNFT);
    } catch (err) {
        res.status(500).json({ message: 'Error in createNFT controller', error: err.message });
    }
}


// Обновление информации о NFT
async function updateNFT(req,res) {
    const {name,description,price,auctionEndTime,collection,image} = req.body;
    try {
        const updatedNFT = await NFT.findByIdAndUpdate(req.params.id, { name,description, price, auctionEndTime,collection,image }, { new: true });
        if(!updatedNFT) {
            return res.status(404).json({ message: 'NFT is not found' });
        }
        res.status(200).json(updatedNFT);
    } catch (err) {
        res.status(500).json({ message: 'Error in updateNFT controller', error: err });
    }
}

// Удаление NFT
async function deleteNFT(req,res) {
    try {
        const deletedNFT = await NFT.findByIdAndDelete(req.params.id);
        if(!deletedNFT) {
            return res.status(404).json({ message: 'NFT is not found' });
        }
        res.status(200).json({message:'Delete NFT successfull!'});
    } catch (err) {
        res.status(500).json({ message: 'Error in deleteNFT controller', error: err });
    }
}

// Лайк NFT
async function likeNFT(req,res) {
    try {
        const nft = await NFT.findById(req.params.id);
        if(!nft) {
            return res.status(404).json({ message: 'NFT is not found' });
        }

        if(nft.likes.includes(req.user.id)) {
            return res.status(400).json({ message: 'You already likes this NFT!' });
        }

        nft.likes.push(req.user.id);
        await nft.save();
        res.status(200).json(nft);
    } catch (err) {
        res.status(500).json({ message: 'Error in likeNFT controller', error: err });
    }
}

// Удаление лайка с NFT
async function unlikeNFT(req,res) {
    try {
        const nft = await NFT.findById(req.params.id);
        if(!nft) {
            return res.status(404).json({ message: 'NFT is not found' });
        }

        nft.likes = nft.likes.filter(like => like.toString() !== req.user.id);
        await nft.save();
        res.status(200).json(nft);
    } catch (err) {
        res.status(500).json({ message: 'Error in unlikeNFT controller', error: err });
    }
}

export {getAllNFTs,getNFT,createNFT,updateNFT,deleteNFT,likeNFT,unlikeNFT};