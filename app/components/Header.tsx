'use client';

// components
import Center from './Center';

import Link from 'next/link';
import styled from 'styled-components';
import { useContext } from 'react';
import { CartContextType } from '../types';

import { CartContext } from './CartContext';

const StyledHeader = styled.header`
  background-color: #222;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;
const StyledNav = styled.nav`
  display: flex;
  gap: 15px;
`;

const NavLink = styled(Link)`
  color: #aaa;
  text-decoration: none;
`;

const Header = () => {
  // consume the values from react context here
  const { cartProducts } = useContext(CartContext) as CartContextType;

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={'/'}>E-Commerce</Logo>
          <StyledNav>
            <NavLink href={'/'}>Home</NavLink>
            <NavLink href={'/products'}>All Products</NavLink>
            <NavLink href={'/categories'}>Categories</NavLink>
            <NavLink href={'/account'}>Account</NavLink>
            <NavLink href={'/cart'}>Cart({cartProducts.length})</NavLink>
          </StyledNav>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
};

export default Header;
