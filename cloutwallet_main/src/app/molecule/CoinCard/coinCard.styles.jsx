import styled from "styled-components";

export const Style = {
  Cointainer: styled.div`
    height: 100%;
    width: 70%;
    min-width: 70%;
    margin-right: 5%;
    background: #efefef;
    border-radius: 16px;
    padding-left: 30px;
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    h3 {
      font-family: "Apercu Pro";
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 125%;
      color: #000000;
    }
    p {
      margin-top: 70px;
      font-family: "Apercu Pro";
      font-style: normal;
      font-weight: 500;
      font-size: 36px;
      line-height: 125%;
      color: var(--primary);
    }
    span {
      margin-top: 10px;
      font-family: "IBM Plex Mono";
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 125%;
      color: #5e5f61;
    }
  `,
};
