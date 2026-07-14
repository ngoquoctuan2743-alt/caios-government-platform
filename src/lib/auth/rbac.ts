import { Role } from "@/generated/prisma/enums";

/**
 * Coarse route-group -> allowed-role matrix used by middleware.
 * Fine-grained permissions (e.g. "officer can only see cases in their
 * jurisdiction") are enforced in the data layer, not here.
 */
export const ROUTE_GROUP_ROLES: Record<string, Role[]> = {
  "/citizen": [Role.CITIZEN],
  "/officer": [Role.OFFICER, Role.ADMIN],
  "/admin": [Role.ADMIN],
};

export function matchRouteGroup(pathname: string): string | undefined {
  return Object.keys(ROUTE_GROUP_ROLES).find(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export function isRoleAllowed(pathname: string, role: Role): boolean {
  const group = matchRouteGroup(pathname);
  if (!group) return true; // not a role-gated route
  return ROUTE_GROUP_ROLES[group].includes(role);
}

export function homeForRole(role: Role): string {
  switch (role) {
    case Role.CITIZEN:
      return "/citizen/dashboard";
    case Role.OFFICER:
      return "/officer/queue";
    case Role.ADMIN:
      return "/admin";
    case Role.SYSTEM:
      return "/";
  }
}
