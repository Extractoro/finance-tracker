export interface GraphqlError {
  cause: {
    extensions?: {
      originalError?: {
        errors?: { message: string }[];
      };
    }
  };
}
