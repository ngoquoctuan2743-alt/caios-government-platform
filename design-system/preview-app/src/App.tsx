import { useEffect, useState } from "react";
import { Moon, Sun, LayoutTemplate } from "lucide-react";
import {
  Header,
  Footer,
  LandingPage,
  CitizenDashboardPage,
  BusinessDashboardPage,
  OfficerDashboardPage,
  CaseDetailPage,
  AuthPage,
  MfaPage,
  ForgotPasswordPage,
  RegisterLandingPage,
  CitizenRegisterPage,
  BusinessRegisterPage,
  RegisterOtpPage,
  RegisterSuccessPage,
  ProfilePage,
  SettingsPage,
  NotificationsPage,
  HelpCenterPage,
  LegalPage,
  ErrorStatusPage,
  SearchResultsPage,
  AIAssistantPanel,
} from "@ds/pages/prototype";
import { STANDALONE_SCREENS, PORTAL_HOME, type Screen, type Portal, type LegalDoc, type ErrorType } from "@ds/pages/prototype/navigation";
import type { Locale } from "@ds/pages/prototype/i18n";
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
  const [locale, setLocale] = useState<Locale>("vi");
  const [legalDoc, setLegalDoc] = useState<LegalDoc>("terms");
  const [searchQuery, setSearchQuery] = useState("");
  const [errorType, setErrorType] = useState<ErrorType>("404");
  const [aiOpen, setAiOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.className = theme === "dark" ? "vdg-dark" : "vdg-light";
  }, [theme]);

  function navigate(next: Screen) {
    setScreen(next);
    window.scrollTo(0, 0);
  }

  function switchPortal(next: Portal) {
    setPortal(next);
    navigate(PORTAL_HOME[next]);
  }

  function openCase(from: Screen) {
    setCaseOrigin(from);
    navigate("case-detail");
  }

  function logout() {
    setLoggedIn(false);
    navigate("landing");
  }

  function openLegal(doc: LegalDoc) {
    setLegalDoc(doc);
    navigate("legal");
  }

  function openError(type: ErrorType) {
    setErrorType(type);
    navigate("error");
  }

  const isStandalone = STANDALONE_SCREENS.includes(screen);

  return (
    <div>
      {/* Dev-only harness toggle (reference view / theme) -- positioned below
          the 64px Header, not on top of it. It used to sit at top-3 (12px),
          which visually and functionally overlapped the Header's own
          right-side controls once Phase 4 added a notifications bell and
          profile menu there (both at the same top-right corner, this
          widget's z-[800] winning over the header's z-50) -- clicks meant
          for the avatar menu were being intercepted by empty space here.
          Caught by actually clicking through the running app, not by
          reading the JSX. */}
      <div className="fixed top-[76px] right-3 z-[800] flex items-center gap-2">
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
      ) : isStandalone ? (
        <>
          {screen === "auth" && <AuthPage onLogin={() => navigate("mfa")} onForgotPassword={() => navigate("forgot-password")} />}
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
          {screen === "register-landing" && (
            <RegisterLandingPage
              onChoose={(type) => navigate(type === "citizen" ? "register-citizen" : "register-business")}
              onBack={() => navigate("landing")}
            />
          )}
          {screen === "register-citizen" && (
            <CitizenRegisterPage onContinue={() => navigate("register-otp")} onBack={() => navigate("register-landing")} />
          )}
          {screen === "register-business" && (
            <BusinessRegisterPage onContinue={() => navigate("register-otp")} onBack={() => navigate("register-landing")} />
          )}
          {screen === "register-otp" && <RegisterOtpPage onVerified={() => navigate("register-success")} />}
          {screen === "register-success" && (
            <RegisterSuccessPage onLogin={() => navigate("auth")} onHome={() => navigate("landing")} />
          )}
          {screen === "error" && (
            <ErrorStatusPage type={errorType} onHome={() => navigate("landing")} onLogin={() => navigate("auth")} />
          )}
        </>
      ) : (
        <>
          <Header
            active={screen}
            portal={portal}
            loggedIn={loggedIn}
            locale={locale}
            unreadCount={loggedIn ? 2 : 0}
            onNavigate={navigate}
            onSwitchPortal={switchPortal}
            onToggleLocale={() => setLocale((l) => (l === "vi" ? "en" : "vi"))}
            onLogout={logout}
          />

          {screen === "landing" && (
            <LandingPage
              locale={locale}
              onOpenDashboard={() => navigate("auth")}
              onSearch={(q) => {
                setSearchQuery(q);
                navigate("search-results");
              }}
            />
          )}
          {screen === "citizen-dashboard" && <CitizenDashboardPage onOpenCase={() => openCase("citizen-dashboard")} />}
          {screen === "business-dashboard" && <BusinessDashboardPage />}
          {screen === "officer-dashboard" && <OfficerDashboardPage onOpenCase={() => openCase("officer-dashboard")} />}
          {screen === "case-detail" && <CaseDetailPage onBack={() => navigate(caseOrigin)} />}
          {screen === "profile" && <ProfilePage onChangePassword={() => navigate("settings")} onLogout={logout} />}
          {screen === "settings" && (
            <SettingsPage theme={theme} onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} locale={locale} onToggleLocale={() => setLocale((l) => (l === "vi" ? "en" : "vi"))} />
          )}
          {screen === "notifications" && <NotificationsPage />}
          {screen === "help-center" && <HelpCenterPage onOpenAI={() => setAiOpen(true)} />}
          {screen === "legal" && <LegalPage doc={legalDoc} />}
          {screen === "search-results" && <SearchResultsPage initialQuery={searchQuery} />}

          <Footer onNavigate={navigate} onOpenLegal={openLegal} />

          {/* Reachable from every screen via the footer strip below --
              satisfies "no dead links": these 5 status pages otherwise have
              no natural user-triggered entry point in a working prototype. */}
          <div className="border-t border-[var(--vdg-color-border)] bg-[var(--vdg-color-background)] px-6 py-3 text-center text-xs text-[var(--vdg-color-text-secondary)]">
            Xem trang trạng thái (demo):{" "}
            {(["404", "500", "maintenance", "access-denied", "session-expired"] as ErrorType[]).map((et, i) => (
              <span key={et}>
                {i > 0 && " · "}
                <button type="button" onClick={() => openError(et)} className="underline-offset-2 hover:text-[var(--vdg-color-primary)] hover:underline">
                  {et}
                </button>
              </span>
            ))}
          </div>

          <AIAssistantPanel open={aiOpen} onOpenChange={setAiOpen} />
        </>
      )}
    </div>
  );
}
