import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user: User = await prisma.user.upsert({
    create: {
      name: 'test',
      user: 'test',
      pass: 'test',
    },
    update: {},
    where: { user: 'test' },
  });

  await prisma.rol.upsert({
    create: {
      role: 1,
      userId: user.id,
    },
    update: {},
    where: { id: 1 },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
