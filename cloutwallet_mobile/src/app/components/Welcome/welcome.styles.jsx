import styled from "styled-components";

export const Style = {
  Container: styled.div`
    height: 100vh;
    background-color: white;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;

    svg {
      margin-top: 30%;
    }

    p {
      font-family: "IBM Plex Mono";
      font-style: italic;
      font-weight: normal;
      text-align: center;
    }

    p.title {
      margin-top: 15%;
      width: 90%;
      font-size: 18px;
      line-height: 179.5%;
      letter-spacing: -0.02em;
      color: #86888b;
      max-width: 305px;
    }

    button {
      height: 64px;
      width: 85%;
      border-radius: 64px;
      margin-top: 65%;
    }

    p.subtitle {
      color: #6f747e;
      margin-top: 10%;
      font-size: 14px;
      line-height: 150%;
      max-width: 180px;
    }
  `,
};
