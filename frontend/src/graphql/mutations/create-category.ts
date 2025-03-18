import { gql } from '@apollo/client';

export const CREATE_CATEGORY = gql`
    mutation CreateCategory($name: String!, $type: FinancialTypeEnum!, $user_id: String) {
        createCategory(data: { user_id: $user_id, type: $type, name: $name }) {
            errorCode
            message
            success
            category {
                category_id
                created_at
                name
                type
                updated_at
                user_id
            }
        }
    }
`