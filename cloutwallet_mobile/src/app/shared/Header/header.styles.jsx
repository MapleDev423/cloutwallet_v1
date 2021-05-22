import styled from "styled-components";

export const Style = {
  Container: styled.header`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 25px 2.5%;
    background: #000000;
    position: fixed;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.5);
    height: auto;
    top: 0;

    .logo-menu {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0px;

      .page-title {
        font-family: "Apercu Pro";
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 125%;
        text-align: center;
        color: #FBFBFB;
      }
    }

    .details {
      padding: 10px 0px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 25px;

      .coin {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;

        h2 {
          font-family: "Apercu Pro";
          font-style: normal;
          font-weight: normal;
          font-size: 40px;
          line-height: 125%;
          color: #005bff;
        }

        span {
          font-family: "IBM Plex Mono";
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 125%;
          color: #ffffff;
        }
      }

      img {
        border-radius: 50%;
        width: auto;
        height: 100%;
      }
    }
  `,
};
