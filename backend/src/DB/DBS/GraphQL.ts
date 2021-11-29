//UNUSED CODE
import {
    graphql,
    buildSchema,
    GraphQLArgs,
    Source
} from "graphql"

export class GraphQL {
    // Construct a schema, using GraphQL schema language
    private schema = buildSchema(`
type Query {
  hello: String
}
`);

    // The root provides a resolver function for each API endpoint
    private root = {
        hello: () => {
            return 'Hello world!';
        },
    };

    // Run the GraphQL query '{ hello }' and print out the response
    public get() {
        let graphQLArgs:GraphQLArgs = {
            schema: this.schema,
            source: "{ hello }",
            rootValue: this.root
        }
        graphql(graphQLArgs).then((response) => {
            console.log(response);
        });
    }
}