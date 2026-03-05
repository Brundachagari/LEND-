import React, { createContext, useContext, useMemo, useState } from 'react';

export type Listing = {
  id: string;
  title: string;
  price: number;
  size: string;
  condition: string;
  description: string;
  imageUrl?: string; // legacy mock remote image
  photos?: string[]; // local uploaded photo URIs
  category: string;
  sellerId: string;
};

export type Review = {
  id: string;
  authorName: string;
  rating: number; // 1-5
  text: string;
};

export type UserProfile = {
  id: string;
  name: string;
  school: string;
  rating: number; // 0-5
  reviewCount: number;
  reviews: Review[];
};

type ListingsContextValue = {
  listings: Listing[];
  featuredListings: Listing[];
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  filteredListings: Listing[];
  addListing: (payload: Omit<Listing, 'id'>) => void;
  likedIds: string[];
  toggleLike: (id: string) => void;
  users: Record<string, UserProfile>;
  currentUser: UserProfile;
};

const ListingsContext = createContext<ListingsContextValue | undefined>(undefined);

const USERS: Record<string, UserProfile> = {
  seller_1: {
    id: 'seller_1',
    name: 'Maya',
    school: 'Stanford',
    rating: 4.8,
    reviewCount: 132,
    reviews: [
      { id: 'r1', authorName: 'Ava', rating: 5, text: 'So sweet + fast pickup. Item was perfect.' },
      { id: 'r2', authorName: 'Jules', rating: 5, text: 'Exactly as described, would rent again.' },
      { id: 'r3', authorName: 'Nina', rating: 4, text: 'Great quality, friendly owner.' },
    ],
  },
  seller_2: {
    id: 'seller_2',
    name: 'Sofia',
    school: 'UCLA',
    rating: 4.6,
    reviewCount: 78,
    reviews: [
      { id: 'r4', authorName: 'Lily', rating: 5, text: 'Love it!! Came in super clean.' },
      { id: 'r5', authorName: 'Emma', rating: 4, text: 'Cute piece and easy meetup.' },
    ],
  },
  buyer_1: {
    id: 'buyer_1',
    name: 'You',
    school: 'Your campus',
    rating: 5,
    reviewCount: 12,
    reviews: [
      { id: 'r6', authorName: 'Maya', rating: 5, text: 'Quick responder + on time for pickup.' },
      { id: 'r7', authorName: 'Sofia', rating: 5, text: 'Smooth transaction!' },
    ],
  },
};

const INITIAL_LISTINGS: Listing[] = [
  {
    id: '1',
    title: 'Vintage denim jacket',
    price: 32,
    size: 'M',
    condition: 'Gently used',
    description: 'Oversized fit, perfect for fall walks between classes.',
    imageUrl:
      'https://images.pexels.com/photos/769730/pexels-photo-769730.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Tops',
    sellerId: 'seller_1',
  },
  {
    id: '2',
    title: 'Campus hoodie',
    price: 18,
    size: 'L',
    condition: 'Like new',
    description: 'Soft fleece hoodie with university logo.',
    imageUrl:
      'https://images.pexels.com/photos/769732/pexels-photo-769732.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Hoodies',
    sellerId: 'seller_1',
  },
  {
    id: '3',
    title: 'White sneakers',
    price: 40,
    size: '9',
    condition: 'Good',
    description: 'Comfortable everyday sneakers, lightly worn.',
    imageUrl:
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Shoes',
    sellerId: 'seller_2',
  },
  {
    id: '4',
    title: 'Black straight-leg pants',
    price: 24,
    size: 'S',
    condition: 'Like new',
    description: 'Clean, minimal pants that work for class or a night out.',
    imageUrl:
      'https://images.pexels.com/photos/769733/pexels-photo-769733.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Pants',
    sellerId: 'seller_2',
  },
  {
    id: '5',
    title: 'Tote bag',
    price: 12,
    size: 'One size',
    condition: 'Gently used',
    description: 'Canvas tote fits a laptop, notebook, and water bottle.',
    imageUrl:
      'https://images.pexels.com/photos/3738085/pexels-photo-3738085.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Accessories',
    sellerId: 'seller_1',
  },
];

type ListingsProviderProps = {
  children: React.ReactNode;
};

export function ListingsProvider({ children }: ListingsProviderProps) {
  const [listings, setListings] = useState<Listing[]>(INITIAL_LISTINGS);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const currentUser = USERS.buyer_1;

  const categories = useMemo(() => {
    const unique = Array.from(new Set(listings.map((l) => l.category)));
    return ['All', ...unique];
  }, [listings]);

  const featuredListings = useMemo(() => listings.slice(0, 4), [listings]);

  const filteredListings = useMemo(() => {
    if (!selectedCategory || selectedCategory === 'All') return listings;
    return listings.filter((l) => l.category === selectedCategory);
  }, [listings, selectedCategory]);

  const addListing = (payload: Omit<Listing, 'id'>) => {
    setListings((current) => [
      {
        ...payload,
        id: String(Date.now()),
      },
      ...current,
    ]);
  };

  const toggleLike = (id: string) => {
    setLikedIds((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id],
    );
  };

  const value: ListingsContextValue = {
    listings,
    featuredListings,
    categories,
    selectedCategory,
    setSelectedCategory,
    filteredListings,
    addListing,
    likedIds,
    toggleLike,
    users: USERS,
    currentUser,
  };

  return <ListingsContext.Provider value={value}>{children}</ListingsContext.Provider>;
}

export function useListings() {
  const ctx = useContext(ListingsContext);
  if (!ctx) {
    throw new Error('useListings must be used within a ListingsProvider');
  }
  return ctx;
}

