'use client';

import React, { createContext, useState, useEffect } from 'react';

// create the context here
export const CartContext = createContext({});

export const CartContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // defining the local storage here
  const ls = typeof window !== 'undefined' ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState<string[]>([]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addProduct = (productId: string) => {
    setCartProducts((prev) => [...prev, productId]);
  };

  const removeProduct = (productId: string) => {
    setCartProducts((prev: string[]) => {
      const position = prev.indexOf(productId);
      if (position !== -1) {
        return prev.filter(
        // filter out all the products where the "index" does not match the "position"
          (value: string, index: number) => index !== position
        );
      }

      return prev;
    });
  };

  const clearCart = () => {
    setCartProducts([])
    ls?.clear();
  }

  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct, removeProduct, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
