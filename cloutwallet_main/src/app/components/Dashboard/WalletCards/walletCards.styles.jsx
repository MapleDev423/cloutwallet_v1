import styled from "styled-components";

export const Style = {
  Container: styled.div`
    width: 100%;
    margin: 0px auto;
    display: flex;
    flex-direction: column;
    height: auto;
    padding: 25px 25px;
    overflow: hidden;
    position: relative;

    .down-arrow {
      display: none;
    }

    h1 {
      font-family: "Circular Std";
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 23px;
      transition: color 0.3s ease-in;
      color: ${({ dark }) => (dark ? "#F2F2F2" : "#333333;")};
    }

    .wcs-cards {
      display: flex;
      width: 100%;
      z-index: 0;
      flex-wrap: wrap;
      position: relative;
    }

    @media (max-width: 1000px) {
      transition: height 0.3s ease-out;
      height: ${({ size }) => (size ? "475px" : "195px")};
      overflow: hidden;

      .wcs-cards {
        margin-top: 20px;
        transition: background 0.3s ease-in;
        background: ${({ dark }) => (dark ? "#1C2237" : "white")};
        border-radius: 12px;
        margin-bottom: 20px;
        transition: height 0.3s ease-out;
        height: ${({ size }) => (size ? "440px" : "110px")};
      }

      .wcs-line {
        transition: all 0.5s linear;
        background-color: ${({ size }) => (size ? "#E0E0E0" : "transparent")};
        width: 70%;
        height: 1px;
        top: 180px;
        margin: auto;
        left: 15%;
        position: absolute;
      }

      .down-arrow {
        display: grid;
        transition: transform 0.3s ease-out;
        width: 50px;
        z-index: 1;
        position: absolute;
        left: 75%;
        top: 105px;
        transform: ${({ size }) => (size ? "rotate(180deg)" : "rotate(0deg)")};
      }
    }
  `,
};
