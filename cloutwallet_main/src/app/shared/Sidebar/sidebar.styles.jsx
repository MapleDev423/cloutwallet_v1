import styled from "styled-components";

export const Style = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 260px;
    height: 100%;
    transition: background 0.3s ease-in;
    background: ${({ dark }) => (dark ? "#1C2237" : "#fdfdfd")};
    box-shadow: 0px 20px 50px rgba(120, 120, 120, 0.05);
    align-items: center;
    position: fixed;

    .logo {
      margin-top: 30px;
    }

    .routes-container {
      height: 228px;
      width: 95%;
      display: flex;
      flex-direction: column;
      margin-top: 100px;
    }
  `,
  Route: styled.div`
    display: flex;
    height: 57px;
    align-items: center;
    width: 100%;
    transition: background 0.3s ease-in;
    background-color: ${({ active, dark }) =>
      active && dark ? "#28345F" : active ? "#EAF0FF" : "transparent"};
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s linear;

    .route-img {
      height: 40px;
      width: 40px;
      border-radius: 12px;
      margin-right: 22px;
      margin-left: 15px;
      display: grid;
      place-items: center;
      background-color: ${({ active }) => (active ? "#2A64FA" : "transparent")};

      svg {
        transition: all 0.2s linear;
        transform-origin: center;
        transform: ${({ active }) =>
          active ? "rotate(-20deg)" : "rotate(0deg)"};
        path {
          transition: all 0.2s linear;
          fill: ${({ active }) => (active ? "white" : "#969B9F")};
        }
      }
    }

    p {
      font-family: "Circular Std";
      transition: all 0.2s linear;
      font-style: normal;
      font-weight: normal;
      font-size: 15px;
      line-height: 19px;
      color: ${({ active, dark }) =>
        active && dark ? "white" : active ? "#4F4F4F" : "#969B9F"};
    }

    &:hover {
      background: rgba(234, 240, 255, 0.1);
    }
  `,
};
