'use client';

import styled from 'styled-components';
// import { ChangeEventHandler } from 'react';

const StyledInput = styled.input`
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizingL border-box;
`;

interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  name?: string;
  onChange: (e: any) => void;
}

const Input = (props: InputProps) => {
  return <StyledInput {...props} />;
};

export default Input;
