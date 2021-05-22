import styled from "styled-components";

export const Style = {
  Container: styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;

    .first-half,
    .second-half {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .first-half {
      transition: background 0.3s ease-in;
      background-color: ${({ dark }) => (dark ? "#1C2237;" : "#2a64fa")};

      .logo {
        margin-top: 71px;
      }

      h1 {
        font-family: "Circular Std";
        font-style: normal;
        font-weight: 700;
        font-size: 45px;
        line-height: 57px;
        text-align: center;
        color: #ffffff;
        margin-top: 150px;
        width: 75%;
        max-width: 500px;
      }

      p {
        font-family: "HK Grotesk";
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 27px;
        text-align: center;
        color: #d8ffdf;
        margin-top: 24px;
        width: 75%;
        max-width: 550px;
      }

      .login-bg {
        position: absolute;
        z-index: 0;
        bottom: 0;
      }
    }

    .second-half {
      background: #e5e5e5;

      .logo {
        margin-top: 75px;
      }

      h2 {
        font-family: "Circular Std";
        font-style: normal;
        font-weight: bold;
        font-size: 22px;
        line-height: 28px;
        text-align: center;
        color: #333333;
        margin-top: 75px;
      }

      p {
        margin-top: 10px;
        font-family: "Circular Std";
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        text-align: center;
        color: #737171;
        width: 75%;
        max-width: 334px;
      }

      .login-input-div {
        margin-top: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 61px;
        width: 345px;
        position: relative;

        label {
          position: absolute;
          top: -12px;
          left: 18px;
          font-family: "Circular Std";
          font-style: normal;
          font-weight: normal;
          font-size: 15px;
          line-height: 22px;
          color: #4f4f4f;
          backdrop-filter: blur(3px);
          padding: 2px 3px;
        }

        input {
          height: 100%;
          width: 100%;
          padding: 10px;
          padding-left: 20px;
          border-radius: 6px;
          border: 1px solid transparent;
          font-family: "Circular Std";
          font-style: normal;
          font-weight: normal;
          font-size: 15px;
          line-height: 21px;
          color: black;
          transition: all 0.2s linear;
          background: #f8f8f8;
          box-shadow: 0px 20px 50px rgba(21, 130, 191, 0);

          ::placeholder {
            font-family: "Circular Std";
            font-style: normal;
            font-weight: normal;
            font-size: 15px;
            line-height: 21px;
            color: #bdbdbd;
            transition: all 0.2s linear;
          }
          &:focus {
            border: 1px solid var(--primary);
          }
        }
      }
    }

    button.bitclout-login {
      margin: 0px auto;
      margin-top: 200px;
      width: 345px;
      max-width: 75%;
      height: 55px;
      border-radius: 6px;
      transition: background 0.3s ease-in;
      align-self: center;
      background-color: ${({ dark }) => (dark ? "#1C2237;" : "#2a64fa")};
      span {
        text-decoration: none;
      }
    }

    button.theme-button {
      position: absolute;
      top: 40px;
      left: 74px;
    }

    @media (max-width: 1079px) {
      display: none;
    }
  `,
  T_Container: styled.div`
    display: grid;
    place-items: center;
    height: 100%;
    width: 100%;

    .logo-div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 50px;
      width: 90%;
    }

    .first-half {
      transition: background 0.3s ease-in;
      background-color: ${({ dark }) => (dark ? "#1C2237;" : "#2a64fa")};
      height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      h1 {
        font-family: "Circular Std";
        font-style: normal;
        font-weight: bold;
        font-size: 30px;
        line-height: 39px;
        text-align: center;
        color: #ffffff;
        width: 75%;
        margin-top: 20vh;
      }

      p {
        font-family: "HK Grotesk";
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        text-align: center;
        color: #d8ffdf;
        margin-top: 5vh;
        width: 80%;
      }

      button.header-button {
        background: #ffffff;
        border-radius: 6px;
        width: 333px;
        height: 55px;
        margin-top: 25vh;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
          transition: color 0.3s ease-in;
          color: ${({ dark }) => (dark ? "#1C2237;" : "#2a64fa")};
          font-family: "Circular Std";
          font-style: normal;
          font-weight: bold;
          font-size: 16px;
          line-height: 22px;
          text-align: center;
          margin-right: 25px;
        }
      }

      .login-bg {
        position: absolute;
        z-index: 0;
        bottom: 0;
      }
    }

    .second-half {
      transition: background 0.3s ease-in;
      background-color: ${({ dark }) => (dark ? "#1C2237;" : "white")};
      height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      h2 {
        font-family: "Circular Std";
        font-style: normal;
        font-weight: bold;
        font-size: 22px;
        line-height: 28px;
        text-align: center;
        transition: all 0.3s ease-in;
        color: ${({ dark }) => (dark ? "white" : "#333333")};
        margin-top: 25vh;
      }

      p {
        margin-top: 10px;
        font-family: "Circular Std";
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        text-align: center;
        transition: all 0.3s ease-in;
        color: ${({ dark }) => (dark ? "white" : "#737171")};
        width: 75%;
        max-width: 334px;
      }

      button.bitclout-login {
        transition: background 0.3s ease-in;
        background: ${({ dark }) => (dark ? "white" : "var(--primary)")};
        border-radius: 6px;
        width: 75%;
        height: 55px;
        margin-top: 15vh;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
          transition: color 0.3s ease-in;
          color: ${({ dark }) => (dark ? "#1C2237;" : "white")};
          font-family: "Circular Std";
          font-style: normal;
          font-weight: bold;
          font-size: 16px;
          line-height: 22px;
          text-align: center;
          margin-right: 25px;
        }
      }
    }

    @media (min-width: 1080px) {
      display: none;
    }
  `,
};
