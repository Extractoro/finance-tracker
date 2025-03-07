import { gql } from '@apollo/client';

export const SIGNIN = gql`
    mutation Signin($email: String!, $password: String!) {
        signIn(data: {email: $email, password: $password}) {
            access_token
            errorCode
            message
            refresh_token
            success
        }
    }
`