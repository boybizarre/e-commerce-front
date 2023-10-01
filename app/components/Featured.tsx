/* eslint-disable @next/next/no-img-element */
'use client';

import styled from 'styled-components';

import Button from './Button';
import ButtonLink from './ButtonLink';
import Center from './Center';
import CartIcon from './icons/CartIcon';

import { ProductType, CartContextType } from '../types';
import { useContext } from 'react';
import { CartContext } from './CartContext';

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 40px;
  img {
    max-width: 100%;
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

interface FeaturedProps {
  product: ProductType;
}

const Featured: React.FC<FeaturedProps> = ({ product }) => {
  // consume the values from react context here
  const { addProduct } = useContext(CartContext) as CartContextType;
  
  const addFeaturedToCart = () => {
    addProduct(product._id);
  };

  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Desc>{product.description}</Desc>
              <ButtonsWrapper>
                <ButtonLink href={`/products/${product._id}`} $outline $white>
                  Read more
                </ButtonLink>
                <Button $white onClick={addFeaturedToCart}>
                  <CartIcon />
                  Add to cart
                </Button>
              </ButtonsWrapper>
            </div>
          </Column>
          <Column>
            <img
              src='https://utfs.io/f/ba58d3c8-050b-4f60-8695-4ddb120c3fca-imq2fq.png'
              alt=''
            />
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
};

export default Featured;
