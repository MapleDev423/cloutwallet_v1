import styled from "styled-components";

export const Style = {
  Container: styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      font-family: "Apercu Pro";
      font-style: normal;
      font-weight: 500;
      font-size: 32px;
      line-height: 125%;
      text-align: center;
      color: #000000;
      margin-top: 30%;
    }

    input {
      margin-top: 15%;
      width: 80%;
      height: 54px;
      border-radius: 64px;
      border: 1px solid grey;
      font-family: IBM Plex Mono;
      font-style: italic;
      font-weight: normal;
      font-size: 24px;
      line-height: 100%;
      color: #1b1b1c;
      padding: 10px;
      text-align: center;
      transition: all 0.2s ease-in;

      ::placeholder {
        font-family: "IBM Plex Mono";
        font-style: italic;
        font-weight: normal;
        font-size: 24px;
        line-height: 100%;
        color: grey;
        text-align: center;
      }

      &:focus {
        border: 1px solid var(--primary);
      }
    }

    button {
      margin-top: 10%;
      height: 64px;
      width: 60%;
      border-radius: 32px;

      span {
        text-decoration: underline;
      }
    }
  `,
};
