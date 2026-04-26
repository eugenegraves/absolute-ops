export const PRIMARY_NAV = [
  { href: "/", label: "Home", routeKey: "landing" },
  { href: "/track", label: "Track", routeKey: "track" },
  { href: "/workspace", label: "Workspace", routeKey: "workspace" },
  { href: "/dashboard", label: "Dashboard", routeKey: "dashboard" },
  { href: "/admin", label: "Admin", routeKey: "admin" },
  { href: "/field", label: "Field", routeKey: "field" },
  { href: "/ai-briefing", label: "AI Briefing", routeKey: "aiBriefing" }
];
export const FOOTER_NAV = [
  { href: "/architecture", label: "Architecture", routeKey: "architecture" }
];
export const PRIMARY_CTA = { href: "/workspace", label: "Open Workspace" };
export const isCurrentRoute = (item, current) => item.routeKey === current;
