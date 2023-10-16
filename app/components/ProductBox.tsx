/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

// context
import { useContext } from 'react';
import { CartContext } from './CartContext';
import { CartContextType } from '../types';

// components
import CartIcon from './icons/CartIcon';
import Button from './Button';

interface ProductBoxProps {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
}

const ProductWrapper = styled.div``;

const WhiteBox = styled.div`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  &:hover {
    cursor: pointer
  }

  img {
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  color: inherit;
  text-decoration: none;
  margin: 0;
`;

const ProductInfoBox = styled.div`
  margin-top: 15px;
  @media screen and (min-width: 768px) {
    margin-top: 10px;
  }
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 600;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ProductBox: React.FC<ProductBoxProps> = ({
  _id,
  title,
  description,
  price,
  images,
}) => {
  const router = useRouter();

  const url = `/products/${_id}`;

  const { addProduct } = useContext(CartContext) as CartContextType;

  return (
    <ProductWrapper>
      <WhiteBox
        onClick={() => {
          router.push(url);
        }}
      >
        <div>
          <img src={images.length > 0 ? images[0] : ''} alt='' />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <Button $primary $outline onClick={() => addProduct(_id)}>
            {/* <CartIcon /> */}
            Add to cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
};

export default ProductBox;
