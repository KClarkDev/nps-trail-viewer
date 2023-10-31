import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        email
        savedTrails {
          trailName
          parkName
        }
        username
      }
    }
  }
`;

export const SAVE_TRAIL = gql`
  mutation saveTrail($trailName: String, $parkName: String) {
    saveTrail(trailName: $trailName, parkName: $parkName) {
      _id
      username
      email
      savedTrails {
        trailName
        parkName
      }
    }
  }
`;

export const REMOVE_TRAIL = gql`
  mutation removeTrail($_id: ID!) {
    removeTrail(_id: $_id) {
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
