import styled from "styled-components";

export const MenuStyle = styled.div`
  width: 100%;
  height: 40vh;
  background-color: black;
  z-index: 0;
  position: fixed;
  display: none;
  top: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  span {
    color: white;
    border: 1px solid white;
    margin-bottom: 5vh;
    padding: 20px;
    font-family: "Apercu Pro";
    font-style: normal;
    font-size: 15px;
    line-height: 125%;
  }
`;
