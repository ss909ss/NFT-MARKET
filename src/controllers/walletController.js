import Wallet from '../models/FinancialSchema/Wallet.models.js';
import Transaction from '../models/FinancialSchema/Transaction.models.js';
import client from '../config/redis.js';
import producer from '../../kafkaClient.js';
import User from '../models/UserSchema/User.models.js';
// Получение информации о кошельке пользователя
async function getWallet(req,res) {
    try {
        const cacheKey = `wallet:${req.user.id}`;
        const cachedWallet = await client.get(cacheKey);
        if(cachedWallet) {
            return res.status(200).json({data:JSON.parse(cachedWallet)});
        }

        const wallet =await Wallet.findOne({user:req.user.id});
        if(!wallet) {
            return res.status(404).json({ message: 'Wallet is not found!' });
        }

        await client.set(cacheKey,JSON.stringify(wallet),{EX:600});
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

          // Ищем пользователя по кошельку получателя
        const receiverUser = await User.findOne({ _id: receiverWallet.user }); // Ищем по ID пользователя, связанного с кошельком
        if (receiverUser) {
            console.log('Receiver user found:', receiverUser.username); // Логируем информацию о пользователе

            // Добавляем уведомление о переводе
            receiverUser.walletTransfers.push({
                amount: amount,
                timestamp: new Date(),
            });

            // Сохраняем обновленного пользователя
            await receiverUser.save();
            console.log('User updated with transfer message');
        } else {
            console.log('Receiver user not found for walletId:', receiverWalletId);
        }

        // Отправляем сообщение в Kafka
        const message = {
            topic: 'wallet-transfers',
            messages: JSON.stringify({
                transactionId: transaction.id,
                senderWalletId: senderWallet.walletId,
                receiverWalletId: receiverWallet.walletId,
                amount,
            }),
        };

        producer.send([message], (err, data) => {
            if (err) {
                console.error('Error sending message to Kafka:', err);
            } else {
                console.log('Message sent to Kafka:', data);
            }
        });

        await transaction.save();

        res.status(200).json({ message: 'Transaction is successfull!', transaction });
    } catch (err) {
        res.status(500).json({message:"Error in transferFunds controller",error:err});
    }
}

export {getWallet,transferFunds};