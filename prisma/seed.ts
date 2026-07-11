import bcrypt from "bcryptjs";
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { CourseCategory, CourseStatus, PrismaClient } from "@prisma/client";
import { courses } from "../src/data/courses";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const username = process.env.ADMIN_USERNAME;
  const initialPassword = process.env.ADMIN_INITIAL_PASSWORD;
  const adminName = process.env.ADMIN_NAME ?? "관리자";

  if (username && initialPassword) {
    const passwordHash = await bcrypt.hash(initialPassword, 12);

    await prisma.admin.upsert({
      where: { username },
      update: {
        name: adminName,
        passwordHash,
        isActive: true,
      },
      create: {
        username,
        passwordHash,
        name: adminName,
      },
    });
  }

  for (const [index, course] of courses.entries()) {
    await prisma.course.upsert({
      where: { slug: course.slug },
      update: {
        title: course.title,
        category: course.category as CourseCategory,
        summary: course.summary,
        description: course.description,
        target: course.target,
        curriculum: course.curriculum.join("\n"),
        outcome: course.outcome,
        duration: course.duration,
        schedule: course.schedule,
        supportsTrainingCard: course.supportsTrainingCard,
        status: course.status as CourseStatus,
        isPublished: true,
        displayOrder: (index + 1) * 10,
      },
      create: {
        title: course.title,
        slug: course.slug,
        category: course.category as CourseCategory,
        summary: course.summary,
        description: course.description,
        target: course.target,
        curriculum: course.curriculum.join("\n"),
        outcome: course.outcome,
        duration: course.duration,
        schedule: course.schedule,
        supportsTrainingCard: course.supportsTrainingCard,
        status: course.status as CourseStatus,
        isPublished: true,
        displayOrder: (index + 1) * 10,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
