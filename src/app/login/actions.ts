"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth/session";
import { homeForRole } from "@/lib/auth/rbac";
import { writeAuditEvent } from "@/lib/audit/log";
import { ActorType, Role } from "@/generated/prisma/enums";

const ROLE_TO_ACTOR_TYPE: Record<Role, ActorType> = {
  [Role.CITIZEN]: ActorType.CITIZEN,
  [Role.OFFICER]: ActorType.OFFICER,
  [Role.ADMIN]: ActorType.ADMIN,
  [Role.SYSTEM]: ActorType.SYSTEM,
};

export interface LoginState {
  error?: string;
}

export async function login(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return { error: "Invalid email or password." };
  }

  await createSession({
    sub: user.id,
    email: user.email,
    role: user.role,
    jurisdiction: user.jurisdiction,
  });

  await writeAuditEvent({
    actorType: ROLE_TO_ACTOR_TYPE[user.role],
    actorId: user.id,
    action: "auth.login",
    payload: { email: user.email },
  });

  redirect(next && next.startsWith("/") ? next : homeForRole(user.role));
}
