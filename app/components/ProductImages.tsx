/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as React from 'react';

interface Props {
  $active: boolean;
}

interface ProductImagesProps {
  images: string[] | undefined;
  title: string | undefined;
}

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const BigImage = styled.img`
  max-width: 100%;
  max-height: 200px;
`;

const BigImageWrapper = styled.div`
  text-align: center;
`;

const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-grow: 0;
  margin-top: 10px;
`;

const ImageButton = styled.div<Props>`
  ${(props) =>
    props.$active
      ? `border-color: #ccc`
      : `border-color: transparent;
        opacity: 0.7;`}
  border-2px solid #ccc;
  height: 40px;
  padding: 2px;
  cursor: pointer;
  border-radius: 5px;
`;

const ProductImages: React.FC<ProductImagesProps> = ({ images, title }) => {
  // const defaultImage = images?.[0];
  const [activeImage, setActiveImage] = useState<string | undefined>(
    images?.[0]
  );

  // useEffect(() => {
  //   setActiveImage(images?.[0]);
  //   console.log(activeImage);
  // }, []);

  return (
    <>
      <BigImageWrapper>
        <BigImage src={activeImage} alt={title} />
      </BigImageWrapper>
      <ImageButtons>
        {images?.map((image, index) => (
          <ImageButton
            key={index}
            onClick={() => setActiveImage(image)}
            $active={image === activeImage}
          >
            <Image src={image} alt={title} />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
};

export default ProductImages;


// UNFIXED BUG : STATE and styles