import express from 'express';
import {connectDB} from './src/config/db.js'
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes.js';
import walletRoutes from './src/routes/walletRoutes.js';
import nftRoutes from './src/routes/nftRoutes.js';
import auctionRoutes from './src/routes/auctionRoutes.js';

dotenv.config();

const app = express();
const PORT = 5555;
connectDB();

app.use(express.json());

app.use('/auth',authRoutes);
app.use('/wallets',walletRoutes);
app.use('/nfts',nftRoutes);
app.use('/auctions',auctionRoutes);

app.get('/',(req,res) => {
    res.json('Hello from api!');
});

app.listen(PORT,(req,res) => {
    console.log(`http://localhost:${PORT}`);
});