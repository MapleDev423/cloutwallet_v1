import styled from "styled-components";

export const Style = {
  Container: styled.label`
    label {
      background: ${(props) => props.theme.label};
      padding: 4px 6px 4px 4px;
      color: ${(props) => props.theme.textColor};
      font-size: 13px;
    }

    label.top {
      color: #005bff;
      background: rgba(0, 91, 255, 0.26);
    }

    label:hover {
      color: #8fff00;
      background: rgba(0, 91, 255, 0.13);
    }
  `,
};
