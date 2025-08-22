export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'sweets' | 'namkeens' | 'festival';
  isFeatured: boolean;
}


