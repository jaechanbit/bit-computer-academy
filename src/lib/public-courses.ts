import { CourseCategory, CourseStatus } from "@prisma/client";
import { courses as fallbackCourses } from "@/data/courses";
import { getPrisma } from "@/lib/db";

export type PublicCourse = {
  title: string;
  slug: string;
  category: CourseCategory;
  summary: string;
  description: string;
  target: string | null;
  curriculum: string[];
  outcome: string | null;
  startDate: Date | null;
  duration: string | null;
  schedule: string | null;
  capacity: number | null;
  price: number | null;
  supportsTrainingCard: boolean;
  status: CourseStatus;
};

function splitCurriculum(value?: string | null) {
  if (!value) {
    return [];
  }

  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function fallbackToPublicCourse(course: (typeof fallbackCourses)[number]): PublicCourse {
  return {
    title: course.title,
    slug: course.slug,
    category: course.category as CourseCategory,
    summary: course.summary,
    description: course.description,
    target: course.target,
    curriculum: course.curriculum,
    outcome: course.outcome,
    startDate: null,
    duration: course.duration,
    schedule: course.schedule,
    capacity: null,
    price: null,
    supportsTrainingCard: course.supportsTrainingCard,
    status: course.status as CourseStatus,
  };
}

export async function getPublicCourses() {
  try {
    const prisma = getPrisma();
    const dbCourses = await prisma.course.findMany({
      where: { isPublished: true },
      orderBy: [{ displayOrder: "asc" }, { updatedAt: "desc" }],
    });

    return dbCourses.map((course): PublicCourse => ({
      title: course.title,
      slug: course.slug,
      category: course.category,
      summary: course.summary,
      description: course.description,
      target: course.target,
      curriculum: splitCurriculum(course.curriculum),
      outcome: course.outcome,
      startDate: course.startDate,
      duration: course.duration,
      schedule: course.schedule,
      capacity: course.capacity,
      price: course.price,
      supportsTrainingCard: course.supportsTrainingCard,
      status: course.status,
    }));
  } catch {
    return fallbackCourses.map(fallbackToPublicCourse);
  }
}

export async function getPublicCourseBySlug(slug: string) {
  try {
    const prisma = getPrisma();
    const course = await prisma.course.findFirst({
      where: {
        slug,
        isPublished: true,
      },
    });

    if (!course) {
      return null;
    }

    return {
      title: course.title,
      slug: course.slug,
      category: course.category,
      summary: course.summary,
      description: course.description,
      target: course.target,
      curriculum: splitCurriculum(course.curriculum),
      outcome: course.outcome,
      startDate: course.startDate,
      duration: course.duration,
      schedule: course.schedule,
      capacity: course.capacity,
      price: course.price,
      supportsTrainingCard: course.supportsTrainingCard,
      status: course.status,
    } satisfies PublicCourse;
  } catch {
    return fallbackCourses.map(fallbackToPublicCourse).find((course) => course.slug === slug) ?? null;
  }
}
