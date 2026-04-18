import "../styles/TocPanel.css";

type TocItem = {
  id: number;
  label: string;
  targetId: string;
};

type Props = {
  items: TocItem[];
  activeId: string | null;
  onItemClick: (targetId: string) => void;
};

export default function TocPanel({ items, activeId, onItemClick }: Props) {
  return (
    <div className="toc-shell">
      <aside id="toc-panel" className="toc-panel toc-panel-open">
        <div className="toc-header">
          <div className="toc-title">目次</div>
          <div className="toc-subtitle">ユーザーの質問一覧</div>
        </div>

        <div className="toc-list">
          {items.length === 0 ? (
            <div className="toc-empty">項目がありません</div>
          ) : (
            items.map((item, index) => {
              const isActive = activeId === item.targetId;

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`toc-item ${isActive ? "toc-item-active" : ""}`}
                  onClick={() => onItemClick(item.targetId)}
                  title={item.label}
                >
                  <span className="toc-item-index">{index + 1}</span>
                  <span className="toc-item-label">{item.label}</span>
                </button>
              );
            })
          )}
        </div>
      </aside>
    </div>
  );
}