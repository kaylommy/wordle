import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query users {
    users {
      _id
      email
    }
  }
`;

export const GET_USER = gql`
  query user($userId: ID!) {
    user(userId: $userId) {
      _id
      email
    }
  }
`;