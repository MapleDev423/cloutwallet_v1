import styled from "styled-components";

export const Style = {
  Container: styled.div`
    width: 100%;
    padding: 25px 2.5%;
    display: flex;
    flex-direction: column;
    height: auto;
    margin-top: 325px;

    .t-header {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      h2 {
        font-family: "Apercu Pro";
        font-style: normal;
        font-weight: bold;
        font-size: 24px;
        line-height: 125%;
        color: #434343;
      }
    }

    .t-c-cards {
      display: flex;
      flex-direction: column;
      padding: 15px 0px;
      width: 100%;
      height: auto;
    }
  `,
};
