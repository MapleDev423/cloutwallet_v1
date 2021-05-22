import styled from "styled-components";

export const Style = {
  Container: styled.div`
    width: 100%;

    table {
      width: 100%;
      text-align: left;
      border: none;

      thead {
        width: 100%;
      }
    }
    tr:hover {
      background-color: rgba(127, 173, 255, 0.07);
    }

    .data-center {
      font-family: "IBM Plex Mono";
      font-style: normal;
      font-weight: bold;
      font-size: 17px;
      line-height: 125%;
      color: ${(props) => props.theme.textColor};
    }
    .data-center,
    td {
      text-align: center;
    }
  `,
};
