'use client';

import React, { createContext, useState, useEffect } from 'react';

// create the context here
export const CartContext = createContext({});

export const CartContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // defining the local storage here
  const ls = typeof window !== 'undefined' ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState<number[]>([]);

  useEffect(() => {
    if (cartProducts?.length > 0) {
      // setting cartProducts to localStorage here
      ls?.setItem('cart', JSON.stringify(cartProducts));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartProducts]);

  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      const products = ls.getItem('cart');
      setCartProducts(JSON.parse(products ? products : ''));
    }
  }, []);

  const addProduct = (productId: number) => {
    setCartProducts((prev) => [...prev, productId]);
  };

  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct }}>
      {children}
    </CartContext.Provider>
  );
};
