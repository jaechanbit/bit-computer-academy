"use server";

import { InquiryStatus, TrainingCardOwnership } from "@prisma/client";
import { z } from "zod";
import { getPrisma } from "@/lib/db";

export type InquiryFormState = {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

const inquirySchema = z.object({
  name: z.string().trim().min(1, "이름을 입력해주세요."),
  phone: z.string().trim().min(1, "연락처를 입력해주세요."),
  email: z.string().trim().email("이메일 형식이 올바르지 않습니다.").optional().or(z.literal("")),
  course: z.string().trim().optional(),
  trainingCard: z.enum(["YES", "NO", "UNKNOWN"]).optional().or(z.literal("")),
  preferredContactTime: z.string().trim().optional(),
  message: z.string().trim().min(1, "문의 내용을 입력해주세요."),
  privacyAgreed: z.literal("on", {
    error: "개인정보 수집 및 이용에 동의해주세요.",
  }),
});

export async function createInquiryAction(
  _previousState: InquiryFormState,
  formData: FormData,
): Promise<InquiryFormState> {
  const parsed = inquirySchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email") ?? "",
    course: formData.get("course") ?? "",
    trainingCard: formData.get("trainingCard") ?? "",
    preferredContactTime: formData.get("preferredContactTime") ?? "",
    message: formData.get("message"),
    privacyAgreed: formData.get("privacyAgreed"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "입력값을 확인해주세요.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const prisma = getPrisma();
    const data = parsed.data;
    const selectedSlug = data.course || null;
    const selectedCourse = selectedSlug
      ? await prisma.course.findUnique({
          where: { slug: selectedSlug },
          select: { id: true },
        })
      : null;

    if (selectedSlug && !selectedCourse) {
      return {
        ok: false,
        message: "선택한 교육과정을 찾을 수 없습니다. 관리자에게 문의해주세요.",
      };
    }

    await prisma.inquiry.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        courseId: selectedCourse?.id ?? null,
        trainingCardOwnership: data.trainingCard
          ? (data.trainingCard as TrainingCardOwnership)
          : null,
        preferredContactTime: data.preferredContactTime || null,
        message: data.message,
        privacyAgreed: true,
        status: InquiryStatus.NEW,
      },
    });

    return {
      ok: true,
      message: "문의가 접수되었습니다. 확인 후 연락드리겠습니다.",
    };
  } catch (error) {
    console.error(error);

    return {
      ok: false,
      message:
        "문의 저장을 위해 데이터베이스 연결 설정이 필요합니다. PostgreSQL 연결 후 다시 시도해주세요.",
    };
  }
}
