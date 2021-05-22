import { gql } from "@apollo/client";

export const GET_BUY_AND_SELL_TRANSACTIONS = gql`
  query Transaction($userpublickey: String!) {
    user_check(userpublickey: $userpublickey) {
      BitCloutToSellNanos
      CreatorCoinToSellNanos
      transactiontype
      transactorpublickey
      timestamp
      userpublickey
      index
    }
    ExchangeRate {
      BitCloutUSDValue
    }
  }
`;
