"use server";

import { redirect } from "next/navigation";
import { destroySession, getSession } from "@/lib/auth/session";
import { writeAuditEvent } from "@/lib/audit/log";
import { ActorType, Role } from "@/generated/prisma/enums";

const ROLE_TO_ACTOR_TYPE: Record<Role, ActorType> = {
  [Role.CITIZEN]: ActorType.CITIZEN,
  [Role.OFFICER]: ActorType.OFFICER,
  [Role.ADMIN]: ActorType.ADMIN,
  [Role.SYSTEM]: ActorType.SYSTEM,
};

export async function logout() {
  const session = await getSession();
  if (session) {
    await writeAuditEvent({
      actorType: ROLE_TO_ACTOR_TYPE[session.role],
      actorId: session.sub,
      action: "auth.logout",
      payload: { email: session.email },
    });
  }
  await destroySession();
  redirect("/login");
}
