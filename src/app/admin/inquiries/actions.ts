"use server";

import { InquiryStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getPrisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";

const updateInquirySchema = z.object({
  inquiryId: z.string().uuid(),
  status: z.enum(["NEW", "CHECKING", "COUNSELING_DONE", "ENROLLED", "HOLD"]),
  adminMemo: z.string().trim().optional(),
});

export async function updateInquiryAction(formData: FormData) {
  const session = await requireAdminSession();
  const parsed = updateInquirySchema.safeParse({
    inquiryId: formData.get("inquiryId"),
    status: formData.get("status"),
    adminMemo: formData.get("adminMemo") ?? "",
  });

  if (!parsed.success) {
    redirect("/admin/inquiries?error=invalid");
  }

  const prisma = getPrisma();
  const inquiry = await prisma.inquiry.findUnique({
    where: { id: parsed.data.inquiryId },
    select: { status: true },
  });

  if (!inquiry) {
    redirect("/admin/inquiries?error=not-found");
  }

  await prisma.$transaction([
    prisma.inquiry.update({
      where: { id: parsed.data.inquiryId },
      data: {
        status: parsed.data.status as InquiryStatus,
        adminMemo: parsed.data.adminMemo || null,
      },
    }),
    prisma.inquiryStatusLog.create({
      data: {
        inquiryId: parsed.data.inquiryId,
        adminId: session.adminId,
        previousStatus: inquiry.status,
        nextStatus: parsed.data.status as InquiryStatus,
        memo: parsed.data.adminMemo || null,
      },
    }),
  ]);

  revalidatePath("/admin/inquiries");
  revalidatePath(`/admin/inquiries/${parsed.data.inquiryId}`);
  redirect(`/admin/inquiries/${parsed.data.inquiryId}?saved=1`);
}
