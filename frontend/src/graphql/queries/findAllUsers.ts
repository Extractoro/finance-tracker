import { gql } from '@apollo/client';

export const FIND_ALL_USERS = gql`
    query FindAllUsers {
      findAllUsers {
        created_at
        email
        name
        password
        refresh_token
        resetPasswordToken
        updated_at
        user_id
        verify
      }
  }
`;
