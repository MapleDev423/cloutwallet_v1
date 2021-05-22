import { Style } from "./dashboard.styles";
import Main from "./Main/main.component";
import Layout from "../../shared/Layout/layout.component";

function Dashboard() {
  return (
    <Style.Container>
      <Layout>
        <Main className="main" />
      </Layout>
    </Style.Container>
  );
}

export default Dashboard;
