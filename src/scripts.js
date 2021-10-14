const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const newLink = await prisma.link.create({
    data: {
      description: 'tuts for geeks',
      url: 'howtographql.com'
    }
  })

  const allLinks = await prisma.link.findMany();
  console.log('allLinks ==>', allLinks);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch((err) => {
    throw Error(err);
  });
