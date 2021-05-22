import styled from "styled-components";

export const Style = {
  Container: styled.div`
    width: 48%;
    transition: background 0.3s ease-in;
    background: ${({ dark }) => (dark ? "#1C2237;" : "#f8f8f8;")};
    box-shadow: 0px 20px 50px rgba(191, 21, 108, 0.05);
    border-radius: 12px;
    height: fit-content;
    .header {
      height: 100px;
      width: 100%;
      padding: 0px 25px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      h1 {
        font-family: "Circular Std";
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 23px;
        transition: color 0.3s ease-in;
        color: ${({ dark }) => (dark ? "#F2F2F2;" : "#333333")};
      }
    }

    .hist-dropdown {
      display: flex;
      margin: 0px 25px;
    }

    .hist-table {
      margin-top: 25px;
      width: 100%;
      height: auto;
      transition: background 0.3s ease-in;
      background: ${({ dark }) => (dark ? "#1C2237;" : "#f8f8f8;")};
      box-shadow: 0px 20px 50px rgba(21, 130, 191, 0.05);
      border-radius: 12px;

      .see-all {
        width: 100%;
        height: 50px;
        display: grid;
        place-items: center;

        span {
          font-family: "Circular Std";
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 125%;
          text-align: center;
          color: #2a64fa;
          margin-bottom: 10px;
          cursor: pointer;
        }
      }

      .sort-icon {
        margin-left: 5px;
        display: grid;
        place-items: center;
      }

      table {
        width: 100%;
        height: auto;

        thead {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 50px;
          width: 100%;
          text-align: left;
          padding: 0px 25px;

          tr {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 50px;
            width: 100%;
            text-align: left;

            th,
            td {
              display: flex;
              align-items: center;
              /* height: 100%; */
              width: 17.5%;
              font-family: "Circular Std";
              font-style: normal;
              font-weight: normal;
              font-size: 14px;
              line-height: 18px;
              color: #828282;

              &:nth-child(1) {
                width: 10%;
              }
              &:nth-child(2) {
                width: 30%;
              }
              &:nth-child(3) {
                width: 20%;
              }
              img{
                margin-right: 15px;
                width: 40px;
                height: 40px;
                border-radius: 50%;
              }
            }
          }
        }

        tbody {
          width: 100%;
          width: calc(100% + 50px);
          height: 100px;
          width: 100%;
          text-align: left;
          padding: 0px 25px;

          tr {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 50px;
            margin: 15px 0px;
            width: 100%;
            text-align: left;
            padding: 0px 25px;
            transition: background 0.3s ease-in;
            background: ${({ dark }) => (dark ? "#232A44" : "#ffffff")};
            margin-top: 0px;
            transition: all 0.2s linear;

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
              transition: color 0.3s ease-in;
              color: ${({ dark }) => (dark ? "white" : "#2e2e2e;")};
              transition: background 0.2s linear;

              &:nth-child(1) {
                width: 10%;
              }
              &:nth-child(2) {
                width: 30%;
              }
              &:nth-child(3) {
                width: 20%;
              }
              img{
                margin-right: 15px;
                width: 40px;
                height: 40px;
                border-radius: 50%;
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
      }
    }

    @media (max-width: 1080px) {
      width: 100%;
      margin-bottom: 25px;
    }
  `,
};
