import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    senderWalletId: { type: String, required: true },  // ID кошелька отправителя
    receiverWalletId: { type: String, required: true },  // ID кошелька получателя
    amount: { type: Number, required: true },
    type: { type: String, enum: ['transfer', 'deposit', 'withdrawal'], required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },  // Статус транзакции
});
  
const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;