import styled from "styled-components";

export const Style = {
  Container: styled.div`
    background: ${(props) => props.theme.bubble};
    height: 200px;
    width: 500px;
    border-radius: 10px;
    padding: 20px 15px;
    font-family: "Apercu Pro";
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    div.coin-amount {
      font-size: 48px;
      color: #005bff;
      display: flex;
      justify-content: space-between;
      div.up {
        color: #96bd62;
      }
      div.normal {
        color: #003698;
      }
      div.down {
        color: #dc6f4e;
      }
    }

    div.amount {
      margin-top: 10px;
      font-size: 20px;
    }

    div.token {
      font-family: "IBM Plex Mono";
      font-size: 20px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  `,
};
