const fs = require('fs');
const path = require('path');
const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');

// storing links in memory for now
// let links = [{
//   id: 'link-0',
//   url: 'www.howtographql.com',
//   description: 'Fullstack tutorial for graphql'
// }];

// let linkCount = 0;

// - the implementation of the schema
// - defines the functionality and return value for each field in the query
const resolvers = {
  Query: {
    // info: () => `This is the API of a Hackernews clone`
    info: () => `This is the API of a Hackernews clone`,
    feed: (parent, args, context) => {
      return context.prisma.link.findMany();
    }
  },

  Mutation: {
    post: (parent, args, context) => {
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description
        }
      });

      return newLink;
    },

    delete: (parent, args, context) => {
      const deletedLink = context.prisma.link.delete({
        where: { id: Number(args.id) }
      });

      return deletedLink;
    }

    // delete: (parent, args) => {
    //   const linkToDelete = links.find(link => link.id === `link-${args.id}`);
    //   const newLinks = links.filter(link => link.id !== `link-${args.id}`);

    //   links = newLinks;

    //   return linkToDelete;
    // }
  }

  // These resolver defintions can be removed because graphql will resolve these automatically
  // Link: {
  //   id: (parent) => parent.id,
  //   description: (parent) => parent.id,
  //   url: (parent) => parent.url
  // }
}

const prisma = new PrismaClient();

// Tells server
// - what API operations are accepted
// - how they should be resolved
const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
  context: {
    prisma
  }
});


server
  .listen()
  .then(({ url }) => {
    console.log(`Your server is running on ${url}`);
  });
