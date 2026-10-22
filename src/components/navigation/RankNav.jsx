import React from "react";

export function RankNav({ ranks, active, goTo }) {
  return (
    <nav className="rank-nav" aria-label="Navigazione sezioni">
      {ranks.map((r, i) => (
        <React.Fragment key={r}>
          <button
            className={`rank-item ${active === i ? "on" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Vai alla sezione rank ${r}`}
            aria-current={active === i}
          >
            <span className="rank-node" />
            <span className="rank-label">{r}</span>
          </button>
          {i < ranks.length - 1 && <span className="rank-line" />}
        </React.Fragment>
      ))}
    </nav>
  );
}