import { Style } from "./theme.styles";
import { useDispatch, useSelector } from "react-redux";
import { setTrue, setFalse } from "./theme.slice";
import gsap from "gsap";
import { SwitchTransition, Transition } from "react-transition-group";

function enter(node) {
  gsap.from(node, {
    duration: 0.25,
    autoAlpha: 0,
    x: 20,
  });
}

function exit(node) {
  gsap.to(node, {
    duration: 0.25,
    autoAlpha: 0,
    x: -20,
  });
}

function ThemeButton() {
  const dispatch = useDispatch();
  const darkTheme = useSelector((state) => state.theme.darkTheme);

  function clickHandler() {
    if (darkTheme) {
      dispatch(setFalse());
    } else {
      dispatch(setTrue());
    }
  }

  return (
    <Style.Container
      onClick={clickHandler}
      className="theme-button"
      dark={darkTheme}
    >
      <SwitchTransition>
        <Transition
          key={darkTheme}
          timeout={250}
          in={darkTheme}
          onEnter={enter}
          onExit={exit}
          mountOnEnter={true}
          unmountOnExit={true}
        >
          {darkTheme ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5.98877C8.68538 5.98877 5.98883 8.68585 5.98883 12.0005C5.98883 15.3151 8.68538 18.0122 12 18.0122C15.3141 18.0122 18.0112 15.3156 18.0112 12.0005C18.0112 8.68531 15.3141 5.98877 12 5.98877Z"
                fill="#E0E0E0"
              />
              <path
                d="M12 4.22179C11.3522 4.22179 10.8271 3.69672 10.8271 3.04942V1.1729C10.8271 0.525066 11.3522 0 12 0C12.6478 0 13.1729 0.525066 13.1729 1.1729V3.04942C13.1729 3.69672 12.6473 4.22179 12 4.22179Z"
                fill="#E0E0E0"
              />
              <path
                d="M12 19.7778C11.3522 19.7778 10.8271 20.3029 10.8271 20.9507V22.8267C10.8271 23.4751 11.3522 24.0002 12 24.0002C12.6478 24.0002 13.1729 23.4751 13.1729 22.8267V20.9507C13.1729 20.3029 12.6473 19.7778 12 19.7778Z"
                fill="#E0E0E0"
              />
              <path
                d="M17.4994 6.50022C17.0418 6.04211 17.0418 5.29969 17.4994 4.84158L18.8264 3.51457C19.284 3.05699 20.0269 3.05699 20.485 3.51457C20.9431 3.97267 20.9431 4.71563 20.485 5.1732L19.158 6.50022C18.7004 6.95832 17.958 6.95832 17.4994 6.50022Z"
                fill="#E0E0E0"
              />
              <path
                d="M6.50011 17.5002C6.04201 17.0416 5.29958 17.0416 4.84148 17.5002L3.51446 18.8267C3.05689 19.2843 3.05636 20.0278 3.51446 20.4853C3.97257 20.9429 4.71552 20.9429 5.1731 20.4853L6.50011 19.1578C6.95822 18.7002 6.95822 17.9573 6.50011 17.5002Z"
                fill="#E0E0E0"
              />
              <path
                d="M19.7776 12C19.7776 11.3522 20.3027 10.8271 20.9505 10.8271H22.8271C23.4749 10.8271 24 11.3522 24 12C24 12.6479 23.4749 13.1724 22.8271 13.1724H20.9505C20.3027 13.1724 19.7776 12.6479 19.7776 12Z"
                fill="#E0E0E0"
              />
              <path
                d="M4.22179 12C4.22179 11.3522 3.69672 10.8271 3.04889 10.8271H1.1729C0.525066 10.8271 0 11.3522 0 12C0 12.6479 0.525066 13.1724 1.1729 13.1724H3.04942C3.69672 13.1724 4.22179 12.6479 4.22179 12Z"
                fill="#E0E0E0"
              />
              <path
                d="M17.4994 17.5004C17.9575 17.0428 18.7005 17.0428 19.158 17.5004L20.4851 18.8274C20.9432 19.2845 20.9432 20.028 20.4851 20.4855C20.0269 20.9431 19.2845 20.9431 18.8264 20.4855L17.4994 19.1585C17.0413 18.7004 17.0413 17.958 17.4994 17.5004Z"
                fill="#E0E0E0"
              />
              <path
                d="M6.50007 6.50008C6.95817 6.04198 6.95817 5.29955 6.50007 4.84145L5.17305 3.51497C4.71495 3.05686 3.97252 3.05686 3.51442 3.51497C3.05631 3.97254 3.05631 4.7155 3.51442 5.17307L4.84143 6.50008C5.29954 6.95872 6.04196 6.95872 6.50007 6.50008Z"
                fill="#E0E0E0"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.7 15C17.2 15.8 14.3 15.3 12.3 13.3C9.79999 10.8 9.59999 6.8 11.6 4C7.49999 4.4 4.29999 7.8 4.29999 12C4.29999 16.4 7.89999 20 12.3 20C15.6 20 18.5 17.9 19.7 15Z"
                fill="#4F4F4F"
              />
            </svg>
          )}
        </Transition>
      </SwitchTransition>
    </Style.Container>
  );
}

export default ThemeButton;
