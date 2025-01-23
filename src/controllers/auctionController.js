import Auction from "../models/NFTSchema/Auction.models.js";
import NFT from "../models/NFTSchema/NFT.models.js";
import mongoose from 'mongoose';
import client from '../config/redis.js';

// Создание нового аукциона
async function createAuction(req, res) {
    const { nft, startingPrice, endTime } = req.body; // Изменено на startingPrice и nft
    try {
        // Проверяем, является ли nft корректным ObjectId
        if (!mongoose.Types.ObjectId.isValid(nft)) {
            return res.status(400).json({ message: 'Invalid NFT ID' });
        }

        // Проверяем, существует ли NFT
        const nftItem = await NFT.findById(nft);
        if (!nftItem) {
            return res.status(404).json({ message: 'NFT is not found' });
        }

        // Создаем аукцион
        const newAuction = new Auction({
            nft,
            startingPrice,
            currentBid: startingPrice, // Устанавливаем начальную цену как текущую ставку
            endTime,
            seller: req.user.id, // Убедись, что req.user корректно передается
        });

        // Сохраняем в базе данных
        await newAuction.save();
        res.status(201).json(newAuction);
    } catch (err) {
        res.status(500).json({ message: 'Error in createAuction controller', error: err.message });
    }
}

// Получение списка всех активных аукционов
async function getAllAuctions(req, res) {
    try {
        const cacheddata = await client.get('allauctions');
        if(cacheddata) {
            return res.json({ data: JSON.parse(cacheddata) });
        }
        const auctions = await Auction.find().populate('nft');
        await client.set('allauctions', JSON.stringify(auctions), { EX: 600 }); // Добавляем время жизни 600 секунд

        res.status(200).json(auctions);
    } catch (err) {
        res.status(500).json({ message: 'Error in getAllAuctions controller', error: err });
    }
}

// Получение информации о конкретном аукционе
async function getAuction(req, res) {
    try {
        const auctionId = req.params.id;
        const cachedAuction = await client.get(`auction:${auctionId}`);
        if (cachedAuction) {
            return res.status(200).json({data:JSON.parse(cachedAuction)});
        }
        const auction = await Auction.findById(auctionId).populate('nft');
        if(!auction) {
            return res.status(404).json({ message: 'Auction is not found' });
        }

        await client.set(`auction:${auctionId}`,JSON.stringify(auction),{EX:600});
        res.status(200).json(auction);
    } catch (err) {
        res.status(500).json({ message: 'Error in getAuction controller', error: err });
    }
}

// Ставка на аукцион
async function bidOnAuction(req, res) {
    const { bidAmount } = req.body;
    try {
        const auction = await Auction.findById(req.params.id);
        if (!auction) {
            return res.status(404).json({ message: 'Auction is not found' });
        }
        if (auction.auctionEndTime < new Date()) {
            return res.status(400).json({ message: 'Auction is over' });
        }

        if (bidAmount <= auction.currentBid) {
            return res.status(400).json({ message: 'The bid amount must be higher than the current bid' });
        }

        // Обновляем текущую цену аукциона
        auction.currentBid = bidAmount;

        // Добавляем ставку в массив bids
        auction.bids.push({
            bidder: req.user.id,  // Добавляем идентификатор пользователя, который ставит ставку
            amount: bidAmount,
        });

        // Сохраняем изменения
        await auction.save();
        res.status(200).json(auction);
    } catch (err) {
        res.status(500).json({ message: 'Error in bidOnAuction controller', error: err });
    }
}

// Получение топ-ставок и лучших продавцов
async function getTopBids(req, res) {
    try {
      const auctions = await Auction.find()
        .sort({ currentBid: -1 })
        .limit(5)
        .populate('nft')
        .populate('seller');
      
      res.status(200).json(auctions);
    } catch (err) {
      res.status(500).json({ message: 'Error in get Top Bids', error: err });
    }
}

export {createAuction, getAllAuctions, getAuction, bidOnAuction, getTopBids};