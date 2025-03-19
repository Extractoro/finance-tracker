import { gql } from '@apollo/client';

export const EDIT_CATEGORY = gql`
    mutation EditCategory($category_id: Int!, $name: String!, $type: FinancialTypeEnum!, $user_id: String) {
        editCategory(data: { category_id: $category_id, user_id: $user_id, type: $type, name: $name }) {
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


