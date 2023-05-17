import { PrismaClient, User } from '@prisma/client';
import * as argon2 from 'argon2';
const prisma = new PrismaClient();

async function main() {
  const pass = await argon2.hash('admin');
  const user: User = await prisma.user.upsert({
    create: {
      pass,
      name: 'admin',
      user: 'admin',
    },
    update: {},
    where: { user: 'admin' },
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
