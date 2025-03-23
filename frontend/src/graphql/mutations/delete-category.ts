import { gql } from '@apollo/client';

export const DELETE_CATEGORY = gql`
    mutation DeleteCategory($category_id: Int!) {
        deleteCategory(data: { category_id: $category_id }) {
            errorCode
            message
            success
        }
    }

`