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
    }

    .ch-search {
      margin-top: 15px;
      height: 48px;
      width: 439px;
      background: #ffffff;
      border-radius: 8px;
      display: flex;
      align-items: center;

      svg {
        margin-left: 35px;
        margin-right: 20px;
      }

      input {
        width: 70%;
        height: 100%;
        font-family: "Circular Std";
        font-style: normal;
        font-weight: normal;
        font-size: 15px;
        line-height: 21px;
        color: black;

        ::placeholder {
          font-family: "Circular Std";
          font-style: normal;
          font-weight: normal;
          font-size: 15px;
          line-height: 21px;
          color: #bdbdbd;
          transition: all 0.2s linear;
        }
      }
    }

    .see-all {
      width: 100%;
      height: 75px;
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
  `,
  TableDiv: styled.div`
    max-height: ${({height}) => height ? "550px" : "5000px"};
    transition: max-height 30s ease-in;
    overflow: hidden;
    margin-top: 25px;
    width: 100%;
    height: auto;
    transition: background 0.3s ease-in;
    background: ${({ dark }) => (dark ? "#1C2237" : "#f8f8f8;")};
    box-shadow: 0px 20px 50px rgba(21, 130, 191, 0.05);
    border-radius: 12px;

    .ch-usd {
      display: flex;
      align-items: center;

      svg {
        margin-right: 18px;
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
      user-select: none;

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
        }

        span {
          font-family: "Circular Std";
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 18px;
        }
      }

      thead {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100px;
        width: 100%;
        text-align: left;
        padding: 0px 25px;

        tr {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100px;
          width: 100%;
          text-align: left;

          th,
          td {
            display: flex;
            align-items: center;
            height: 100%;
            width: 16%;
            font-family: "Circular Std";
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 18px;
            color: #828282;

            &:nth-child(1) {
              width: 20%;
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
          height: 75px;
          margin: 15px 0px;
          width: 100%;
          text-align: left;
          padding: 0px 25px;
          transition: background 0.3s ease-in;
          background: ${({ dark }) => (dark ? "#232A44;" : "#ffffff")};

          th,
          td {
            display: grid;
            align-items: flex-start;
            width: 16%;
            font-family: "Circular Std";
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 20px;
            display: flex;
            align-items: center;
            transition: all 0.3s ease-in;
            transition: color 0.3s ease-in;
            color: ${({ dark }) => (dark ? "#F2F2F2" : "#2e2e2e;")};

            p,
            span {
              transition: color 0.3s ease-in;
              color: ${({ dark }) => (dark ? "#F2F2F2" : "#2e2e2e;")};
            }

            &:nth-child(1) {
              width: 20%;
            }

            &:nth-child(4) {
              min-width: 200px;
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
  `,
  T_Container: styled.div`
    width: 100%;
    margin: 0px auto;
    display: flex;
    flex-direction: column;
    height: auto;
    padding: 0px 25px;

    h1 {
      font-family: "Circular Std";
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 23px;
      transition: color 0.3s ease-in;
      color: ${({ dark }) => (dark ? "#F2F2F2" : "#333333;")};
    }

    .ch-search {
      margin-top: 15px;
      height: 48px;
      width: 100%;
      background: #ffffff;
      border-radius: 8px;
      display: flex;
      align-items: center;
      position: relative;

      .search_user_list {
        opacity: 0%;
        background-color: aquamarine;
        position: absolute;
        top: 54px;
        left: 0;
        width: 100%;
        border-radius: 10px;
        padding: 10px 20px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;

        .user {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            border-radius: 40px;
            margin-right: 20px;
          }
        }
      }

      svg {
        margin-left: 35px;
        margin-right: 20px;
      }

      input {
        width: 70%;
        height: 100%;
        font-family: "Circular Std";
        font-style: normal;
        font-weight: normal;
        font-size: 15px;
        line-height: 21px;
        color: black;

        ::placeholder {
          font-family: "Circular Std";
          font-style: normal;
          font-weight: normal;
          font-size: 15px;
          line-height: 21px;
          color: #bdbdbd;
          transition: all 0.2s linear;
        }
      }
    }

    .ch-values {
      width: 100%;
      padding: 35px 0px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .see-all {
      height: 50px;
      display: grid;
      width: 100%;
      place-items: center;

      span {
        font-family: "Circular Std";
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 125%;
        text-align: center;
        color: #2a64fa;
      }
    }
  `,
  Span: styled.span`
    font-family: "Circular Std";
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 15px;
    text-align: center;
    transition: all 0.2s linear;
    color: ${({ active }) => (active ? "#2A64FA" : "#828282")};
    padding: 10px 0px;
    border-bottom: ${({ active }) =>
      active ? "3px solid #2A64FA" : "3px solid transparent"};
  `,
};
