import styled from "styled-components";

export const Style = {
  Table: styled.table`
    width: 100%;
    height: auto;

    .cc-name {
      display: flex;
      align-items: center;
      height: 100%;

      img {
        margin-right: 12px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }

      p {
        font-family: "Circular Std";
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 20px;
        transition: color 0.3s ease-in;
        color: ${({ dark }) => (dark ? "#F2F2F2" : "#333333")};
      }

      span {
        font-family: "Circular Std";
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 18px;
        color: #828282;
      }
    }

    thead {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      text-align: left;

      tr {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        text-align: left;
        padding: 0px 5px;

        th,
        td {
          display: flex;
          align-items: center;
          height: 100%;
          width: 17.5%;
          font-family: "Circular Std";
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 18px;
          color: #828282;
          min-width: 90px;

          &:nth-child(1) {
            width: auto;
          }
        }
      }
    }

    tbody {
      width: 100%;
      height: 50px;
      text-align: left;

      tr {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 75px;
        border-radius: 5px;
        margin: 5px 0px;
        width: 100%;
        text-align: left;
        padding: 0px 5px;
        transition: background 0.3s ease-in;
        background: ${({ dark }) => (dark ? "#232A44;" : "#ffffff")};

        th,
        td {
          display: grid;
          align-items: flex-start;
          width: 17.5%;
          font-family: "Circular Std";
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 20px;
          display: flex;
          align-items: center;
          min-width: 90px;
          transition: all 0.2s linear;
          transition: color 0.3s ease-in;
          color: ${({ dark }) => (dark ? "#F2F2F2" : "#2e2e2e;")};

          p,
          span {
            transition: color 0.3s ease-in;
            color: ${({ dark }) => (dark ? "#F2F2F2" : "#2e2e2e;")};
          }

          &:nth-child(1) {
            width: auto;
          }
        }

        &:hover {
          background: #2a64fa;

          th,
          td,
          p,
          span {
            color: white;
          }
        }
      }
    }
  `,
};
