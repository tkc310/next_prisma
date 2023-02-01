import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

const main = async () => {
  console.info('start');

  const SALT_ROUND = 1;
  const password = 'test';
  const hash = await bcrypt.hash(password, SALT_ROUND);

  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'テストユーザ',
      hashed_password: hash,
    },
  });

  console.info({ testUser });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.info('end');
  });
