import { gql } from "@apollo/client";

export const GET_USER = gql`
  query Profile($PublicKeyBase58Check: String!) {
    profile(PublicKeyBase58Check: $PublicKeyBase58Check) {
      ProfilesFound {
        Username
        Description
        ProfilePic
        IsHidden
        IsReserved
      }
    }
  }
`;
