import styled from "styled-components";

export const Style = {
  LineCanvas: styled.div`
    width: 35%;
    height: 180px;
    align-items: center;
    margin-left: 0px;
    display: grid;
    place-items: center;
    margin: 25px calc(2% - 2px);
    margin-bottom: 0px;
    transition: background 0.3s ease-in;
    background: ${({ dark }) => (dark ? "#1C2237;" : "#f8f8f8;")};
    box-shadow: 0px 20px 50px rgba(21, 130, 191, 0.05);
    border-radius: 12px;

    .gw-content {
      width: 90%;
      height: 90%;

      .gw-graph {
        height: 90%;
        width: 100%;
      }
    }

    p {
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 20px;
      color: ${({ dark }) => (dark ? "#E0E0E0;" : "#828282;")};
    }

    @media (max-width: 1000px) {
      width: 100%;
      background-color: transparent;
      box-shadow: none;
      height: 220px;
      margin: 0;
      margin-bottom: 20px;
    }
  `,
};
