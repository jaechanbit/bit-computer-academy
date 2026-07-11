import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIE = "bit_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 8;

export type AdminSession = {
  adminId: string;
  username: string;
  name: string;
  exp: number;
};

function getSessionSecret() {
  const secret = process.env.SESSION_SECRET;

  if (!secret) {
    throw new Error("SESSION_SECRET is not set.");
  }

  return secret;
}

function encodeBase64Url(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function decodeBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signPayload(payload: string) {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");
}

function verifySignature(payload: string, signature: string) {
  const expected = signPayload(payload);
  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(signature);

  if (expectedBuffer.length !== signatureBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, signatureBuffer);
}

export async function createAdminSession(session: Omit<AdminSession, "exp">) {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;
  const payload = encodeBase64Url(JSON.stringify({ ...session, exp: expiresAt }));
  const signature = signPayload(payload);
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, `${payload}.${signature}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const rawSession = cookieStore.get(SESSION_COOKIE)?.value;

  if (!rawSession) {
    return null;
  }

  const [payload, signature] = rawSession.split(".");

  if (!payload || !signature || !verifySignature(payload, signature)) {
    return null;
  }

  try {
    const session = JSON.parse(decodeBase64Url(payload)) as AdminSession;
    const now = Math.floor(Date.now() / 1000);

    if (!session.exp || session.exp < now) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}
