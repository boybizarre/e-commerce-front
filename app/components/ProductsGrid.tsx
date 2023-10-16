'use client';

import styled from 'styled-components';

// components
import ProductBox from './ProductBox';

import { ProductType } from '../types';

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

interface NewProductsProps {
  products: ProductType[];
}

const ProductsGrid: React.FC<NewProductsProps> = ({ products }) => {
  return (
    <StyledProductsGrid>
      {products?.length > 0 &&
        products.map((product: ProductType) => (
          <ProductBox key={product._id} {...product} />
        ))}
    </StyledProductsGrid>
  );
};

export default ProductsGrid;
