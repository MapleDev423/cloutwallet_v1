import { gql } from "@apollo/client";

export const GET_USER_YOU_HODL = gql`
  query Holding($PublicKeyBase58Check: String!) {
    holding(PublicKeyBase58Check: $PublicKeyBase58Check) {
      PublicKeyBase58Check
      BalanceBitClout
      BalanceUSD
      TotalPriceHeldUSD
      UsersYouHODL {
        BalanceBitClout
        BalanceUSD
        USDValuePrice
        SupplyPercent
        PortfolioPercent
        ProfileEntryResponse {
          CoinEntry {
            CoinPriceUSD
          }
          Username
          PublicKeyBase58Check
          ProfilePic
        }
      }
    }
  }
`;
