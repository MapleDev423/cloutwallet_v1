import styled from "styled-components";

export const Style = {
  Container: styled.div`
    height: auto;
    display: flex;
    flex-direction: row;
    width: 100%;

    @media (max-width: 1001px) {
      display: none;
    }
  `,
};
