import styled from "styled-components";

export const Style = {
  Container: styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    p {
      font-family: "IBM Plex Mono";
      font-style: italic;
      font-weight: normal;
      text-align: center;
    }
    p.title {
      width: 90%;
      font-size: 18px;
      line-height: 179.5%;
      letter-spacing: -0.02em;
      color: #86888b;
      max-width: 305px;
      margin-top: 30px;
    }
    button {
      height: 64px;
      width: 85%;
      border-radius: 64px;
      margin-top: 30px;
      max-width: 250px;
    }
  `,
};
