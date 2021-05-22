import styled from "styled-components";

export const Style = {
  Container: styled.div`
    padding: 50px;
    flex-grow: 1;
    ${"" /* background-color: ${(props) => props.theme.background}; */}
    background-color: #ffffff6e;
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    visibility: hidden;
    opacity: 0
    transition:visibility 0.5s linear,opacity 0.5s linear;

    .modal_container {
      width: 600px;
      height: 400px;
      background-color: #424242;
      border-radius: 10px;
      visiblity: hidden;
      color: white;
      padding: 20px 50px;
      font-family: "Apercu Pro";
    }

    .user_info {
      display: flex;
      align-items: center;
      display: grid;
      grid-template-columns: 33px 48px 1fr 1fr;
      gap: 0 20px;
    }

    .close_icon {
      font-family: cursive;
      font-size: 1.2em;
      font-weight: 600;
      cursor: pointer;
      padding: 5px 10px;
      background-color: #5f5f5f;
      border-radius: 5px;
    }

    .close_icon:hover {
      color: #005BFF;
    }

    .user_info > img {
      width: 48px;
      height 48px;
      border-radius: 48px;
    }

    .username {
      letter-spacing: 1px;
    }

    .coins_held {
      letter-spacing: 1px;
      margin-right: 0px;
      float: right;
      line-height: px;
    }

    .graph_container {
      width: 100%;
      height: 200px;
      background-color: black;
      margin-top: 20px;
      border-radius: 10px;

    }



    .other_info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-top: 20px;
    }
  `,
};
