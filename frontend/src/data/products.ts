export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  inStock: boolean
  rating: number
  reviews: number
  weight?: string
  origin?: string
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Basmati Rice',
    description: 'Aged premium basmati rice with long grains and aromatic fragrance. Perfect for biryanis and pulao.',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80',
    category: 'Grains & Rice',
    inStock: true,
    rating: 4.8,
    reviews: 124,
    weight: '1 kg',
    origin: 'India'
  },
  {
    id: '2',
    name: 'Organic Turmeric Powder',
    description: 'Pure organic turmeric with high curcumin content. Natural anti-inflammatory and antioxidant properties.',
    price: 89,
    originalPrice: 120,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&q=80',
    category: 'Spices',
    inStock: true,
    rating: 4.9,
    reviews: 89,
    weight: '250g',
    origin: 'India'
  },
  {
    id: '3',
    name: 'Fresh Paneer (Cottage Cheese)',
    description: 'Farm-fresh paneer made from pure buffalo milk. Soft, creamy texture perfect for curries and snacks.',
    price: 159,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&q=80',
    category: 'Dairy',
    inStock: true,
    rating: 4.7,
    reviews: 156,
    weight: '400g',
    origin: 'India'
  },
  {
    id: '4',
    name: 'Kashmiri Red Chili Powder',
    description: 'Authentic Kashmiri red chili powder with vibrant color and mild heat. Perfect for tandoori dishes.',
    price: 129,
    originalPrice: 169,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80',
    category: 'Spices',
    inStock: true,
    rating: 4.6,
    reviews: 78,
    weight: '200g',
    origin: 'Kashmir, India'
  },
  {
    id: '5',
    name: 'Organic Ghee',
    description: 'Traditional clarified butter made from grass-fed cow milk. Rich aroma and nutty flavor.',
    price: 349,
    originalPrice: 449,
    image: 'https://images.unsplash.com/photo-1601134897898-31d6859af5c3?w=800&q=80',
    category: 'Dairy',
    inStock: true,
    rating: 4.9,
    reviews: 234,
    weight: '500ml',
    origin: 'India'
  },
  {
    id: '6',
    name: 'Fresh Farm Vegetables Box',
    description: 'Seasonal mix of fresh organic vegetables including tomatoes, onions, potatoes, spinach, and more.',
    price: 249,
    image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=800&q=80',
    category: 'Vegetables',
    inStock: true,
    rating: 4.5,
    reviews: 92,
    weight: '3 kg',
    origin: 'Local Farms'
  },
  {
    id: '7',
    name: 'Cardamom Pods (Green Elaichi)',
    description: 'Premium green cardamom pods with intense aroma. Perfect for chai, biryanis, and desserts.',
    price: 199,
    originalPrice: 249,
    image: 'https://images.unsplash.com/photo-1563823251941-b9989d1e8d97?w=800&q=80',
    category: 'Spices',
    inStock: true,
    rating: 4.8,
    reviews: 67,
    weight: '50g',
    origin: 'Kerala, India'
  },
  {
    id: '8',
    name: 'Toor Dal (Split Pigeon Peas)',
    description: 'Premium quality toor dal, naturally grown and stone-ground. Essential for sambar and dal fry.',
    price: 139,
    image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=800&q=80',
    category: 'Pulses',
    inStock: true,
    rating: 4.7,
    reviews: 145,
    weight: '1 kg',
    origin: 'India'
  },
  {
    id: '9',
    name: 'Alphonso Mango Pulp',
    description: 'Pure Alphonso mango pulp with no preservatives. Perfect for milkshakes, desserts, and lassi.',
    price: 179,
    originalPrice: 229,
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&q=80',
    category: 'Canned & Preserved',
    inStock: true,
    rating: 4.9,
    reviews: 189,
    weight: '850g',
    origin: 'Ratnagiri, India'
  },
  {
    id: '10',
    name: 'Assam Tea (Premium Blend)',
    description: 'Strong and malty Assam tea leaves. Perfect morning tea with rich color and flavor.',
    price: 119,
    originalPrice: 159,
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&q=80',
    category: 'Beverages',
    inStock: true,
    rating: 4.6,
    reviews: 112,
    weight: '250g',
    origin: 'Assam, India'
  },
  {
    id: '11',
    name: 'Organic Jaggery (Gur)',
    description: 'Pure organic jaggery made from sugarcane juice. Natural sweetener rich in minerals.',
    price: 99,
    image: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&q=80',
    category: 'Sweeteners',
    inStock: true,
    rating: 4.7,
    reviews: 88,
    weight: '1 kg',
    origin: 'India'
  },
  {
    id: '12',
    name: 'Fresh Coconuts (Pack of 2)',
    description: 'Fresh tender coconuts with sweet water and soft malai. Naturally hydrating.',
    price: 79,
    image: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=800&q=80',
    category: 'Fresh Produce',
    inStock: true,
    rating: 4.5,
    reviews: 203,
    weight: '2 pieces',
    origin: 'South India'
  }
]

export const categories = [
  { name: 'All', slug: 'all' },
  { name: 'Grains & Rice', slug: 'grains-rice' },
  { name: 'Spices', slug: 'spices' },
  { name: 'Dairy', slug: 'dairy' },
  { name: 'Vegetables', slug: 'vegetables' },
  { name: 'Pulses', slug: 'pulses' },
  { name: 'Beverages', slug: 'beverages' },
  { name: 'Fresh Produce', slug: 'fresh-produce' },
]
