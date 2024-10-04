import { genSaltSync, hashSync } from "bcryptjs";
import { seedData } from "./data";
import { PrismaClient } from "@prisma/client";
import { account } from '../presentation/doc/api/account.api-doc';
(async () => {
  await execute();
})();

async function execute() {
  const prisma = new PrismaClient();
  prisma.$connect();

  console.log("Seed Executing....");
  try {
    await prisma.account.createMany({
        data: seedData.users.map((account) => ({
          ...account,
          password: hashSync(account.password, genSaltSync()),
    }))
    });
    console.log('Seed data created successfully');

  } catch (error) {
    console.error("Error while seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}
