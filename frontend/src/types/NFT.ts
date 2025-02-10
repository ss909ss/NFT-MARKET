
export interface INft {
    data:any;
    _id: string;
    name: string;
    description: string;
    price: number;
    auctionEndTime: string;
    likes: string[]; // Исправлено! Теперь это массив строк
    creator: string;
    image: string;
    __v: number;
  }
  