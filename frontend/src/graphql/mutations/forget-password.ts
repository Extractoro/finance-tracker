import { gql } from '@apollo/client';

export const FORGET_PASSWORD = gql`
    mutation ForgetPassword($email: String!) {
        forgetPassword(data: {email: $email}) {
            errorCode
            message
            success
        }
    }
`