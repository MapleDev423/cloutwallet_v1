import styled from "styled-components";

export const LoaderOverlay = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
`;

export const LoaderContainer = styled.div`
  width: 75px;
  height: 75px;
  border: 5px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;
