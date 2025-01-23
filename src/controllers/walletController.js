import Wallet from '../models/FinancialSchema/Wallet.models.js';
import Transaction from '../models/FinancialSchema/Transaction.models.js';

// Получение информации о кошельке пользователя
async function getWallet(req,res) {
    try {
        const wallet =await Wallet.findOne({user:req.user.id});
        if(!wallet) {
            return res.status(404).json({ message: 'Wallet is not found!' });
        }
        res.status(200).json(wallet);
    } catch (err) {
        res.status(500).json({message:"Error in getWallet controller",error:err});
    }
}

// Перевод средств между кошельками
async function transferFunds(req,res) {
    try {
        const {receiverWalletId,amount} = req.body;
        const senderWallet = await Wallet.findOne({user:req.user.id});
        if(!senderWallet) {
            return res.status(404).json({ message: 'Your wallet is not found!' });
        }

        if(senderWallet.balance < amount) {
            return res.status(400).json({ message: 'Not enough money on your wallet!' });
        }

        const receiverWallet = await Wallet.findOne({walletId:receiverWalletId});
        if(!receiverWallet) {
            return res.status(404).json({ message: 'Receiver wallet is not found' });
        }

        senderWallet.balance -= amount;
        receiverWallet.balance += amount;

        await senderWallet.save();
        await receiverWallet.save();

        const transaction = new Transaction({
            senderWalletId: senderWallet.walletId,
            receiverWalletId: receiverWallet.walletId,
            amount,
            type: 'transfer',
        });

        await transaction.save();

        res.status(200).json({ message: 'Transaction is successfull!', transaction });
    } catch (err) {
        res.status(500).json({message:"Error in transferFunds controller",error:err});
    }
}

export {getWallet,transferFunds};