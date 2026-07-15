import { useEffect, useState } from "react";
import { Moon, Sun, LayoutTemplate } from "lucide-react";
import {
  Header,
  LandingPage,
  CitizenDashboardPage,
  BusinessDashboardPage,
  OfficerDashboardPage,
  CaseDetailPage,
  AuthPage,
  MfaPage,
  ForgotPasswordPage,
  AIAssistantPanel,
} from "@ds/pages/prototype";
import { AUTH_SCREENS, PORTAL_HOME, type Screen, type Portal } from "@ds/pages/prototype/navigation";
import { ReferenceView } from "./ReferenceView";

type Theme = "light" | "dark";
type Mode = "prototype" | "reference";

export function App() {
  const [theme, setTheme] = useState<Theme>(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );
  const [mode, setMode] = useState<Mode>("prototype");
  const [screen, setScreen] = useState<Screen>("landing");
  const [portal, setPortal] = useState<Portal>("citizen");
  const [loggedIn, setLoggedIn] = useState(false);
  const [caseOrigin, setCaseOrigin] = useState<Screen>("citizen-dashboard");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.className = theme === "dark" ? "vdg-dark" : "vdg-light";
  }, [theme]);

  function navigate(next: Screen) {
    if (next === "landing") setLoggedIn(false);
    setScreen(next);
    window.scrollTo(0, 0);
  }

  function switchPortal(next: Portal) {
    setPortal(next);
    setScreen(PORTAL_HOME[next]);
    window.scrollTo(0, 0);
  }

  function openCase(from: Screen) {
    setCaseOrigin(from);
    setScreen("case-detail");
    window.scrollTo(0, 0);
  }

  const isAuthScreen = AUTH_SCREENS.includes(screen);

  return (
    <div>
      <div className="fixed top-3 right-3 z-[800] flex items-center gap-2">
        <button
          type="button"
          onClick={() => setMode((m) => (m === "prototype" ? "reference" : "prototype"))}
          className="flex h-8.5 items-center gap-1.5 rounded-full border border-[var(--vdg-color-border)] bg-[var(--vdg-color-surface)] px-3 text-[13px] font-medium shadow-[var(--vdg-shadow-sm)] transition-colors hover:border-[var(--vdg-color-primary)]"
        >
          <LayoutTemplate className="size-3.5" />
          {mode === "prototype" ? "Xem Design System" : "Xem Prototype"}
        </button>
        <button
          type="button"
          aria-label="Đổi giao diện sáng/tối"
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          className="flex size-8.5 items-center justify-center rounded-full border border-[var(--vdg-color-border)] bg-[var(--vdg-color-surface)] shadow-[var(--vdg-shadow-sm)] transition-colors hover:border-[var(--vdg-color-primary)]"
        >
          {theme === "dark" ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
        </button>
      </div>

      {mode === "reference" ? (
        <ReferenceView />
      ) : isAuthScreen ? (
        <>
          {screen === "auth" && (
            <AuthPage
              onLogin={() => navigate("mfa")}
              onForgotPassword={() => navigate("forgot-password")}
            />
          )}
          {screen === "mfa" && (
            <MfaPage
              onVerify={() => {
                setLoggedIn(true);
                setPortal("citizen");
                navigate("citizen-dashboard");
              }}
            />
          )}
          {screen === "forgot-password" && <ForgotPasswordPage onBack={() => navigate("auth")} />}
        </>
      ) : (
        <>
          <Header active={screen} portal={portal} loggedIn={loggedIn} onNavigate={navigate} onSwitchPortal={switchPortal} />

          {screen === "landing" && <LandingPage onOpenDashboard={() => navigate("auth")} />}
          {screen === "citizen-dashboard" && <CitizenDashboardPage onOpenCase={() => openCase("citizen-dashboard")} />}
          {screen === "business-dashboard" && <BusinessDashboardPage />}
          {screen === "officer-dashboard" && <OfficerDashboardPage onOpenCase={() => openCase("officer-dashboard")} />}
          {screen === "case-detail" && <CaseDetailPage onBack={() => navigate(caseOrigin)} />}

          <AIAssistantPanel />
        </>
      )}
    </div>
  );
}
