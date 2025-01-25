import kafka from 'kafka-node'; 
import User from './src/models/UserSchema/User.models.js';
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: 'kafka:9093' }); // Имя сервиса для Docker
const consumer = new Consumer(
    client,
    [
        { topic: 'auction-bids', partition: 0 },
        { topic: 'nft-likes', partition: 0 },
        { topic: 'wallet-transfers', partition: 0 }
    ],
    {
        autoCommit: true,
        fromOffset: 'earliest'
    }
);


consumer.on('message', async (message) => {
    console.log('Received message:', message);
    
    try {
        const parsedMessage = JSON.parse(message.value);
        console.log('Парсинг прошел успешно:', parsedMessage);
        
    
        switch (message.topic) {
            case 'auction-bids':
                handleAuctionBid(parsedMessage);
                break;
            case 'nft-likes':
                handleNftLike(parsedMessage);
                break;
            case 'wallet-transfers':
                handleWalletTransfer(parsedMessage);
                break;
            default:
                console.log('Unknown topic:', message.topic);
            }
    } catch (err) {
        console.error('Error parsing message:', err);
    }
});

    



consumer.on('error', (err) => {
    console.error('Error in Kafka Consumer:', err);
});

consumer.on('offsetOutOfRange', (err) => {
    console.error('Offset out of range:', err);
});

// Функции обработки сообщений
// Функции обработки сообщений
function handleAuctionBid(data) {
    console.log('Handling auction bid:', data);
    // Логика для обработки ставки на аукцион
}

function handleNftLike(data) {
    console.log('Handling NFT like:', data);
    // Логика для обработки лайков на NFT
}

function handleWalletTransfer(data) {
    console.log('Handling wallet transfer:', data);
    // Логика для обработки перевода средств
}

export default consumer;


