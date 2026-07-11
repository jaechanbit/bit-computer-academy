"use server";

import { CourseCategory, CourseStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdminSession } from "@/lib/auth";
import { getPrisma } from "@/lib/db";

const courseSchema = z.object({
  id: z.string().uuid().optional().or(z.literal("")),
  title: z.string().trim().min(1, "과정명을 입력해주세요."),
  slug: z.string().trim().min(1, "슬러그를 입력해주세요."),
  category: z.enum(["GENERAL", "TRAINING_CARD"]),
  summary: z.string().trim().min(1, "짧은 소개를 입력해주세요."),
  description: z.string().trim().min(1, "상세 소개를 입력해주세요."),
  target: z.string().trim().optional(),
  curriculum: z.string().trim().optional(),
  outcome: z.string().trim().optional(),
  startDate: z.string().optional(),
  duration: z.string().trim().optional(),
  schedule: z.string().trim().optional(),
  capacity: z.string().optional(),
  price: z.string().optional(),
  supportsTrainingCard: z.string().optional(),
  status: z.enum(["RECRUITING", "SCHEDULED", "CLOSED"]),
  isPublished: z.string().optional(),
  displayOrder: z.string().optional(),
});

function normalizeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function optionalNumber(value?: string) {
  if (!value?.trim()) {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function optionalDate(value?: string) {
  if (!value?.trim()) {
    return null;
  }

  return new Date(`${value}T00:00:00`);
}

export async function saveCourseAction(formData: FormData) {
  const session = await requireAdminSession();
  const parsed = courseSchema.safeParse({
    id: formData.get("id") ?? "",
    title: formData.get("title"),
    slug: formData.get("slug"),
    category: formData.get("category"),
    summary: formData.get("summary"),
    description: formData.get("description"),
    target: formData.get("target") ?? "",
    curriculum: formData.get("curriculum") ?? "",
    outcome: formData.get("outcome") ?? "",
    startDate: formData.get("startDate") ?? "",
    duration: formData.get("duration") ?? "",
    schedule: formData.get("schedule") ?? "",
    capacity: formData.get("capacity") ?? "",
    price: formData.get("price") ?? "",
    supportsTrainingCard: formData.get("supportsTrainingCard") ?? "",
    status: formData.get("status"),
    isPublished: formData.get("isPublished") ?? "",
    displayOrder: formData.get("displayOrder") ?? "",
  });

  if (!parsed.success) {
    redirect("/admin/courses?error=invalid");
  }

  const data = parsed.data;
  const prisma = getPrisma();
  const payload = {
    title: data.title,
    slug: normalizeSlug(data.slug),
    category: data.category as CourseCategory,
    summary: data.summary,
    description: data.description,
    target: data.target || null,
    curriculum: data.curriculum || null,
    outcome: data.outcome || null,
    startDate: optionalDate(data.startDate),
    duration: data.duration || null,
    schedule: data.schedule || null,
    capacity: optionalNumber(data.capacity),
    price: optionalNumber(data.price),
    supportsTrainingCard: data.supportsTrainingCard === "on",
    status: data.status as CourseStatus,
    isPublished: data.isPublished === "on",
    displayOrder: optionalNumber(data.displayOrder) ?? 0,
  };

  if (data.id) {
    await prisma.course.update({
      where: { id: data.id },
      data: {
        ...payload,
        updatedById: session.adminId,
      },
    });
  } else {
    await prisma.course.create({
      data: {
        ...payload,
        createdById: session.adminId,
        updatedById: session.adminId,
      },
    });
  }

  revalidatePath("/admin/courses");
  revalidatePath("/courses");
  redirect("/admin/courses?saved=1");
}

export async function toggleCoursePublishAction(formData: FormData) {
  const session = await requireAdminSession();
  const id = String(formData.get("id") ?? "");
  const isPublished = String(formData.get("isPublished") ?? "") === "true";

  if (!id) {
    redirect("/admin/courses?error=invalid");
  }

  const prisma = getPrisma();
  await prisma.course.update({
    where: { id },
    data: {
      isPublished: !isPublished,
      updatedById: session.adminId,
    },
  });

  revalidatePath("/admin/courses");
  revalidatePath("/courses");
  redirect("/admin/courses?saved=1");
}
