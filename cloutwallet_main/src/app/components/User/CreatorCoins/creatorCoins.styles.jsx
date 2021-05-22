import styled from "styled-components";

export const Style = {
  Container: styled.div`
    width: 100%;
    padding: 25px 2.5%;
    display: flex;
    flex-direction: column;
    height: auto;
    .c-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      h2 {
        font-family: "Apercu Pro";
        font-style: normal;
        font-weight: bold;
        font-size: 24px;
        line-height: 125%;
        color: #434343;
      }
      .c-mode {
        width: 60%;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
    }
    .c-c-cards {
      display: flex;
      flex-direction: column;
      padding: 15px 0px;
      width: 100%;
      height: auto;
    }
  `,
  Span: styled.span`
    transition: all 0.5s ease-out;
    font-family: "IBM Plex Mono";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 125%;
    text-align: right;
    letter-spacing: 0.02em;
    color: ${({ active }) => (active ? "var(--primary)" : "#B0B0B0")};
    background-color: ${({ active }) =>
      active ? "rgba(0, 91, 255, 0.08);" : "transparent"};
    padding: 8px 16px;
    border-radius: 25px;
  `,
};
