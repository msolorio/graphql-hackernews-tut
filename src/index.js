const fs = require('fs');
const path = require('path');
const { ApolloServer } = require('apollo-server');

// storing links in memory for now
let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for graphql'
}];

let linkCount = 0;


// - the implementation of the schema
// - defines the functionality and return value for each field in the query
const resolvers = {
  Query: {
    // info: () => `This is the API of a Hackernews clone`
    info: () => `This is the API of a Hackernews clone`,
    feed: () => links
  },

  Mutation: {
    post: (parent, args) => {
      linkCount += 1;

      const link = {
        id: `link-${linkCount}`,
        description: args.description,
        url: args.url
      }
      links.push(link);

      return link;
    }
  }

  // These resolver defintions can be removed because graphql will resolve these automatically
  // Link: {
  //   id: (parent) => parent.id,
  //   description: (parent) => parent.id,
  //   url: (parent) => parent.url
  // }
}


// Tells server
// - what API operations are accepted
// - how they should be resolved
const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
});


server
  .listen()
  .then(({ url }) => {
    console.log(`Your server is running on ${url}`);
  });
