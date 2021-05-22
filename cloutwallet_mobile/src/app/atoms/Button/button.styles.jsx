import styled from "styled-components";

export const Style = {
  Container: styled.button`
    background-color: var(--primary);
    display: grid;
    place-items: center;

    span {
      color: white;
      font-family: "IBM Plex Mono";
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 100%;
    }
  `,
};
