'use client';
import styled from 'styled-components';
import { ProductType } from '../types';

// components
import Center from './Center';
import ProductsGrid from './ProductsGrid';

interface NewProductsProps {
  products: ProductType[];
}

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight; normal
`;

const NewProducts: React.FC<NewProductsProps> = ({ products }) => {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid products={products} />
    </Center>
  );
};

export default NewProducts;
