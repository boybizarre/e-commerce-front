'use client';
import styled, { css } from 'styled-components';
import { primary } from '../lib/colors';


interface ButtonProps {
  children: React.ReactNode,
  type?: 'button' | 'submit'| 'reset' | undefined,
  $primary?: boolean,
  $outline?: boolean,
  $white?: boolean,
  $block?: boolean,
  $black?: boolean,
  $size?: string,
  onClick?: (e: any) => void,
}

export const ButtonStyle = css`
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;

  svg {
    height: 16px;
    margin-right: 5px;
  }

  ${(props: any) => props.$block && css`
    display: block;
    width: 100%;
  `}

  ${(props: any) =>
    props.$white &&
    !props.$outline &&
    css`
      background-color: #fff;
      color: #000;
    `}
  ${(props: any) =>
    props.$white &&
    props.$outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;
    `}

  ${(props: any) =>
    props.$black &&
    !props.$outline &&
    css`
      background-color: #000;
      color: #fff;
    `}

    
  ${(props: any) =>
    props.$black &&
    props.$outline &&
    css`
      background-color: transparent;
      color: #000;
      border: 1px solid #000;
    `}
    
  ${(props: any) =>
    props.$primary &&
    !props.$outline &&
    css`
      background-color: ${primary};
      border: 1px solid ${primary};
      color: #fff;
    `}

  ${(props: any) =>
    props.$primary &&
    props.$outline &&
    css`
      background-color: transparent;
      border: 1px solid ${primary};
      color: ${primary};
    `}

  ${(props: any) =>
    props.$size === 'l' &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
      svg {
        height: 20px;
      }
    `}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export default Button;
