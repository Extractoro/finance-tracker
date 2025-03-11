import { gql } from '@apollo/client';

export const RESET_PASSWORD = gql`
    mutation ResetPassword($password: String!, $token: String!) {
        resetPassword(data: {password: $password, token: $token}) {
            errorCode
            message
            success
        }
    }
`