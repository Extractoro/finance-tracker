import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';

const graphqlConfig = {
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  sortSchema: true,
  playground: true,
};

export default graphqlConfig;
