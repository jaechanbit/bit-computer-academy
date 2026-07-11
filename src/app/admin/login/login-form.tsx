"use client";

import { useActionState } from "react";
import { AdminLoginState, loginAdminAction } from "./actions";

const initialState: AdminLoginState = {
  ok: false,
  message: "",
};

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) {
    return null;
  }

  return <p className="text-xs font-bold text-red-600">{errors[0]}</p>;
}

export function AdminLoginForm() {
  const [state, formAction, isPending] = useActionState(loginAdminAction, initialState);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      {state.message ? (
        <div className="rounded-md bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
          {state.message}
        </div>
      ) : null}

      <label className="grid gap-2 text-sm font-bold">
        아이디
        <input
          className="h-11 rounded-md border border-slate-300 px-3 font-normal outline-none focus:border-primary"
          name="username"
          autoComplete="username"
        />
        <FieldError errors={state.fieldErrors?.username} />
      </label>

      <label className="grid gap-2 text-sm font-bold">
        비밀번호
        <input
          className="h-11 rounded-md border border-slate-300 px-3 font-normal outline-none focus:border-primary"
          name="password"
          type="password"
          autoComplete="current-password"
        />
        <FieldError errors={state.fieldErrors?.password} />
      </label>

      <button
        className="h-11 w-full rounded-md bg-slate-950 font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-400"
        type="submit"
        disabled={isPending}
      >
        {isPending ? "로그인 중..." : "로그인"}
      </button>
    </form>
  );
}
