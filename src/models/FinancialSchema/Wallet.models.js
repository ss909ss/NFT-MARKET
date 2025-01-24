import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },  // Уникальный кошелек для каждого пользователя
    walletId: { type: String, required: true, unique: true, default: () => generateUniqueWalletId() }, // Генерация уникального ID для кошелька
    balance: { type: Number, default: 100 },
    currency: { type: String, default: 'BTC' },
  }, {
    timestamps: true  // Добавление меток времени для кошелька
});
  
  // Функция для генерации уникального ID кошелька
function generateUniqueWalletId() {
    return `wallet-${Math.random().toString(36).substr(2, 9)}`;
}
  
const Wallet = mongoose.model('Wallet', walletSchema);

export default Wallet;