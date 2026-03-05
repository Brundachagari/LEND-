import React, { createContext, useContext, useMemo, useState } from 'react';

export type Listing = {
  id: string;
  title: string;
  price: number;
  size: string;
  condition: string;
  description: string;
  imageUrl?: string;
  category: string;
};

type ListingsContextValue = {
  listings: Listing[];
  featuredListings: Listing[];
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  filteredListings: Listing[];
  addListing: (payload: Omit<Listing, 'id'>) => void;
};

const ListingsContext = createContext<ListingsContextValue | undefined>(undefined);

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
  },
];

type ListingsProviderProps = {
  children: React.ReactNode;
};

export function ListingsProvider({ children }: ListingsProviderProps) {
  const [listings, setListings] = useState<Listing[]>(INITIAL_LISTINGS);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

  const value: ListingsContextValue = {
    listings,
    featuredListings,
    categories,
    selectedCategory,
    setSelectedCategory,
    filteredListings,
    addListing,
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

