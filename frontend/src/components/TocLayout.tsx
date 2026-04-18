import { type ReactNode } from "react";
import "../styles/TocLayout.css";

type LayoutProps = {
  header: ReactNode;
  sidebar: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
};

export default function TocLayout({
  header,
  sidebar,
  children,
  footer,
}: LayoutProps) {
  return (
    <div className="app-layout">
      <header className="app-header">{header}</header>

      <div className="app-body">
        <main className="app-content">{children}</main>

        <aside className="app-sidebar">
          <div className="app-side-area">
            <button
              type="button"
              className="app-side-trigger"
              aria-label="目次を表示"
            >
              <span className="app-side-trigger-dot" />
              <span className="app-side-trigger-dot" />
              <span className="app-side-trigger-dot" />
            </button>

            <div className="app-side-panel app-side-panel-sidebar">
              {sidebar}
            </div>

            {footer && (
              <div className="app-side-panel app-side-panel-footer">
                {footer}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}