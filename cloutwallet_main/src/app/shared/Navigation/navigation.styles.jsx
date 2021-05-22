import styled from "styled-components";

export const Style = {
  Container: styled.div`
    color: #fbfbfb;

    .nav-list {
      list-style: none;
      font-family: "Apercu Pro";
      font-style: normal;
      font-weight: normal;
      font-size: 24px;
      line-height: 125%;
    }

    .nav-item {
      margin: 30px auto;
      margin-left: -40px;
      padding-left: 60px;
      cursor: pointer;
      border-left: 5px solid transparent;
      transition: all 0.2s linear;
    }

    .nav-item-active {
      border-left: 5px solid #005bff;
      color: #005bff;
      text-shadow: 0px 4px 40px rgba(0, 91, 255, 0.94);
    }
  `,
};
