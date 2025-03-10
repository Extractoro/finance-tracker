import { gql } from '@apollo/client';

export const SIGNUP = gql`
    mutation Signup($name: String!, $email: String!, $password: String!) {
        signUp(data: {name: $name, email: $email, password: $password}) {
            errorCode
            message
            success
        }
    }
`;
