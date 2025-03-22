import { gql } from '@apollo/client';

export const REFRESH_TOKEN = gql`
    mutation RefreshToken {
        refreshToken {
            access_token
            errorCode
            message
            refresh_token
            success
        }
    }
`