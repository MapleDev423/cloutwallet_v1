import CoinDetails from "../app/components/User/CoinDetails/coinDetails.component";
import CreatorCoins from "../app/components/User/CreatorCoins/creatorCoins.component.";
import Header from "../app/shared/Header/header.component";
import Transactions from "../app/components/User/Transactions/transactions.component";

function User() {
  return (
    <>
      <Header />
      <CoinDetails />
      <CreatorCoins />
      <Transactions />
    </>
  );
}

export default User;
