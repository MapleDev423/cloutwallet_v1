import styled from "styled-components";

export const ProductMockup = styled.img`
  width: 600px;
  height: 400px;

  @media (max-width: 768px) {
    width: 400px;
    height: 267px;
  }

  @media (max-width: 450px) {
    width: 300px;
    height: 200px;
  }
`;
