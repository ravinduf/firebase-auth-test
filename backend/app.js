import { ApolloServer, gql } from 'apollo-server';
import admin from 'firebase-admin';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const serviceAccount = require('./firebase/service-account.json');

// console.log(serviceAccount)
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

const resolvers = {
    Query: {
        books: () => books,
    },
};
const server = new ApolloServer({ 
    context: async ({ req }) => {
        const auth = req.headers && req.headers.authorization || '';
        if (auth) {
            const idToken = auth.split(" ")[1];

            admin
                .auth()
                .verifyIdToken(idToken)
                .then(function (decodedTOken) {
                    console.log(decodedTOken)
                })
                .catch(error => console.log(error)) 
        }
    },
    typeDefs, 
    resolvers 
});

server.listen().then(({ url }) => {
    console.log(`server is ready ${url}`)
})