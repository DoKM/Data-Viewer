"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQL = void 0;
var graphql_1 = require("graphql");
var GraphQL = /** @class */ (function () {
    function GraphQL() {
        // Construct a schema, using GraphQL schema language
        this.schema = (0, graphql_1.buildSchema)("\ntype Query {\n  hello: String\n}\n");
        // The root provides a resolver function for each API endpoint
        this.root = {
            hello: function () {
                return 'Hello world!';
            },
        };
    }
    // Run the GraphQL query '{ hello }' and print out the response
    GraphQL.prototype.get = function () {
        var graphQLArgs = {
            schema: this.schema,
            source: "{ hello }",
            rootValue: this.root
        };
        (0, graphql_1.graphql)(graphQLArgs).then(function (response) {
            console.log(response);
        });
    };
    return GraphQL;
}());
exports.GraphQL = GraphQL;
//# sourceMappingURL=GraphQL.js.map