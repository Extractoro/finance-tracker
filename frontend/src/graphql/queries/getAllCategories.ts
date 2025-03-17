import { gql } from '@apollo/client';

export const GET_ALL_CATEGORIES = gql`
    query GetAllCategories {
        getAllCategories {
            errorCode
            message
            success
            categories {
                category_id
                created_at
                name
                type
                updated_at
                user_id
            }
        }
    }
`;
