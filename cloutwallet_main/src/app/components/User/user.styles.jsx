import styled from "styled-components";

export const Style = {
  Container: styled.div`
    width: 100%;
    height: auto;
    min-height: 100vh;
    transition: background 0.3s ease-in;
    background: ${({ dark }) => (dark ? "#1C1B1B" : "#e5e5e5")};
    padding-top: 75px;
    display: flex;
    flex-direction: column;
    align-items: center;

    p.no-t-h {
      margin: 50px auto;
      font-family: "Circular Std";
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 23px;
      transition: color 0.3s ease-in;
      color: ${({ dark }) => (dark ? "#F2F2F2" : "#333333;")};      
      align-self: center;
      text-align: center;
    }


    .buy-sell-history {
      width: 100%;
      padding: 25px 25px;
    }

    @media (min-width: 1000px) {
      display: none;

      .history {
        width: 100%;
      }
    }
  `,
};
