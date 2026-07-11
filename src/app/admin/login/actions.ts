"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createAdminSession } from "@/lib/auth";
import { getPrisma } from "@/lib/db";

export type AdminLoginState = {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

const loginSchema = z.object({
  username: z.string().trim().min(1, "아이디를 입력해주세요."),
  password: z.string().min(1, "비밀번호를 입력해주세요."),
});

export async function loginAdminAction(
  _previousState: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  const parsed = loginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
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
    const admin = await prisma.admin.findUnique({
      where: { username: parsed.data.username },
      select: {
        id: true,
        username: true,
        passwordHash: true,
        name: true,
        isActive: true,
      },
    });

    if (!admin?.isActive) {
      return {
        ok: false,
        message: "아이디 또는 비밀번호가 올바르지 않습니다.",
      };
    }

    const isPasswordValid = await bcrypt.compare(parsed.data.password, admin.passwordHash);

    if (!isPasswordValid) {
      return {
        ok: false,
        message: "아이디 또는 비밀번호가 올바르지 않습니다.",
      };
    }

    await prisma.admin.update({
      where: { id: admin.id },
      data: { lastLoginAt: new Date() },
    });

    await createAdminSession({
      adminId: admin.id,
      username: admin.username,
      name: admin.name,
    });
  } catch (error) {
    console.error(error);

    return {
      ok: false,
      message:
        "관리자 로그인을 위해 DATABASE_URL과 SESSION_SECRET 설정이 필요합니다.",
    };
  }

  redirect("/admin");
}

export async function logoutAdminAction() {
  const { destroyAdminSession } = await import("@/lib/auth");
  await destroyAdminSession();
  redirect("/admin/login");
}
