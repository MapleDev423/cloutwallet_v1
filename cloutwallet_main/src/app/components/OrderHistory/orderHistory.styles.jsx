import styled from "styled-components";

export const Style = {
  Container: styled.div`
    width: 96%;
    margin: 0px auto;
    display: flex;
    flex-direction: column;
    height: auto;
    min-height: calc(100vh - 80px);
    padding: 25px 0px;

    h1.oh-title {
      font-family: "Circular Std";
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 23px;
      transition: color 0.3s ease-in;
      color: ${({ dark }) => (dark ? "#F2F2F2" : "#333333;")};
      margin-top: 80px;
    }

    button {
      height: 48px;
      width: 439px;
      border-radius: 8px;
      transition: background 0.3s ease-in;
      background: ${({ dark }) => (dark ? "#28345F" : "#ffffff")};
      display: flex;
      align-items: center;
      margin: 25px 0px;

      svg {
        margin-left: 200px;
      }

      span {
        font-family: "Circular Std";
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 20px;
        color: #969b9f;
        margin-left: 32px;
      }
    }

    .buy-sell-history {
      display: flex;
      /* align-items: center; */
      width: 100%;
      margin: 25px auto;
      justify-content: space-between;
    }

    @media (max-width: 1001px) {
      display: none;
    }
  `,
  T_Container: styled.div`
    padding-top: 80px;
    min-height: 100vh;
    transition: background 0.3s ease-in;
    background: ${({ dark }) => (dark ? "#151928" : "#e5e5e5")};

    .buy-sell-history {
      width: 100%;
      padding: 25px 25px;
    }

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

    @media (min-width: 1001px) {
      display: none;
    }
  `,
};
