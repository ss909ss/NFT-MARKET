import  { createContext, useState, useContext, ReactNode } from 'react';
// Интерфейс NFT
interface NFT {
    image: string;
    name: string;
    price: number;
    _id: string;
  }
  
  // Интерфейс для контекста
  interface FavoritesContextType {
    favorites: NFT[];
    addFavorite: (nft: NFT) => void;
    removeFavorite: (nftId: string) => void;
    getFavorites: () => NFT[];
  }
  
  const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);
  
  // Хук для использования контекста
  export const useFavorites = (): FavoritesContextType => {
    const context = useContext(FavoritesContext);
    if (!context) {
      throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
  };
  
  // Провайдер контекста
  export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
    // Загружаем избранные NFT из localStorage при инициализации
    const [favorites, setFavorites] = useState<NFT[]>(() => {
      const storedFavorites = localStorage.getItem("favorites");
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    });
  
    // Функция для добавления NFT в избранное
    const addFavorite = (nft: NFT) => {
      setFavorites((prevFavorites) => {
        if (prevFavorites.some((item) => item._id === nft._id)) {
          return prevFavorites; // NFT уже есть, не добавляем
        }
        const updatedFavorites = [...prevFavorites, nft];
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Сохраняем в localStorage
        return updatedFavorites;
      });
    };
  
    // Функция для удаления NFT из избранного
    const removeFavorite = (nftId: string) => {
      setFavorites((prevFavorites) => {
        const updatedFavorites = prevFavorites.filter((item) => item._id !== nftId);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Обновляем localStorage
        return updatedFavorites;
      });
    };
  
    // Функция для извлечения всех избранных NFT
    const getFavorites = () => favorites;
  
    return (
      <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, getFavorites }}>
        {children}
      </FavoritesContext.Provider>
    );
  };
  