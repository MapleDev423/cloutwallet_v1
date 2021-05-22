import styled from "styled-components";

export const Style = {
  Container: styled.div`
    width: 35%;
    height: 180px;
    align-items: center;
    margin-left: 0px;
    display: flex;
    align-items: center;
    margin: 25px calc(2% - 2px);
    margin-bottom: 0px;
    transition: background 0.3s ease-in;
    background: ${({ dark }) => (dark ? "#1C2237;" : "#f8f8f8;")};
    box-shadow: 0px 20px 50px rgba(21, 130, 191, 0.05);
    border-radius: 12px;

    .wc-values {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 50%;
    }

    .wc-img-holder {
      display: grid;
      place-items: center;
      margin: 0px 35px;
      min-width: 72px;
      height: 72px;
      border-radius: 8px;
      transition: background 0.3s ease-in;
      background: ${({ dark }) => (dark ? "#28345F" : "#EAF0FF")};
    }

    img {
      height: 36px;
      width: 36px;
    }

    .wc-details {
      display: flex;
      flex-direction: column;
      width: 100%;

      .wc-values {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }

      h2 {
        font-family: "Circular Std";
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 20px;
        transition: color 0.3s ease-in;
        color: ${({ dark }) => (dark ? "#F2F2F2" : "#828282")};
      }

      p {
        font-family: "Circular Std";
        font-style: normal;
        font-weight: normal;
        font-size: 30px;
        line-height: 125%;
        transition: color 0.3s ease-in;
        color: ${({ dark }) => (dark ? "#F2F2F2" : "#454444")};
      }

      span {
        font-family: "Circular Std";
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 125%;
        color: #24864c;
      }
    }

    &:nth-child(1) {
      margin-left: 0px;
    }

    @media (max-width: 1000px) {
      width: 100%;
      background-color: transparent;
      box-shadow: none;

      .wc-values {
        width: 70%;
      }

      &:nth-child(1) {
        width: 100%;
        height: 110px;
        margin: 0;
        margin-bottom: 20px;

        .wc-details {
          h2 {
            font-size: 12px;
            line-height: 15px;
          }

          p {
            font-size: 20px;
            line-height: 125%;
          }

          span {
            font-size: 14px;
            line-height: 125%;
          }
        }

        img {
          height: 48px;
          width: 48px;
          margin: 0px 20px;
        }
      }
    }
  `,
};
