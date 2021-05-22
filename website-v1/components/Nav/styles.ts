import styled, { css } from "styled-components";
import { gradient } from "../../Color";

export const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;

  top: 0;
  z-index: 1;
  overflow: hidden;
  position: fixed;
  width: 100%;
  transition: border-bottom 150ms ease 0s, top 250ms ease 0s,
    background-color 300ms ease 0s;

  padding: 1rem 2rem;
  margin-bottom: 4rem;

  backdrop-filter: blur(50px);

  @media (max-width: 600px) {
    padding: 1rem 0.5rem;
  }
`;

export const PagesList = styled.ul`
  display: flex;
  justify-content: space-between;
  vertical-align: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const PageLink = styled.a`
  padding: 0.5rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;

  cursor: pointer;
  transition: color 200ms;

  font-weight: 500;
  font-size: 15px;

  color: #848484;

  :hover {
    color: black;
  }

  .active {
    color: black;
  }
`;

export const LoginAndSignUpContainer = styled.div`
  display: none;
  justify-content: space-between;
  padding: 0.5rem;

  @media (min-width: 768px) {
    display: flex;
  }
`;

export const Login = styled.button`
  background: transparent;
  border-radius: 10px;
  border: none;
  padding: 0.8rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  height: min-content;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  color: blue;

  &:last-child {
    padding-left: 0;
  }

  :hover {
    opacity: 0.9;
  }
`;

export const SignUp = styled.button`
  border-radius: 10px;
  background-color: blue;
  color: white;
  border: none;
  padding: 0.8rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  height: min-content;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;

  :hover {
    opacity: 0.7;
  }
`;

export const HamburgerIcon = styled.button`
  display: block;
  flex-direction: column;
  cursor: pointer;
  background: none;
  border: none;
  color: black;

  & div {
    width: 25px;
    margin: 0.3rem 0;
    height: 3px;
    background: black;
    border-radius: 30px;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

export const MobileNavStyle = styled.div<{ isOpen: boolean }>`
  z-index: 999;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 250px;
  background: rgba(0, 0, 0, 0.9);

  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  ${(props) =>
    props.isOpen &&
    css`
      display: flex;
    `}

  @media(min-width: 768px) {
    display: none;
  }
`;

export const MobileLink = styled.a`
  margin: 0.5rem 0;
  color: white;
  text-decoration: none;

  font-size: 1.2rem;
  color: #f5f5f5;
`;
