import styled from "styled-components";

export const Style = {
  Container: styled.tr`
    font-family: "IBM Plex Mono";
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 125%;
    color: ${(props) => props.theme.textColor};
    width: 100%;
    cursor: pointer;

    th {
      padding: 10px 0px;
      width: 15%;
      margin: 0;
    }

    th.profile-data {
      width: 20%;
      display: flex;
      align-items: center;

      .first {
        display: flex;
        align-items: center;
        min-width: 220px;
      }

      img {
        height: 40px;
        width: 40px;
        min-width: 40px;
        border-radius: 50%;
        margin-right: 10px;
      }

      .unit-price {
        margin-left: 25px;
      }
    }

    th {
      span.up {
        border: 1px solid #96bd62;
        color: #96bd62;
        padding: 2px;
        border-radius: 2px;
      }
      span.normal {
        border: 1px solid #003698;
        padding: 2px;
        color: #003698;
        border-radius: 2px;
      }
      span.down {
        border: 1px solid #dc6f4e;
        padding: 2px;
        color: #dc6f4e;
        border-radius: 2px;
      }
    }
  `,
};
