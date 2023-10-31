import { gql } from "@apollo/client";

export const GET_USER = gql`
  query getUser {
    getUser {
      _id
      username
      email
      savedTrails {
        _id
        trailName
        parkName
      }
    }
  }
`;
