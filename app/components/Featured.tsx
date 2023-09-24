'use client';

import styled from 'styled-components';

import Center from './Center';

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

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 40px;
  img{
    max-width: 100%;
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
` 

const Featured = () => {
  return (
    <Bg>
      <Center>
        <Wrapper>
          <Column>
            <div>
              <Title>Pro Anywhere</Title>
              <Desc>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae
                necessitatibus inventore velit distinctio aliquid laudantium fuga
                et reiciendis quae officia, atque ipsam illum culpa. Iste
                voluptatem corrupti possimus magni vel?
              </Desc>
            </div>
          </Column>
          <Column>
            <img
              src='https://utfs.io/f/ba58d3c8-050b-4f60-8695-4ddb120c3fca-imq2fq.png'
              alt=''
            />
          </Column>
        </Wrapper>
      </Center>
    </Bg>
  );
};

export default Featured;
