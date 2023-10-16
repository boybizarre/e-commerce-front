/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// components
import Header from '@/app/components/Header';
import Title from '@/app/components/Title';
import Center from '@/app/components/Center';
import WhiteBox from '@/app/components/WhiteBox';
import { CartContextType, ProductType } from '@/app/types';
import ProductImages from '@/app/components/ProductImages';
import CartIcon from '@/app/components/icons/CartIcon';
import Button from '@/app/components/Button';
import { CartContext } from '@/app/components/CartContext';

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
`;

interface PageParams {
  productId: string;
}

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  @media screen and (min-width: 768px) {
  }
`;

const Price = styled.span`
  font-size: 1.4rem;
`;

const SingleProductPage = ({ params }: { params: PageParams }) => {
  const [product, setProduct] = useState<ProductType>();

  const { addProduct } = useContext(CartContext) as CartContextType;

  useEffect(() => {
    axios.get(`/api/products?id=${params.productId}`).then((res) => {
      setProduct(res.data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  // console.log(params);
  // console.log(product);
  console.log(product?.images[0]);

  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product?.images} title={product?.title} />
          </WhiteBox>
          <div>
            <Title>{product?.title}</Title>
            <p>{product?.description}</p>
            <PriceRow>
              <div>
                <Price>${product?.price}</Price>
              </div>
              <div>
                <Button
                  $primary
                  onClick={() => addProduct(product?._id as string)}
                >
                  <CartIcon />
                  Add to cart
                </Button>
              </div>
            </PriceRow>
          </div>
        </ColWrapper>
      </Center>
    </>
  );
};

export default SingleProductPage;
