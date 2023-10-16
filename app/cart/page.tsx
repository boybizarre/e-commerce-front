/* eslint-disable @next/next/no-img-element */
'use client';

import { FormEvent } from 'react';
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../components/CartContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// components
import Header from '../components/Header';
import Center from '../components/Center';
import Button from '../components/Button';
import Table from '../components/Table';
import Input from '../components/Input';

import styled from 'styled-components';
import { ProductType, CartContextType } from '../types';

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.3fr 0.7fr;
  }
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 100px;
  height: 100px;
  padding: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 80px;
    max-height: 80px;
  }
`;

const QuantityLabel = styled.span`
  padding: 0 12.5px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const CartPage = () => {
  // const pathname = usePathname();
  const router = useRouter();

  const {
    cartProducts,
    addProduct,
    removeProduct,
    setCartProducts,
    clearCart,
  } = useContext(CartContext) as CartContextType;

  const [products, setProducts] = useState<ProductType[]>([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/products', { ids: cartProducts }).then((res) => {
        setProducts(res.data);
      });
    } else {
      setCartProducts([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (window?.location.href.includes('success')) {
      clearCart();
      setIsSuccess(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const moreOfThisProduct = (id: string) => {
    addProduct(id);
  };

  const lessOfThisProduct = (id: string) => {
    removeProduct(id);
  };

  const checkoutToPayment = async (e: any) => {
    e.preventDefault();

    const data = {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      products: cartProducts.join(','),
    };

    await axios
      .post('/api/checkout', data)
      .then((res) => {
        console.log(res.data.url);
        window.location = res.data.url;
      })
      .catch((err) => {
        console.log('There was an error!');
      });
  };

  let total = 0;

  // looping over all the ids in the cartProducts
  for (const productId of cartProducts) {
    // getting the prices of all the products whose ids are in the cartProducts
    const price =
      products.find((product) => product._id === productId)?.price || 0;

    // console.log(price);
    total += price;
  }

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks for your order!</h1>
              <p>We will email you when your order will be sent.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Cart</h2>
            {!cartProducts?.length ? (
              <div>Your cart is empty</div>
            ) : (
              <>
                <Table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <ProductInfoCell>
                          <ProductImageBox>
                            <img src={product.images[0]} alt='' />
                          </ProductImageBox>
                          {product.title}
                        </ProductInfoCell>
                        <td>
                          <Button
                            onClick={() => lessOfThisProduct(product._id)}
                          >
                            -
                          </Button>
                          <QuantityLabel>
                            {
                              cartProducts.filter((id) => id === product._id)
                                .length
                            }
                          </QuantityLabel>
                          <Button
                            onClick={() => moreOfThisProduct(product._id)}
                          >
                            +
                          </Button>
                        </td>
                        <td>
                          {' '}
                          {cartProducts.filter((id) => id === product._id)
                            .length * product.price}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>${total}</td>
                    </tr>
                  </tbody>
                </Table>
              </>
            )}
          </Box>

          {!!cartProducts?.length && (
            <Box>
              <h2>Order Information</h2>
              {/* <form action='/api/checkout' method='POST' > */}
              <form>
                <Input
                  type='text'
                  placeholder='Name'
                  value={name}
                  name='name'
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  type='text'
                  placeholder='Email'
                  value={email}
                  name='email'
                  onChange={(e) => setEmail(e.target.value)}
                />
                <CityHolder>
                  <Input
                    type='text'
                    placeholder='City'
                    value={city}
                    name='city'
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <Input
                    type='text'
                    placeholder='Postal Code'
                    value={postalCode}
                    name='postalCode'
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </CityHolder>
                <Input
                  type='text'
                  placeholder='Street Address'
                  value={streetAddress}
                  name='streetAddress'
                  onChange={(e) => setStreetAddress(e.target.value)}
                />
                <Input
                  type='text'
                  placeholder='Country'
                  value={country}
                  name='country'
                  onChange={(e) => setCountry(e.target.value)}
                />
                {/* <input type='hidden' name='products' value={cartProducts} /> */}
                <Button $black $block onClick={checkoutToPayment}>
                  Continue to payment
                </Button>
              </form>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
};

export default CartPage;
