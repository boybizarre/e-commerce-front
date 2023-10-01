import Link from "next/link";

import styled from 'styled-components';
import { ButtonStyle } from "./Button";


const StyledLink = styled(Link)`
  ${ButtonStyle}
`

const ButtonLink = ({ ...props }) => {
  return (
    <StyledLink href='/' {...props} />
  );
};

export default ButtonLink;
