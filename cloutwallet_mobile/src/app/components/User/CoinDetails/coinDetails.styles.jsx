import styled from "styled-components";

export const Style = {
  Cointainer: styled.div`
    width: 100%;
    padding: 25px 2.5%;
    height: 40vh;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 225px;
    padding-right: 0;

    h2 {
      font-family: "Apercu Pro";
      font-style: normal;
      font-weight: bold;
      font-size: 24px;
      line-height: 125%;
      color: #434343;
    }

    .cards-container {
      height: 85%;
      width: 100%;
      display: flex;
      flex-wrap: nowrap;
      overflow-x: hidden;
    }
  `,
};
