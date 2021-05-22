import { gql } from "@apollo/client";

export const GET_USER_TRANSACTIONS = gql`
  query user_transaction($userpublickey: String!){
    user_transaction(
      userpublickey: $userpublickey
    ) {
      BitCloutToSellNanos
      CreatorCoinToSellNanos
      transactiontype
      timestamp
      userpublickey
      index
    }
    ExchangeRate {
      BitCloutUSDValue
    }
  }
`;
