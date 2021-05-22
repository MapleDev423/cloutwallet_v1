import styled from "styled-components";

export const Style = {
  Container: styled.div`
    width: 100%;
    height: 60px;
    padding: 10px 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .author {
      display: flex;
      align-items: flex-start;
      img {
        margin-right: 5px;
      }
      .details {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        p {
          font-family: "IBM Plex Mono";
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 125%;
          color: #434343;
        }
      }
    }
    .transaction {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-between;
      p {
        font-family: "Apercu Pro";
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 125%;
        text-align: right;
        color: #595959;
      }
      span {
        font-family: "IBM Plex Mono";
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 125%;
        text-align: right;
        color: #878787;
      }
    }
  `,
  Span: styled.span`
    font-family: "Apercu Pro";
    font-style: normal;
    font-weight: 900;
    font-size: 14px;
    line-height: 125%;
    color: ${({ type }) => (type === "SOLD" ? "#FC7177" : "#36CF00")};
  `,
};
