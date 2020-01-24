const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const scrape = require('./scrape');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type TriviaQuestion {
    question: String
    questionImage: String
    answer: String
    answerDescription: String
    options: [String]
  }

  type Query {
    questions: [TriviaQuestion]
  }
`;

let questions = null;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    questions: async () => {
      if (questions) {
        return questions;
      }
      questions = await scrape.getAllTriviaQuestions();
      return questions;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
