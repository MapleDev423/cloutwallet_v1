import styled from "styled-components";

export const Style = {
  Container: styled.div`
    width: 96%;
    margin: 0px auto;
    display: flex;
    flex-direction: column;
    height: auto;
    min-height: calc(100vh - 80px);
    background: ${({ dark }) => (dark ? "#151928" : "#f4f4f4;")};
    padding-top: 80px;

    h1.mo-title {
      font-family: "Circular Std";
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 23px;
      transition: color 0.3s ease-in;
      color: ${({ dark }) => (dark ? "#F2F2F2" : "#333333;")};
      padding-top: 25px;
    }

    p.no-t-h {
      margin: 50px;
      font-family: "Circular Std";
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 23px;
      transition: color 0.3s ease-in;
      color: ${({ dark }) => (dark ? "#F2F2F2" : "#333333;")};      
      align-self: center;
    }

    .mo-button {
      height: 48px;
      width: 439px;
      border-radius: 8px;
      transition: background 0.3s ease-in;
      background: ${({ dark }) => (dark ? "#232A44" : "#ffffff")};
      display: flex;
      align-items: center;
      margin: 25px 0px;
      position: relative;
      justify-content: space-between;
      padding: 0 20px;

      .ch-search-input {
        flex: 1;
        height: 100%;
        transition: all 0.3s ease-in;
        background: ${({ dark }) => (dark ? "#232A44" : "#ffffff")};
        font-family: "Circular Std";
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 20px;
        color: ${({dark}) => (dark ? "#F2F2F2": '#000000')};
      }

      .search_user_list {
        opacity: 0%;
        transition: background 0.3s ease-in;
        color: ${({dark}) => (dark ? "#F2F2F2": '#000000')};
        background: ${({ dark }) => (dark ? "#232A44" : "#ffffff")};
        box-shadow: 0px 10px 20px rgb(58 58 58 / 15%);
        position: absolute;
        top: 54px;
        left: 0;
        width: 100%;
        padding: 10px 0px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
        .user {
          width: 100%;
          display: flex;
          align-items: center;
          padding: 10px 20px;
          border-radius: 10px;
          align-items: center;
          cursor: pointer;

          &:hover {
            background: ${({ dark }) => (dark ? "#283870" : "#f4f4f4")};
          }

          img {
            border-radius: 40px;
            margin-right: 20px;
          }
        }
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

    .mo-line-chart {
      transition: background 0.3s ease-in;
      background: ${({ dark }) => (dark ? "#1C2237" : "#ffffff")};
      box-shadow: 0px 20px 50px rgba(191, 21, 108, 0.05);
      border-radius: 12px;
      padding: 35px;
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .mot-chart-size {
        width: 100%;
        height: 50vh;
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

      .mo-creators {
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
    transition: background 0.3s ease-in;
    background: ${({ dark }) => (dark ? "#151928" : "#e5e5e5")};
    padding: 0px 25px;
    padding-top: 80px;
    min-height: 100vh;

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

    h1.mot-title {
      font-family: "Circular Std";
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 20px;
      transition: color 0.3s ease-in;
      color: ${({ dark }) => (dark ? "#F2F2F2" : "#333333;")};
      margin: 25px 0px;
    }

    .mot-button {
      height: 48px;
      width: 100%;
      border-radius: 8px;
      transition: background 0.3s ease-in;
      background: ${({ dark }) => (dark ? "#28345F" : "#ffffff")};
      display: flex;
      align-items: center;
      margin: 25px 0px;
      position: relative;
      justify-content: space-between;
      padding: 0 20px;

      .ch-search-input {
        flex: 1;
        height: 100%;
        transition: background 0.3s ease-in;
        background: ${({ dark }) => (dark ? "#28345F" : "#ffffff")};
      }

      .search_user_list {
        opacity: 0%;
        transition: background 0.3s ease-in;
        color: ${({dark}) => (dark ? "#FFFFFF": '#000000')};
        background: ${({ dark }) => (dark ? "#232A44" : "#ffffff")};
        box-shadow: 0px 10px 20px rgb(58 58 58 / 15%);
        position: absolute;
        top: 54px;
        left: 0;
        width: 100%;
        padding: 10px 0px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
        .user {
          cursor: pointer;
          width: 100%;
          display: flex;
          align-items: center;
          padding: 10px 20px;
          border-radius: 10px;
          align-items: center;

          &:hover {
            background-color: #f4f4f4;
          }

          img {
            border-radius: 40px;
            margin-right: 20px;
          }
        }
      }

      span {
        font-family: "Circular Std";
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 20px;
        transition: color 0.3s ease-in;
        color: ${({ dark }) => (dark ? "#F2F2F2" : "#333333;")};
      }
    }

    .mot-chart {
      width: 100%;
      height: 409px;
      transition: background 0.3s ease-in;
      background: ${({ dark }) => (dark ? "#1C2237" : "#ffffff")};
      box-shadow: 0px 20px 50px rgba(191, 21, 108, 0.05);
      border-radius: 12px;
      padding: 10px;
      display: flex;
      align-items: center;
      flex-direction: column;

      .mot-chart-size {
        width: calc(100vw - 75px);
        height: calc(100vw - 75px);
      }

      .mot-chart-options {
        height: 75px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        span {
          font-family: "Circular Std";
          font-style: normal;
          font-weight: normal;
          font-size: 12px;
          line-height: 15px;
          transition: color 0.3s ease-in;
          color: ${({ dark }) => (dark ? "#F2F2F2" : "#333333;")};
        }

        button {
          background: #f4f5f9;
          border-radius: 8px;
          width: 100px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          transition: background 0.3s ease-in;
          background: ${({ dark }) => (dark ? "#28345F" : "#ffffff")};
        }
      }
    }

    .buy-sell-history {
      width: 100%;
      padding: 25px 0px;
    }

    @media (min-width: 1001px) {
      display: none;
    }
  `,
};
