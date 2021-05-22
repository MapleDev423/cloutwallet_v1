import styled from "styled-components";

export const Style = {
  Container: styled.tr`
    width: 100%;
    height: 70px;

    th {
      font-family: "Apercu Pro";
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      cursor: pointer;
      color: ${(props) => props.theme.textColor};
      div {
        display: flex;
        justify-content: space-between;
      }
      img {
        margin: 5px 15px 5px 15px;
      }
      /* padding-left: 10px;
      padding-bottom: 1rem; */
    }
  `,
};
