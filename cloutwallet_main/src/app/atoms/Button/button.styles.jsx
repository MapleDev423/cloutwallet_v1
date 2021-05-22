import styled from "styled-components";

export const Style = {
  Container: styled.button`
    background-color: var(--primary);
    display: grid;
    place-items: center;
    cursor: pointer;
    transition: all 0.2s ease-out;
    padding: 0.5rem 1rem;

    ${(props) => (props.login ? `background: black;` : `background: black;`)};

    span {
      font-family: "Circular Std";
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 22px;
      text-align: center;
      color: #ffffff;
    }

    &:hover {
      background-color: var(--secondary);
    }
  `,
};
