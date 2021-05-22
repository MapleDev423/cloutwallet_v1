import styled from "styled-components";

export const Style = {
  Container: styled.div`
    width: 96%;
    margin: 0px auto;
    display: flex;
    flex-direction: column;
    height: auto;
    padding: 25px 0px;

    h1 {
      font-family: "Circular Std";
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 23px;
      transition: color 0.3s ease-in;
      color: ${({ dark }) => (dark ? "#F2F2F2" : "#333333;")};
      margin-bottom: 25px;
    }

    .ms-line-chart {
      transition: background 0.3s ease-in;
      background: ${({ dark }) => (dark ? "#1C2237" : "#ffffff")};
      box-shadow: 0px 20px 50px rgba(191, 21, 108, 0.05);
      border-radius: 12px;
      padding: 35px;
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .ms-chart-size {
        width: calc(100% - 70px);
        height: auto;
      }

      h2 {
        font-family: "Circular Std";
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 18px;
        transition: color 0.3s ease-in;
        color: ${({ dark }) => (dark ? "#E0E0E0" : "#333333;")};
      }

      .ms-creators {
        display: flex;
        align-items: center;
        margin: 15px 0px;
        margin-bottom: 35px;

        img {
          margin-right: 15px;

          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        span {
          font-family: "Circular Std";
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 125%;
          text-align: center;
          color: #2a64fa;
          margin-left: 10px;
        }
      }
    }
  `,
};
