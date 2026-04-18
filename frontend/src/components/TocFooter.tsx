import type { ChangeEvent } from "react";
import "../styles/TocLayout.css";

type TocFooterProps = {
  input: string;
  submitting: boolean;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
};

export default function TocFooter({
  input,
  submitting,
  onInputChange,
  onSubmit,
}: TocFooterProps) {
  return (
    <div className="toc-footer">
      <textarea
        className="toc-footer-textarea"
        value={input}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          onInputChange(e.target.value)
        }
        placeholder="文章を入力してください"
        rows={4}
      />

      <button
        className="toc-footer-button"
        type="button"
        onClick={onSubmit}
        disabled={submitting}
      >
        {submitting ? "送信中..." : "送信"}
      </button>
    </div>
  );
}