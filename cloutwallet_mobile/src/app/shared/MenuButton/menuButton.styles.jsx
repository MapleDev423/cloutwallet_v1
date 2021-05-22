import styled from "styled-components";

export const MBStyle = styled.button`
  color: white;
  background-color: transparent;
  cursor: pointer;
  margin-bottom: 5px;

  div {
    background-color: white;
    transition: all 0.25s ease-in;
    transform-origin: center;
    position: relative;
    border-radius: 1px;
  }

  div.first {
    height: 2px;
    width: 25px;
    transform: ${({ open }) =>
      open !== "close"
        ? "rotate(45deg) translateY(0px) translateX(5px)"
        : "rotate(0) translateY(0px)"};
  }

  div.second {
    height: 2px;
    width: 25px;
    margin-top: 5px;
    transform: ${({ open }) =>
      open !== "close" ? "rotate(-45deg)" : "rotate(0)"};
  }
`;
