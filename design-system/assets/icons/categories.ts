import {
  Landmark,
  Scale,
  ShieldCheck,
  FileCheck2,
  User,
  IdCard,
  UserCircle,
  Fingerprint,
  Building2,
  Briefcase,
  Store,
  FileSpreadsheet,
  Workflow,
  GitBranch,
  ListChecks,
  ClipboardCheck,
  Sparkles,
  Bot,
  Wand2,
  MessageSquareText,
  FileText,
  FileStack,
  FolderOpen,
  Paperclip,
  CreditCard,
  Wallet,
  Receipt,
  BadgeDollarSign,
  Bell,
  BellRing,
  Mail,
  MessageCircle,
  Shield,
  Lock,
  KeyRound,
  BarChart3,
  TrendingUp,
  PieChart,
  LineChart,
  LifeBuoy,
  HelpCircle,
  Phone,
  Headphones,
  Settings,
  SlidersHorizontal,
  UserCog,
  Cog,
  type LucideIcon,
} from "lucide-react";

export type IconCategory =
  | "government"
  | "citizen"
  | "business"
  | "workflow"
  | "ai"
  | "documents"
  | "payment"
  | "notification"
  | "security"
  | "analytics"
  | "support"
  | "settings";

/**
 * 12 categories x 4 curated icons, all outline-style `lucide-react` icons
 * (already an installed dependency) -- no new icon set was added. Curated,
 * not exhaustive: this is the set actually referenced by Phase 1/2 UI so
 * far, not every plausible government-platform icon.
 */
export const ICON_CATEGORIES: Record<IconCategory, { label: string; icons: Record<string, LucideIcon> }> = {
  government: { label: "Government", icons: { Landmark, Scale, ShieldCheck, FileCheck2 } },
  citizen: { label: "Citizen", icons: { User, IdCard, UserCircle, Fingerprint } },
  business: { label: "Business", icons: { Building2, Briefcase, Store, FileSpreadsheet } },
  workflow: { label: "Workflow", icons: { Workflow, GitBranch, ListChecks, ClipboardCheck } },
  ai: { label: "AI", icons: { Sparkles, Bot, Wand2, MessageSquareText } },
  documents: { label: "Documents", icons: { FileText, FileStack, FolderOpen, Paperclip } },
  payment: { label: "Payment", icons: { CreditCard, Wallet, Receipt, BadgeDollarSign } },
  notification: { label: "Notification", icons: { Bell, BellRing, Mail, MessageCircle } },
  security: { label: "Security", icons: { Shield, Lock, KeyRound, Fingerprint } },
  analytics: { label: "Analytics", icons: { BarChart3, TrendingUp, PieChart, LineChart } },
  support: { label: "Support", icons: { LifeBuoy, HelpCircle, Phone, Headphones } },
  settings: { label: "Settings", icons: { Settings, SlidersHorizontal, UserCog, Cog } },
};
