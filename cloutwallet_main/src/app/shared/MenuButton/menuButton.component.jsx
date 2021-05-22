import { useSelector, useDispatch } from "react-redux";
import { toggleMenu } from "./menuButton.slice";
import { MBStyle } from "./menuButton.styles";

function MenuButton() {
  const open = useSelector((state) => state.menu);
  const dispatch = useDispatch();

  function clickHandler() {
    dispatch(toggleMenu(open));
  }

  return (
    <MBStyle open={open} onClick={clickHandler}>
      <div className="first" />
      <div className="second" />
    </MBStyle>
  );
}

export default MenuButton;
