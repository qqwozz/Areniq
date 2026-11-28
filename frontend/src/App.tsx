import { useEffect, useState } from "react";

type HealthResponse = {
  status: string;
};

function App() {
  const [apiStatus, setApiStatus] = useState<"loading" | "online" | "offline">(
    "loading",
  );

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/health", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API responded with ${response.status}`);
        }
        return response.json() as Promise<HealthResponse>;
      })
      .then((data) => setApiStatus(data.status === "ok" ? "online" : "offline"))
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
        setApiStatus("offline");
      });

    return () => controller.abort();
  }, []);

  const statusLabel = {
    loading: "Checking connection",
    online: "Connected",
    offline: "Unavailable",
  }[apiStatus];

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Areniq home">
          <span className="brand-mark" aria-hidden="true">
            A
          </span>
          <span>Areniq</span>
        </a>
        <span className="topbar-note">Application starter</span>
      </header>

      <section className="hero" aria-labelledby="welcome-heading">
        <p className="eyebrow">YOUR PROJECT STARTS HERE</p>
        <h1 id="welcome-heading">
          A clear foundation
          <br />
          for what comes next.
        </h1>
        <p className="intro">
          Your React interface and Go API are ready to build on. Add your
          product&apos;s features here.
        </p>
        <div className="status-card" role="status" aria-live="polite">
          <span className={`status-dot status-${apiStatus}`} aria-hidden="true" />
          <span className="status-label">Backend API</span>
          <span className={`status-value status-text-${apiStatus}`}>
            {statusLabel}
          </span>
        </div>
      </section>

      <footer className="footer">
        <span>React + TypeScript</span>
        <span className="footer-divider" aria-hidden="true">
          /
        </span>
        <span>Go</span>
        <span className="footer-divider" aria-hidden="true">
          /
        </span>
        <span>Docker</span>
      </footer>
    </main>
  );
}

export default App;
