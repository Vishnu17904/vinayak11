import { Product } from '@/contexts/CartContext';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Gulab Jamun',
    description: 'Soft, spongy, and soaked in aromatic sugar syrup. Made with fresh khoya and cardamom.',
    price: 450,
    image: 'https://images.slurrp.com/prod/articles/1m5e86yy5vl.webp',
    category: 'sweets'
  },
  {
    id: '2',
    name: 'Kaju Katli',
    description: 'Diamond-shaped cashew fudge, delicately flavored and topped with silver leaf.',
    price: 1200,
    image: 'https://images.healthshots.com/healthshots/en/uploads/2024/10/30172142/kaju-katli-sweets.jpg',
    category: 'sweets'
  },
  {
    id: '3',
    name: 'Spicy Mixture',
    description: 'Crispy blend of sev, peanuts, and spices. Perfect tea-time companion.',
    price: 320,
    image: 'https://i.etsystatic.com/27709875/r/il/496452/3225156947/il_1140xN.3225156947_1s9e.jpg',
    category: 'namkeens'
  },
  {
    id: '4',
    name: 'Rasgulla',
    description: 'Soft, spongy cottage cheese balls in light sugar syrup. A Bengali classic.',
    price: 380,
    image: 'https://wallpaperaccess.com/full/8980236.jpg',
    category: 'sweets'
  },
  {
    id: '5',
    name: 'Rasmalai',
    description: 'Soft paneer discs in creamy, cardamom-flavored milk.',
    price: 480,
    image: 'http://dresseskhazana.com/wp-content/uploads/2017/06/eid-recipe-rasmilai.jpeg',
    category: 'sweets'
  },
  {
    id: '6',
    name: 'Motichoor Laddu',
    description: 'Golden spheres of gram flour, perfectly sweetened.',
    price: 420,
    image: 'https://www.awesomecuisine.com/wp-content/uploads/2008/08/Motichoor-Ladoo.jpg',
    category: 'sweets'
  },
  {
    id: '7',
    name: 'Bhujia',
    description: 'Fine gram flour noodles with aromatic spices.',
    price: 280,
    image: 'https://i.pinimg.com/originals/b4/97/62/b49762329343b7634101c17ab1a0e647.jpg',
    category: 'namkeens'
  },
  {
    id: '8',
    name: 'RakshaBandhan Special Box',
    description: 'Assorted sweets perfect for festival celebrations.',
    price: 850,
    image: 'https://i.pinimg.com/originals/b1/fd/8f/b1fd8ffedfaedaad70030dc881882e62.jpg',
    category: 'festival'
  },
  {
    id: '9',
    name: 'Jalebi',
    description: 'Crispy spirals soaked in saffron-infused syrup.',
    price: 360,
    image: 'https://www.sugarspicenmore.com/wp-content/uploads/2022/04/Jalebi.jpg',
    category: 'sweets'
  },
  {
    id: '10',
    name: 'Mathri',
    description: 'Flaky, crispy crackers with cumin and carom seeds.',
    price: 220,
    image: 'http://2.bp.blogspot.com/-FxYqMMfoW8c/UFxwbMKjNjI/AAAAAAAAF5Q/cDcs_OjV2fQ/s1600/mathri-22.jpg',
    category: 'namkeens'
  }
];

export const featuredProducts = products.slice(0, 4);