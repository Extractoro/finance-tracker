import { gql } from '@apollo/client';

export const RESEND_CONFIRM = gql`
    mutation ResendConfirm($email: String!) {
        resendConfirm(data: {email: $email}) {
            errorCode
            message
            success
        }
    }
`