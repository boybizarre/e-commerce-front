'use client';

import React, { useState, useEffect } from 'react';

// components
import Header from '../components/Header';
import Center from '../components/Center';
import ProductsGrid from '../components/ProductsGrid';
import Title from '../components/Title';

import axios from 'axios';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('/api/products')
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  return (
    <>
      <Header />
      <Center>
        <Title>All Products</Title>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
};

export default ProductsPage;
