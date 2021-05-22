import styled from "styled-components";

export const Style = {
  Container: styled.div`
    width: 100%;
    transition: background 0.3s ease-in;
    background: ${({ dark }) => (dark ? "#151928" : "#f4f4f4;")};
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;
    padding-bottom: 150px;
    padding-top: 80px;

    p.no-t-h {
      margin-top: 50px;
      font-family: "Circular Std";
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 23px;
      transition: color 0.3s ease-in;
      color: ${({ dark }) => (dark ? "#F2F2F2" : "#333333;")};
    }

    .buy-sell-history {
      display: flex;
      align-items: flex-start;
      width: 96%;
      margin: 0px auto;
      justify-content: space-between;
    }
  `,
};
