import styled from "styled-components";

export const Style = {
  Container: styled.div`
    display: flex;
    align-items: center;

    img.img-round {
      border-radius: 50%;
      width: 48px;
      height: 48px;
      margin-right: 10px;
    }

    .text-1 {
      font-family: "Apercu Pro";
      font-weight: 500;
      font-size: 23px;
    }

    .text-2 {
      font-family: "IBM Plex Mono";
      font-size: 18px;
    }

    .flexbox {
      display: flex;
      flex-direction: column;
    }
  `,
};
