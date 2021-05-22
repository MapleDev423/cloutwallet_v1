import Header from "../Header/header.component";
import Sidebar from "../Sidebar/sidebar.component";
import { Style } from "./layout.styles";
import { useSelector } from "react-redux";

function Layout({ children }) {
  const darkTheme = useSelector((state) => state.theme.darkTheme);

  return (
    <Style.Container dark={darkTheme}>
      <Sidebar dark={darkTheme} />
      <Header dark={darkTheme} />
      <div className="page-content">{children}</div>
    </Style.Container>
  );
}

export default Layout;
