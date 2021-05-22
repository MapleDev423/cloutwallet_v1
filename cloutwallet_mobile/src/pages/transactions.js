import Header from "../app/shared/Header/header.component";
import styled from "styled-components";
import UT from "../app/components/Transaction/UserTransactions/ut.component";

const TStyle = styled.div`
  p.header-text {
    padding: 15px 0px;
    font-family: Apercu Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 150%;
    color: #FBFBFB;
  }
`

function TransactionPage() {
  return (
    <TStyle>
      <Header title="pl_user">
        <p className="header-text">Crypto Hedge Fund Manager // Building @cloutwallet // Large ape @apepit //Permission-less world maximalist // It was inevitable.</p>
      </Header>
      <UT />
    </TStyle>
  );
}

export default TransactionPage;