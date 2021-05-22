import styled from "styled-components";

export const Style = {
  Container: styled.button`
    width: 56px;
    height: 40px;
    border-radius: 10px;
    transition: background 0.3s ease-in;
    background: ${({ dark }) => (dark ? "#28345F" : "#ffffff")};
    box-shadow: 0px 6px 58px rgba(196, 203, 214, 0.103611);
    display: grid;
    place-items: center;
    cursor: pointer;
    overflow: hidden;
  `,
};
