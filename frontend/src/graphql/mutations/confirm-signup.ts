import { gql } from '@apollo/client';

const CONFIRM_SIGNUP = gql`
    mutation ConfirmSignup($token: String!) {
        confirmSignup(data: { token: $token }) {
            success
            message
            errorCode
        }
    }
`;

export default CONFIRM_SIGNUP;