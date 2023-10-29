import { gql } from "@apollo/client";

export const GET_ME = gql`
  query getMe {
    getMe {
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
